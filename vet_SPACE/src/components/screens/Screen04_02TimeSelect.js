import 'react-native-gesture-handler';
import * as React from 'react';

import {View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import {Table, Row} from 'react-native-table-component';
import { colors } from '../../utils/Styles';
import { FIRESTORE_DATA1 } from '../../utils/firebaseData';

import firestore from '@react-native-firebase/firestore';

import TimeSelectModal from '../modal/TimeSelectModal';

export default function TimeSelectScreen({route, navigation}){
  /**
    추가로 넣어주어야 하는 부분
    //1. 시간 선택 시 스타일 변경
    //2. 시간 선택 시 선택된 시간으로 선택 박스 변경
    //3. 선택 박스 선택 시 넘어가는 UI
    //4. 시간 시작 종료 모두 선택 시 다음 버튼 활성화
    //5. 다음 버튼 활성화 시 스타일 변화 
    //6. 테이블 모양 가다듬기
    //7. 테이블에서 선택된 시간 스타일 변화
    //8. 테이블에서 이미 선택된 시간 스타일 변화
    9. 테이블 데이터베이스 연동 
    //10. 메뉴 연결
    //11. 홈 버튼 연결
  */
  
  const [startTimeSelectModal, setStartTimeSelectModal] = React.useState(false);
  const [startTimeData, setStartTimeData] = React.useState('선 택');
  const [startTimeStyle, setStartTimeStyle] = React.useState(false);

  const [endTimeSelectModal, setEndTimeSelectModal] = React.useState(false);
  const [endTimeData, setEndTimeData] = React.useState('선 택');
  const [endTimeStyle, setEndTimeStyle] = React.useState(false);

  let [time, setTime] = React.useState([]);
  let [timeStyle, setTimeStyle] = React.useState([]);

  React.useEffect(() => {
    let time_tmp = [
      ['08:00 ~ 08:30', ' '],
      ['08:30 ~ 09:00', ' '],
      ['09:00 ~ 09:30', ' '],
      ['09:30 ~ 10:00', ' '],
      ['10:00 ~ 10:30', ' '],
      ['10:30 ~ 11:00', ' '],
      ['11:00 ~ 11:30', ' '],
      ['11:30 ~ 12:00', ' '],
      ['12:00 ~ 12:30', ' '],
      ['12:30 ~ 13:00', ' '],
      ['13:00 ~ 13:30', ' '],
      ['13:30 ~ 14:00', ' '],
      ['14:00 ~ 14:30', ' '],
      ['14:30 ~ 15:00', ' '],
      ['15:00 ~ 15:30', ' '],
      ['15:30 ~ 16:00', ' '],
      ['16:00 ~ 16:30', ' '],
      ['16:30 ~ 17:00', ' '],
      ['17:00 ~ 17:30', ' '],
      ['17:30 ~ 18:00', ' '],
      ['18:00 ~ 18:30', ' '],
      ['18:30 ~ 19:00', ' '],
      ['19:00 ~ 19:30', ' '],
      ['19:30 ~ 20:00', ' '],
      ['20:00 ~ 20:30', ' '],
      ['20:30 ~ 21:00', ' '],
      ['21:00 ~ 21:30', ' '],
      ['21:30 ~ 22:00', ' '],
    ];
    let timeStyle_tmp = [
      0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,
    ];
    firestore().collection(FIRESTORE_DATA1).doc(route.params.data.dateData).collection('Data')
    .where("room_id", "==", "/"+route.params.data.classData+"/"+route.params.data.buildingData+"/"+route.params.data.roomData).where("use_check", "==", true).get()
    .then(querySnapshot => {
      if(querySnapshot.empty){
        //console.log('empty');
        Alert.alert('예약','예약이 없습니다.');
      }else{
        querySnapshot.forEach(doc => {
          const s_time = doc.get('start_time');
          const e_time = doc.get('end_time');
          const startnum = (Number(s_time.substr(0,2)) - 8 ) * 2 + (Number(s_time.substr(3)/30));
          const endnum = (Number(e_time.substr(0,2)) - 8 ) * 2 + (Number(e_time.substr(3)/30));
          const user_name = doc.get('user_name');
          const prof_name = doc.get('prof_name');
          const purpose = doc.get('purpose');
          for(let i=startnum;i<endnum;i++){
            time_tmp[i][1] = user_name+"/"+s_time+" ~ "+e_time+"\n"+purpose+"/담당 교수: "+prof_name;
            timeStyle_tmp[i] = 2;
          }
        })
      }
      setTime(time_tmp);
      setTimeStyle(timeStyle_tmp);
    }).catch(e => {
      Alert.alert('error 420', e.code);
    });
    
    return () => {
      setTime([]);
      setTimeStyle([]);
    };
  }, []);

  const toggleStartTimeSelectModal =  () => {
    setStartTimeSelectModal(prev => (!prev));
  };
  const startTimeHandler = (selectedHour,selectedMin) => {
    // 리셋 필요 
    if(endTimeStyle){
      resetTable();
      setEndTimeData('선 택');
      setEndTimeStyle(false);
    }
    if(selectedHour === '22'){
      Alert.alert("경고", "시작시간은 22시보다 빨라야합니다");
    }else{
      setStartTimeData(selectedHour+":"+selectedMin);
      toggleStartTimeSelectModal();
      startTimeStyleChange();
    }
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
    // 선택 할때마다 reset 해주어야함 
    const startTimetmp = Number(startTimeData.substr(0,2)+startTimeData.substr(3));
    let startnum = (Number(startTimeData.substr(0,2)) - 8 ) * 2 + (Number(startTimeData.substr(3)/30));
    let endnum = (Number(selectedHour) - 8) * 2 + (Number(selectedMin)/30);
    if(startTimetmp/* + 100 > */ >= Number(selectedHour+""+selectedMin)){
      Alert.alert("경고", "시작시간보다 종료시간이 같거나 빠릅니다");
    }else if(selectedHour === '22' && selectedMin === '30'){
      Alert.alert("경고", "종료시간은 22시보다 빠르거나 같아야합니다");
    }else{
      let check = true;
      resetTable();
      for(let i=startnum;i<endnum;i++){
        if(timeStyle[i] !== 0){
          check = false;
          break;
        } 
      }
      if(check){
        setEndTimeData(selectedHour+":"+selectedMin);
        toggleEndTimeSelectModal();
        endTimeStyleChange();
        for(let i=startnum;i<endnum;i++){
          time[i][1] = "예약 희망";
          timeStyle[i] = 1;
        }
      }else{
        Alert.alert("경고", "예약이 불가능한 시간입니다.");
      }
    }
  };
  const endTimeStyleChange = () => {
    setEndTimeStyle(true);
  };

  const resetTable = () => {
    let startnum = (Number(startTimeData.substr(0,2)) - 8 ) * 2 + (Number(startTimeData.substr(3)/30));
    let endnum  = (Number(endTimeData.substr(0,2)) - 8 ) * 2 + (Number(endTimeData.substr(3)/30));
    for(let i=startnum;i<endnum;i++){
      time[i][1] = " ";
      timeStyle[i] = 0;
    }
  };

  const state = {
    tableTitle: [route.params.data.dateData + "\n" + route.params.data.buildingData + "/" + route.params.data.roomData + "호 예약 내역"],
    widthArr: [370],
    divisionArr: ['시간', '내용'],
    widthArr2: [115,255],
    widthArr3: [115,255],
  };
  /*
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
  */
  return (
    <View style={timeSelectStyle.container}>
      <View style={timeSelectStyle.Top}>
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
                time.map((rowData, index) => (
                  <Row
                    key={index}
                    data={rowData}
                    widthArr={state.widthArr3}
                    style={timeStyle[index] !== 0 ? 
                      timeStyle[index] !== 1 ?
                      [timeSelectStyle.ScrollRowReserved]
                      : [timeSelectStyle.ScrollRowSelected]
                      : [timeSelectStyle.ScrollRow]
                    }
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
              //locaData: route.params.data.locaData,
              buildingData: route.params.data.buildingData,
              roomData: route.params.data.roomData,
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
  ScrollRowSelected: {
    height: 40,
    backgroundColor: colors.kuYellow,
  },
  ScrollRowReserved: {
    height: 40,
    backgroundColor: colors.kuBlue,
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
