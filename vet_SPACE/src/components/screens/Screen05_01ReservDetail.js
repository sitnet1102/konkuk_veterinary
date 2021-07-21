import 'react-native-gesture-handler';
import * as React from 'react';

import {Text, View, StyleSheet, Alert} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {colors} from '../../utils/Styles';
import {FIRESTORE_DATA1} from '../../utils/firebaseData';
import {horizontalScale, verticalScale, moderateScale} from '../../utils/scailing';

import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

export default function ReservDetailScreen({route, navigation}) {
  const [t1, setT1] = React.useState('');
  const [t2, setT2] = React.useState('');
  const [t3, setT3] = React.useState('');

  const [cancle, setCancle] = React.useState(true);

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
      delete_date: firestore.Timestamp.fromDate(new Date()),
      deleted_from: auth().currentUser.uid,
    }).then(() => {
      navigation.navigate('Main');
    }).catch(e => {
      Alert.alert('error510-1',e.code+'\n예약 취소가 불가합니다.');
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
    let date_tmp = new Date(timestamp_tmp).getDate();
    if(date_tmp < 10){
      date_tmp = '0'+date_tmp;
    }
    let month_tmp2 = new Date().getMonth()+1;
    if(month_tmp2 < 10){
      month_tmp2 = '0'+month_tmp2;
    }
    let date_tmp2 = new Date().getDate();
    if(date_tmp2 < 10){
      date_tmp2 = '0'+date_tmp2;
    }
    let apply_date_tmp = new Date(timestamp_tmp).getFullYear() + '-' + month_tmp + '-' + date_tmp;
    //+ ' ' + new Date(timestamp_tmp).toLocaleTimeString();

    const today = Number(new Date().getFullYear() +''+ month_tmp2+ date_tmp2);
    const date_num = Number(route.params.data.date.substr(0,4)+route.params.data.date.substr(5,2)+route.params.data.date.substr(8,2));
    if(date_num<today){
      setCancle(false);
    }

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
            <View>
              <Text style={reservdetailStyle.text1}>{columndata[0]}</Text>
            </View>
            <View>
              <Text style={reservdetailStyle.text1}>{columndata[1]}</Text>
            </View>
            <View>
              <Text style={reservdetailStyle.text1}>{columndata[2]}</Text>
            </View>
            <View>
              <Text style={reservdetailStyle.text1}>{columndata[3]}</Text>
            </View>
            <View>
              <Text style={reservdetailStyle.text1}>{columndata[4]}</Text>
            </View>
            <View>
              <Text style={reservdetailStyle.text1}>{columndata[5]}</Text>
            </View>
          </View>
          <View style={reservdetailStyle.line}></View>
          <View style={reservdetailStyle.container2}>
            <View>
              <Text style={reservdetailStyle.text2}>{data1}</Text>
            </View>
            <View>
              <Text style={reservdetailStyle.text2}>{data2}</Text>
            </View>
            <View>
              <Text style={reservdetailStyle.text2}>{data3}</Text>
            </View>
            <View>
              <Text style={reservdetailStyle.text2}>{data4}</Text>
            </View>
            <View>
              <Text style={reservdetailStyle.text2}>{data5}</Text>
            </View>
            <View>
              <Text style={reservdetailStyle.text2}>{data6}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={reservdetailStyle.bot}>
        {
          cancle? 
          <>
            <TouchableOpacity 
              style={reservdetailStyle.button}
              onPress={() => onPressDeleteFunc()}
            >
              <Text style={reservdetailStyle.buttontext}>예약 취소</Text>
            </TouchableOpacity>
          </>
          : <></>
        }
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
    marginLeft: horizontalScale(20),
    marginTop: verticalScale(10),
  },
  titletext: {
    fontSize: moderateScale(34),
    fontWeight: 'bold',
    lineHeight: verticalScale(44),
  },
  mid: {
    marginTop: verticalScale(10),
    marginLeft: horizontalScale(20),
    flex: 7,
  },
  container0: {
    //height: verticalScale(430),
    flexDirection: 'row',
  },
  container1: {
    flex: 3,
    marginRight: horizontalScale(10),
  },
  text1: {
    fontSize: moderateScale(32),
    fontWeight: 'bold',
    alignSelf: 'flex-end',
    lineHeight: verticalScale(70),
  },
  line: {
    width: 1,
    backgroundColor: colors.kuDarkGray,
  },
  container2: {
    flex: 5,
    marginLeft: horizontalScale(10),
  },
  text2: {
    fontSize: moderateScale(30),
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    lineHeight: verticalScale(70),
  },
  bot: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: colors.kuDarkGreen,
    width: horizontalScale(150),
    height: verticalScale(40),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttontext: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    color: colors.kuWhite,
  },
});