import 'react-native-gesture-handler';
import * as React from 'react';

import {Text, View, StyleSheet, Alert, RefreshControl} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {Table, TableWrapper, Cell} from 'react-native-table-component';
//import RadioButtonRN from 'radio-buttons-react-native';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';

import {colors} from '../../utils/Styles';
import {FIRESTORE_DATA1} from '../../utils/firebaseData';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

export default function ListScreen({navigation}) {
  /**
    수정할 사항
    //1. 데이터 베이스 연결 
    //2. 데이터 베이스에서 가져와서 시간 순서대로 보여주기  -> 삭제
    //3. 이전 예약 데이터는 하단에 다른 스타일로 넣어주기
    //4. 상단에 정렬 텝 연결 / 시간순, 강의실순 -> 삭제
    5. 예약이 하나도 없을 경우에 UI 생각하기 -> 예약이 없습니다 
    6. 이전 예약을 체크 하지 않았을 때에도 없습니다로 넣어주기   
  */

  const [isSelected, setSelection] = React.useState(false);
  const onPressCheckBox = () => setSelection(()=>!isSelected);
  const [isRefresh, setRefresh] = React.useState(false);
  const onPressRefresh = React.useCallback(() => {
    setRefresh(true);
    wait(2000).then(() => setRefresh(false));
  },[]);
  const onPressRow = (data) => navigation.navigate('ReservDetail', {data});
  /*
  const radiobuttondata = [
    {label: '시간순'}, {label: '강의실순'}
  ];
  */
  const state = {
    widthArr: ['100%'],
  };
  let [tableData, setTableData] = React.useState([]);
  let [tableData2, setTableData2] = React.useState([]);

  /// 임시 데이터 넣기

  React.useEffect(() => {
    let tableData_tmp = [];
    let tableData_tmp2 = [];
    
    firestore().collection('User_info').doc(auth().currentUser.uid).collection('reservation').get()
    .then(querySnapshot => {
      if(querySnapshot.empty){
        //Alert.alert('','예약이 없습니다.');
        // 예약 없음의 경우가 많아서 일괄 처리하도록 함수로 만들 예정 
      }else{
        querySnapshot.forEach(doc => {
          firestore().collection(FIRESTORE_DATA1).doc(doc.get('date')).collection('Data').doc(doc.get('id')).get()
          .then(Snapshot => {
            if(Snapshot.get('use_check')){
              const date_num = Number(doc.get('date').substr(0,4)+doc.get('date').substr(5,2)+doc.get('date').substr(8,2));
              let month_tmp = new Date().getMonth()+1;
              if(month_tmp < 10){
                month_tmp = '0'+month_tmp;
              }
              let date_tmp = new Date().getDate();
              if(date_tmp < 10){
                date_tmp = '0'+date_tmp;
              }
              const today = Number(new Date().getFullYear() +''+ month_tmp+ date_tmp);
              if(date_num < today){
                tableData_tmp2.push({
                  date : doc.get('date'),
                  id : doc.get('id'),
                  detailData : Snapshot.data(),
                });
              }else{
                tableData_tmp.push({
                  date : doc.get('date'),
                  id : doc.get('id'),
                  detailData : Snapshot.data(),
                });
              }
            }
          }).catch(e => {
            Alert.alert('error511',e.code);
          });
        });
        // 예약 데이터가 없는 경우에 이전 페이지로 넘겨주기 
      }
    }).catch(e => {
      Alert.alert('error510',e.code);
      navigation.navigate('ReservCheck');
    });
    setTableData(tableData_tmp);
    setTableData2(tableData_tmp2);
    onPressRefresh();
  }, []);

  return(
    <View style={listStyle.container}>
      <View style={listStyle.top}>
        <View style={listStyle.checkBox}>
          <CheckBox
            disabled={false}
            value={isSelected}
            onValueChange={setSelection}
            boxType='square'
            style={listStyle.checkBox}
            onCheckColor={colors.kuDarkGreen}
            onTintColor={colors.kuDarkGreen}
          />
        </View>
        <View style={listStyle.topContainer}>
          <TouchableOpacity onPress={onPressCheckBox}>
            <Text style={listStyle.text1}>이전 예약 보기  </Text>
          </TouchableOpacity>
        </View>
        <View style={listStyle.line}></View>
        <View style={listStyle.topContainer}>
          <Text>아래로 드래그해서 새로고침하세요   </Text>
        </View>
        {/*
        <Text style={listStyle.text1}>  정렬 순서 :   </Text>
        <View style={listStyle.sortRadio}>
          <RadioButtonRN
            style={listStyle.radiobutton}
            data={radiobuttondata}
            //selectedBtn={(e) => console.log(e)}
            box={false}
            initial={1}
            boxStyle={listStyle.radiobuttonBox}
            textStyle={listStyle.radiobuttonText}
            activeColor={colors.kuDarkGreen}
            circleSize={10}
            labelHorizontal={false}
          />
        </View>
        */}
      </View>
      <View style={listStyle.bot}>
        <ScrollView 
          style={listStyle.scroll}
          persistentScrollbar={true}
          refreshControl={
            <RefreshControl
              refreshing={isRefresh}
              onRefresh={onPressRefresh}
            />
          }
        >
          
          <Table>
            {
              tableData.map((rowData, index) => (
                <TableWrapper
                  key={index}
                  widthArr={state.widthArr}
                  style={
                    [listStyle.scrollRow] 
                  }
                  textStyle={listStyle.text2}
                >
                  <TouchableOpacity onPress={() => onPressRow(rowData)}>
                    <View style={listStyle.tableTouchBox}>
                      <Text style={listStyle.text3}>
                        {
                          rowData.detailData.room_id.split('/')[2] + ' ' + rowData.detailData.room_id.split('/')[3] + '\n\n' + rowData.date + '\n\n' + rowData.detailData.start_time + '~' + rowData.detailData.end_time
                        }
                      </Text>
                      <View style={listStyle.textBox}>
                        <Text 
                          style={
                            rowData.detailData.reserv_confirm ?
                            listStyle.textConfirmed
                            : listStyle.textUnconfirmed
                          }
                        >
                          {
                            rowData.detailData.reserv_confirm ?
                            ' 예약 승인됨 '
                            : ' 예약 대기중 '
                          }
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </TableWrapper>
              ))
            }
          </Table>
          {
            isSelected ? 
            <>
            <View style={listStyle.line2}></View>
            <Text style={listStyle.text6}>이전 예약</Text>
            {/** 없는 경우 넣어주기  */
              tableData2.length === 0 ? 
              <>
                <Text style={listStyle.text4}>
                  {'\n\n'}
                  예약이 없습니다
                  {'\n\n\n\n'}
                </Text>
              </>
              : <>
                <Table>
                  {
                    tableData2.map((rowData, index) => (
                      <TableWrapper
                        key={index}
                        widthArr={state.widthArr}
                        style={[listStyle.scrollRow]}
                        textStyle={listStyle.text2}
                      >
                        <TouchableOpacity onPress={() => onPressRow(rowData)}>
                          <View style={listStyle.tableTouchBox}>
                            <Text style={listStyle.text3}>
                              {
                                rowData.detailData.room_id.split('/')[2] + ' ' + rowData.detailData.room_id.split('/')[3] + '\n\n' + rowData.date + '\n\n' + rowData.detailData.start_time + '~' + rowData.detailData.end_time
                              }
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </TableWrapper>
                    ))
                  }
                </Table>
              </>
            }
            </>
            : <></>
          }
        </ScrollView>
      </View>
    </View>
  );
}
  
const listStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.kuWhite,
  },
  top: {
    height: RFPercentage(8),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal : '3%',
    borderWidth: 1,
    borderColor: colors.kuDarkGray,
    borderRadius: 5,
  },
  bot: {
    flex: 1,
    marginHorizontal: '3%',
    marginBottom: '5%',
    marginTop: '2%',
  },
  checkBox: {
    marginTop: 4,
    marginLeft: 5,
    transform: [{scaleX: 0.8}, {scaleY: 0.8}]
  },
  text1: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  line: {
    width: 1,
    height: '60%',
    backgroundColor: colors.kuDarkGray,
    marginHorizontal: 10,
  },
  topContainer: {
    //flex: 1,
    //marginLeft: 10,
  },
  sortRadio: {
    flex: 1,
    alignItems:'center',
    marginBottom: 10,
  },
  radiobutton: {
    flexDirection: 'row',
    width: '51%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radiobuttonbox: {
    flex: 1,
  },
  radiobuttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  scroll: {

  },
  scrollRow: {
    height: RFPercentage(25),
    backgroundColor: colors.kuLightGray,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.kuDarkGray,
    marginVertical: 5,
  },
  text2: {
    marginLeft: 20,
    //alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  tableTouchBox: {
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    //alignItems: 'center',
    marginLeft: 20,
  },
  text3: {
    fontWeight: 'bold',
    fontSize: RFValue(20),
    lineHeight: RFValue(25),
    alignSelf: 'center',
  },
  line2: {
    height: 1,
    width: '100%',
    backgroundColor: colors.kuDarkGray,
    marginVertical: 10,
  },
  refresh: {
    flexDirection: 'row',
  },
  text4: {
    fontWeight: 'bold',
    fontSize: RFValue(20),
    lineHeight: RFValue(25),
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  textUnconfirmed: {
    fontWeight: 'bold',
    fontSize: RFValue(15),
    lineHeight: RFValue(25),
    marginRight: 0,
    alignSelf: 'center',
    backgroundColor: colors.kuBlue,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.kuBlack,
  },
  text6: {
    fontWeight: 'bold',
    fontSize: RFValue(20),
    lineHeight: RFValue(25),
    marginTop: 10,
  },
  textConfirmed: {
    fontWeight: 'bold',
    fontSize: RFValue(15),
    lineHeight: RFValue(25),
    marginRight: 0,
    alignSelf: 'center',
    backgroundColor: colors.kuYellow,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.kuBlack,
  },
  textBox: {
    flex: 1,
    marginTop: 20,
  },
});