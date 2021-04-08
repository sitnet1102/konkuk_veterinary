import 'react-native-gesture-handler';
import * as React from 'react';

import {View, Text, StyleSheet, Alert} from 'react-native';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import {Table, Row} from 'react-native-table-component';
import { colors } from '../../utils/Styles';

import TimeSelectModal from '../modal/TimeSelectModal';

export default function TimeSelectScreen({route, navigation}){
  /**
    추가로 넣어주어야 하는 부분
    //1. 시간 선택 시 스타일 변경
    //2. 시간 선택 시 선택된 시간으로 선택 박스 변경
    //3. 선택 박스 선택 시 넘어가는 UI
    //4. 시간 시작 종료 모두 선택 시 다음 버튼 활성화
    //5. 다음 버튼 활성화 시 스타일 변화 
    6. 테이블 모양 가다듬기
    7. 테이블에서 선택된 시간 스타일 변화
    8. 테이블에서 이미 선택된 시간 스타일 변화
    9. 테이블 데이터베이스 연동 
    10. 메뉴 연결
    //11. 홈 버튼 연결
  */
  
  const [startTimeSelectModal, setStartTimeSelectModal] = React.useState(false);
  const [startTimeData, setStartTimeData] = React.useState('선 택');
  const [startTimeStyle, setStartTimeStyle] = React.useState(false);

  const [endTimeSelectModal, setEndTimeSelectModal] = React.useState(false);
  const [endTimeData, setEndTimeData] = React.useState('선 택');
  const [endTimeStyle, setEndTimeStyle] = React.useState(false);

  const toggleStartTimeSelectModal =  () => {
    setStartTimeSelectModal(prev => (!prev));
  };
  const startTimeHandler = (selectedHour,selectedMin) => {
    if(endTimeStyle){
      setEndTimeData('선 택');
      setEndTimeStyle(false);
    }
    setStartTimeData(selectedHour+":"+selectedMin);
    toggleStartTimeSelectModal();
    startTimeStyleChange();
  };
  const startTimeStyleChange = () => {
    setStartTimeStyle(true);
  };


  const toggleEndTimeSelectModal =  () => {
    if(!startTimeStyle){
      Alert.alert("경고","시작시간을 먼저 선택해주세요");
    }else{
      setEndTimeSelectModal(prev => (!prev));
    }
  };
  const endTimeHandler = (selectedHour,selectedMin) => {
    const startTimetmp = Number(startTimeData.substr(0,2)+startTimeData.substr(3));
    if(startTimetmp/* + 100 > */ >= Number(selectedHour+""+selectedMin)){
      Alert.alert("경고", "시작시간보다 종료시간이 같거나 빠릅니다");
    }else{
      setEndTimeData(selectedHour+":"+selectedMin);
      toggleEndTimeSelectModal();
      endTimeStyleChange();
    }
  };
  const endTimeStyleChange = () => {
    setEndTimeStyle(true);
  };

  const state = {
    tableTitle: [route.params.data.dateData + "\n" + route.params.data.locaData + "호 예약 내역"],
    widthArr: [370],
    divisionArr: ['시간', '내용'],
    widthArr2: [100,270],
    widthArr3: [100,270],
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
      <View style={timeSelectStyle.Top}>
        {//<Text>{route.params.data.dateData + " " + route.params.data.classData + " " + route.params.data.locaData}</Text>
        }
      </View>
      <View style={timeSelectStyle.Mid}>
        <View style={timeSelectStyle.Time}>
          <View style={timeSelectStyle.Container}>
            <View style={timeSelectStyle.TextContainer}>
              <Text style={timeSelectStyle.Text}>시간 :</Text>
            </View>
            <TouchableOpacity 
              style={timeSelectStyle.SelectBox}
              onPress={()=>toggleStartTimeSelectModal()}
            >
              <Text style={
                startTimeStyle ?
                timeSelectStyle.InboxSelectedText
                : timeSelectStyle.InboxText
              }>{startTimeData}</Text>
            </TouchableOpacity>
            <Text style={timeSelectStyle.Text2}>  부터</Text>
          </View>
          <View style={timeSelectStyle.Container}>
            <View style={timeSelectStyle.TextContainer}>
              <Text style={timeSelectStyle.Text}>    </Text>
            </View>
            <TouchableOpacity 
              style={timeSelectStyle.SelectBox}
              onPress={()=>toggleEndTimeSelectModal()}
            >
              <Text style={
                endTimeStyle ?
                timeSelectStyle.InboxSelectedText
                : timeSelectStyle.InboxText
              }>{endTimeData}</Text>
            </TouchableOpacity>
            <Text style={timeSelectStyle.Text2}>  까지</Text>
          </View>
        </View>
        <View style={timeSelectStyle.TimeSheet}>
          <Table borderStyle={timeSelectStyle.Border}>
            <Row 
              data={state.tableTitle} 
              //data={route.params.data.dateData}
              widthArr={state.widthArr} 
              style={timeSelectStyle.SheetTitle} 
              textStyle={timeSelectStyle.SheetTitleText}
            />
          </Table>
          <Table borderStyle={timeSelectStyle.Border}>
            <Row data={state.divisionArr} widthArr={state.widthArr2} style={timeSelectStyle.SheetDivision} textStyle={timeSelectStyle.SheetTitleText}/>
          </Table>
          <ScrollView 
            style={timeSelectStyle.Wrapper}
            persistentScrollbar={true}  // 안드로이드 스크롤바 보이기
          >
            <Table borderStyle={timeSelectStyle.Border}>
              {
                timeTableData.map((rowData, index) => (
                  <Row
                    key={index}
                    data={rowData}
                    widthArr={state.widthArr3}
                    style={[timeSelectStyle.ScrollRow]}
                    textStyle={timeSelectStyle.SheetText}
                  />
                ))
              }
            </Table>
          </ScrollView>
        </View>
      </View>
      <View style={timeSelectStyle.Bot}>
        <TouchableOpacity 
          disabled={!(startTimeStyle && endTimeStyle)}
          style={
            startTimeStyle && endTimeStyle ?
            timeSelectStyle.ActivedNextButton
            : timeSelectStyle.NextButton
          }
          onPress={() => navigation.navigate('RoomReservDetail', {
            data: {
              dateData: route.params.data.dateData,
              classData: route.params.data.classData,
              locaData: route.params.data.locaData,
              startTimeData: startTimeData,
              endTimeData: endTimeData,
            }
          })}
        >
          <Text style={timeSelectStyle.NextText}>다     음</Text>
        </TouchableOpacity>
      </View>
      {startTimeSelectModal ? 
        <TimeSelectModal 
          modalHandler={()=>toggleStartTimeSelectModal()}
          dataHandler={(selectedHour,selectedMin)=>startTimeHandler(selectedHour, selectedMin)}
        /> 
        : <></>
      }
      {endTimeSelectModal ? 
        <TimeSelectModal 
          modalHandler={()=>toggleEndTimeSelectModal()}
          dataHandler={(selectedHour,selectedMin)=>endTimeHandler(selectedHour,selectedMin)}
        /> 
        : <></>
      }
    </View>
  );
} 

const timeSelectStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  Top:{
    //flex: 0.5,
    height: 20,
  },
  Mid: {
    //flex: 7.5,
    //height: 450,
    flex: 1,
    //backgroundColor: colors.kuMagenta,
  },
  Bot: {
    //flex: 2,
    height: 130,
    justifyContent: 'center',
  },
  Time: {
    //flex: 3,
    marginBottom: 30,
  },
  TimeSheet: {
    flex: 5,
    marginHorizontal: 20,
    //margin: '5%',
    //borderColor: colors.kuBlack,
    //borderWidth: 1,
  },
  Container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginLeft: '2%',
    marginTop: '5%',
  },
  TextContainer: {
    width: '30%',
  },
  Text: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  SelectBox: {
    justifyContent: 'center',
    height: 40,
    width: 220,
    backgroundColor: colors.kuWhite,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.kuDarkGray,
  },
  InboxText: {
    alignSelf: 'center',
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.kuDarkGray,
  },
  InboxSelectedText: {
    alignSelf: 'center',
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.kuBlack,
  },
  Text2: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  Border: {
    //width: '100%',
    borderWidth: 1,
    borderColor: colors.kuBlack,
  },
  SheetTitle: {
    justifyContent: 'center',
    height: 55,
    backgroundColor: colors.kuWarmGray,
  },
  SheetTitleText: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  SheetDivision:  {
    backgroundColor: colors.kuLightGray,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Wrapper: {
    //marginTop: -1,
  },
  ScrollRow: {
    height: 40,
    backgroundColor: colors.kuLightGray,
  },
  SheetText: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  NextButton: {
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: colors.kuDarkGreen,
    width: '70%',
    //height: '60%',
    height: 50,
    opacity: 0.5,
    borderWidth: 1,
    borderRadius: 5,
  }, 
  ActivedNextButton: {
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: colors.kuDarkGreen,
    width: '70%',
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
  }, 
  NextText: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.kuWhite,
  },
});
