import 'react-native-gesture-handler';
import * as React from 'react';

import {View, Text, StyleSheet} from 'react-native';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import {Table, Row} from 'react-native-table-component';
import { colors } from '../../utils/Styles';


export default function TimeSelectScreen({navigation}){
  /**
    추가로 넣어주어야 하는 부분
    1. 시간 선택 시 스타일 변경
    2. 시간 선택 시 선택된 시간으로 선택 박스 변경
    3. 선택 박스 선택 시 넘어가는 UI
    4. 시간 시작 종료 모두 선택 시 다음 버튼 활성화
    5. 다음 버튼 활성화 시 스타일 변화 
    6. 테이블 모양 가다듬기
    7. 테이블에서 선택된 시간 스타일 변화
    8. 테이블에서 이미 선택된 시간 스타일 변화
    9. 테이블 데이터베이스 연동 
    10. 메뉴 연결
    11. 홈 버튼 연결
   */
  const state = {
    tableTitle: ['2021년 03월 01일 // 207호 예약 내역'],
    widthArr: [372],
    divisionArr: ['시간', '내용'],
    widthArr2: [100,272],
  };
  const timeTableData = [];
  for(let i = 0;i<14; i+=1){
    const rowData = [];
    const tmp = i+8;
    const tmp2 = i+9;
    if(tmp<10){
      tmp = '0'+tmp;
    }
    if(tmp2<10){
      tmp2 = '0'+tmp2;
    }
    rowData.push(tmp+'00~'+tmp2+'00');
    rowData.push(i);
    timeTableData.push(rowData);
  }
  return (
    <View style={timeSelectStyle.container}>
      <View style={timeSelectStyle.timeSelectTop}>
      </View>
      <View style={timeSelectStyle.timeSelectMid}>
        <View style={timeSelectStyle.timeSelectTime}>
          <View style={timeSelectStyle.timeSelectContainer}>
            <View style={timeSelectStyle.timeSelectTextContainer}>
              <Text style={timeSelectStyle.timeSelectText}>시간 :</Text>
            </View>
            <TouchableOpacity style={timeSelectStyle.timeSelectSelectBox}>
              <Text style={timeSelectStyle.timeSelectInboxText}>선 택</Text>
            </TouchableOpacity>
            <Text style={timeSelectStyle.timeSelectText2}>  부터</Text>
          </View>
          <View style={timeSelectStyle.timeSelectContainer}>
            <View style={timeSelectStyle.timeSelectTextContainer}>
              <Text style={timeSelectStyle.timeSelectText}>    </Text>
            </View>
            <TouchableOpacity style={timeSelectStyle.timeSelectSelectBox}>
              <Text style={timeSelectStyle.timeSelectInboxText}>선 택</Text>
            </TouchableOpacity>
            <Text style={timeSelectStyle.timeSelectText2}>  까지</Text>
          </View>
        </View>
        <View style={timeSelectStyle.timeSelectTimeSheet}>
          <Table borderStyle={timeSelectStyle.timeSelectBorder}>
            <Row data={state.tableTitle} widthArr={state.widthArr} style={timeSelectStyle.timeSelectSheetTitle} textStyle={timeSelectStyle.timeSelectSheetTitleText}/>
          </Table>
          <Table borderStyle={timeSelectStyle.timeSelectBorder}>
            <Row data={state.divisionArr} widthArr={state.widthArr2} style={timeSelectStyle.timeSelectSheetDivision} textStyle={timeSelectStyle.timeSelectSheetTitleText}/>
          </Table>
          <ScrollView style={timeSelectStyle.timeSelectWrapper}>
            <Table borderStyle={timeSelectStyle.timeSelectBorder}>
              {
                timeTableData.map((rowData, index) => (
                  <Row
                    key={index}
                    data={rowData}
                    widthArr={state.widthArr2}
                    style={[timeSelectStyle.timeSelectScrollRow]}
                    textStyle={timeSelectStyle.timeSelectSheetText}
                  />
                ))
              }
            </Table>
          </ScrollView>
        </View>
      </View>
      <View style={timeSelectStyle.timeSelectBot}>
        <TouchableOpacity 
          style={timeSelectStyle.timeSelectNextButton}
          onPress={() => navigation.navigate('Detail')}
        >
          <Text style={timeSelectStyle.timeSelectNextText}>다     음</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
} 

const timeSelectStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  timeSelectTop:{
    flex: 0.5,
  },
  timeSelectMid: {
    flex: 7.5,
  },
  timeSelectBot: {
    flex: 2,
    justifyContent: 'center',
  },
  timeSelectTime: {
    flex: 3,
  },
  timeSelectTimeSheet: {
    flex: 5,
    margin: '5%',
    //borderColor: colors.kuBlack,
    //borderWidth: 1,
  },
  timeSelectContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginLeft: '2%',
    marginTop: '5%',
  },
  timeSelectTextContainer: {
    width: '30%',
  },
  timeSelectText: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  timeSelectSelectBox: {
    justifyContent: 'center',
    height: 40,
    width: 220,
    backgroundColor: colors.kuWhite,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.kuDarkGray,
  },
  timeSelectInboxText: {
    alignSelf: 'center',
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.kuDarkGray,
  },
  timeSelectText2: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  timeSelectBorder: {
    borderWidth: 1,
    borderColor: colors.kuBlack,
  },
  timeSelectSheetTitle: {
    justifyContent: 'center',
    height: 40,
    backgroundColor: colors.kuWarmGray,
  },
  timeSelectSheetTitleText: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  timeSelectSheetDivision:  {
    backgroundColor: colors.kuLightGray,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeSelectWrapper: {
    //marginTop: -1,
  },
  timeSelectScrollRow: {
    height: 40,
    backgroundColor: colors.kuLightGray,
  },
  timeSelectSheetText: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  timeSelectNextButton: {
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: colors.kuDarkGreen,
    width: '70%',
    height: '60%',
    opacity: 0.5,
    borderWidth: 1,
    borderRadius: 5,
  }, 
  timeSelectNextText: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.kuWhite,
  },
});
