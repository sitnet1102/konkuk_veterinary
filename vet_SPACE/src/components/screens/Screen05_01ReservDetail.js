import 'react-native-gesture-handler';
import * as React from 'react';

import {Text, View, StyleSheet, Alert} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Table, Row} from 'react-native-table-component';

import {colors} from '../../utils/Styles';
import {FIRESTORE_DATA1} from '../../utils/firebaseData';

import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';

export default function ReservDetailScreen({route, navigation}) {
  /**
    수정할 사항
    1. 이전 페이지에서 데이터로 넣어주는 내용에서 데이터베이스 주요키를 넘겨주는 형식으로 하기
    2. 데이터 베이스 연결해서 넘어온 주요키를 사용해서 데이터 베이스 쿼리 사용 
   */
  
  const [t1, setT1] = React.useState('');
  const [t2, setT2] = React.useState('');
  const [t3, setT3] = React.useState('');

  const columndata = [
    ['목 적'],
    ['신청자'],
    ['연락처'],
    ['신청일자'],
    ['담당교수'],
    ['내선'],
  ];
  const [data1,setData1] = React.useState('');
  const [data2,setData2] = React.useState('');
  const [data3,setData3] = React.useState('');
  const [data4,setData4] = React.useState('');
  const [data5,setData5] = React.useState('');
  const [data6,setData6] = React.useState('');
  
  const deleteFunc = () => {
    // 삭제에 필요한 내용 
    firestore().collection(FIRESTORE_DATA1).doc(route.params.data.date).collection('Data').doc(route.params.data.id).update({
      use_check: false,
    }).then(() => {
      navigation.navigate('ReservCheck');
    }).catch(e => {
      Alert.alert('error',e.code+'\n예약 취소가 불가합니다.');
    });
  };
  const onPressDeleteFunc = () => Alert.alert(
    '예약 취소',
    '예약을 취소하시겠습니까?',[
      {
        text: "예",
        onPress: () => deleteFunc(),
      },
      {
        text: "아니오",
        onPress: () => null,
      }
    ]
  )

  React.useEffect(() => {
    const timestamp_tmp = route.params.data.detailData.apply_date._seconds * 1000;
    let month_tmp = new Date(timestamp_tmp).getMonth()+1;
    if(month_tmp < 10){
      month_tmp = '0'+month_tmp;
    }
    let apply_date_tmp = new Date(timestamp_tmp).getFullYear() + '-' + month_tmp + '-' + new Date(timestamp_tmp).getDate() + ' ' + new Date(timestamp_tmp).toLocaleTimeString();

    setT1(route.params.data.detailData.room_id.split('/')[2] + ' ' + route.params.data.detailData.room_id.split('/')[3]);
    setT2(route.params.data.date);
    setT3(route.params.data.detailData.start_time + ' ~ ' + route.params.data.detailData.end_time);

    setData1(route.params.data.detailData.purpose);
    setData2(route.params.data.detailData.user_name);
    setData3(route.params.data.detailData.phone_number);
    setData4(apply_date_tmp);
    setData5(route.params.data.detailData.prof_name);
    database().ref('/Prof_info/Detail/'+route.params.data.detailData.prof_name+'/office_num').on('value', snapshot =>{
      if(!snapshot.val()){
        setData6('없음');
      }else{
        setData6(snapshot.val());
      }
    });
  }, []);

  return(
    <View style={reservdetailStyle.container}>
      <View style={reservdetailStyle.top}>
        <Text style={reservdetailStyle.titletext}>{t1}</Text>
        <Text style={reservdetailStyle.titletext}>{t2}</Text>
        <Text style={reservdetailStyle.titletext}>{t3}</Text>
      </View>
      <View style={reservdetailStyle.mid}>
        <View style={reservdetailStyle.container0}>
          <View style={reservdetailStyle.container1}>
            <View style={reservdetailStyle.table1}>
              <Text style={reservdetailStyle.text1}>{columndata[0]}</Text>
            </View>
            <View style={reservdetailStyle.table1}>
              <Text style={reservdetailStyle.text1}>{columndata[1]}</Text>
            </View>
            <View style={reservdetailStyle.table1}>
              <Text style={reservdetailStyle.text1}>{columndata[2]}</Text>
            </View>
            <View style={reservdetailStyle.table1}>
              <Text style={reservdetailStyle.text1}>{columndata[3]}</Text>
            </View>
            <View style={reservdetailStyle.table1}>
              <Text style={reservdetailStyle.text1}>{columndata[4]}</Text>
            </View>
            <View style={reservdetailStyle.table1}>
              <Text style={reservdetailStyle.text1}>{columndata[5]}</Text>
            </View>
          </View>
          <View style={reservdetailStyle.line}></View>
          <View style={reservdetailStyle.container2}>
            <View style={reservdetailStyle.table2}>
              <Text style={reservdetailStyle.text2}>{data1}</Text>
            </View>
            <View style={reservdetailStyle.table2}>
              <Text style={reservdetailStyle.text2}>{data2}</Text>
            </View>
            <View style={reservdetailStyle.table2}>
              <Text style={reservdetailStyle.text2}>{data3}</Text>
            </View>
            <View style={reservdetailStyle.table2}>
              <Text style={reservdetailStyle.text2}>{data4}</Text>
            </View>
            <View style={reservdetailStyle.table2}>
              <Text style={reservdetailStyle.text2}>{data5}</Text>
            </View>
            <View style={reservdetailStyle.table2}>
              <Text style={reservdetailStyle.text2}>{data6}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={reservdetailStyle.bot}>
        <TouchableOpacity 
          style={reservdetailStyle.button}
          onPress={() => onPressDeleteFunc()}
        >
          <Text style={reservdetailStyle.buttontext}>예약 취소</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const reservdetailStyle = StyleSheet.create({
  container:{
    flex: 1,
    margin: '5%',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.kuDarkGray,
  },
  top: {
    flex: 2,
    justifyContent: 'center',
    marginLeft: 20,
    marginTop: 10,
  },
  mid: {
    marginTop: 10,
    marginLeft: 20,
    flex: 7,
  },
  bot: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titletext: {
    fontSize: RFPercentage(4),
    //fontSize: RFValue(28),
    fontWeight: 'bold',
    lineHeight: 34,
  },
  container0: {
    height: 360,
    flexDirection: 'row',
  },
  container1: {
    flex: 3,
    marginRight: 10,
  },
  container2: {
    flex: 5,
    marginLeft: 10,
  },
  line: {
    width: 1,
    backgroundColor: colors.kuDarkGray,
  },
  table1: {
  },
  text1: {
    fontSize: RFPercentage(4),
    fontWeight: 'bold',
    alignSelf: 'flex-end',
    lineHeight: 60,
  },
  text2: {
    fontSize: RFPercentage(3),
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    lineHeight: 60,
  },
  button: {
    backgroundColor: colors.kuDarkGreen,
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttontext: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.kuWhite,
  },
});