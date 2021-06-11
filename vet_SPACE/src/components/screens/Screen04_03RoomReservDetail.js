import 'react-native-gesture-handler';
import * as React from 'react';

import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {Table, Row} from 'react-native-table-component';

import { colors } from '../../utils/Styles';
import { FIRESTORE_DATA1, FIRESTORE_DATA2 } from '../../utils/firebaseData';
import {horizontalScale, verticalScale, moderateScale} from '../../utils/scailing';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import PurposeSelectModal from '../modal/PurposeSelectModal';
import ProfSelectModal from '../modal/ProfSelectModal';
import NameInputModal from '../modal/NameInputModal';
import PhoneInputModal from '../modal/PhoneInputModal';

export default function RoomReservDetailScreen({route, navigation}){
  const [adminCheck, setAdminCheck] = React.useState(false);
  const [__name, setName] = React.useState('선 택');
  const [__phone, setPhone] = React.useState('선 택');
  
  const __time = route.params.data.startTimeData + " ~ " + route.params.data.endTimeData;

  const state = {
    tableIndex: [
      ['신청자'],
      ['연락처'],
      ['시 간'],
      ['목 적'],
      ['담당교수'],
    ],
    widthArr: [
      '100%'
    ],
    tabledata: [
      [__name],
      [__phone],
      [__time],
    ],
  }

  const [purposeSelectModal, setPurposeSelectModal] = React.useState(false);
  const [purposeData, setPurposeData] = React.useState('선 택');
  const [purposeStyle, setPurposeStyle] = React.useState(false);

  const [profSelectModal, setProfSelectModal] = React.useState(false);
  const [profData, setProfData] = React.useState('선 택');
  const [profStyle, setProfStyle] = React.useState(false);
  
  const [nameInputModal, setNameInputModal] = React.useState(false);
  const [nameStyle, setNameStyle] = React.useState(false);
  
  const [phoneInputModal, setPhoneInputModal] = React.useState(false);
  const [phoneStyle, setPhoneStyle] = React.useState(false);

  const togglePurposeSelectModal =  () => {
    setPurposeSelectModal(prev => (!prev));
  };
  const purposeHandler = (data) => {
    setPurposeData(data);
    togglePurposeSelectModal();
    purposeStyleChange();
  };
  const purposeStyleChange = () => {
    setPurposeStyle(true);
  };

  const toggleProfSelectModal =  () => {
    setProfSelectModal(prev => (!prev));
  };
  const profHandler = (data) => {
    setProfData(data);
    toggleProfSelectModal();
    profStyleChange();
  };
  const profStyleChange = () => {
    setProfStyle(true);
  };
  
  const toggleNameInputModal =  () => {
    setNameInputModal(prev => (!prev));
  };
  const nameHandler = (data) => {
    setName(data);
    toggleNameInputModal();
    nameStyleChange();
  };
  const nameStyleChange = () => {
    setNameStyle(true);
  };

  const togglePhoneInputModal =  () => {
    setPhoneInputModal(prev => (!prev));
  };
  const phoneHandler = (data) => {
    setPhone(data);
    togglePhoneInputModal();
    phoneStyleChange();
  };
  const phoneStyleChange = () => {
    setPhoneStyle(true);
  };

  const onPressComplete = () => {
    const check = true;
    const sNum = (Number(route.params.data.startTimeData.substr(0,2)) - 8 ) * 2 + (Number(route.params.data.startTimeData.substr(3)/30));
    const eNum = (Number(route.params.data.endTimeData.substr(0,2)) - 8 ) * 2 + (Number(route.params.data.endTimeData.substr(3)/30)) - 1;
    firestore().collection(FIRESTORE_DATA1).doc(route.params.data.dateData).collection('Data')
    .where("room_id", "==", "/"+route.params.data.classData+"/"+route.params.data.buildingData+"/"+route.params.data.roomData).where("use_check", "==", true).get()
    .then(querySnapshot => {
      if(!querySnapshot.empty){
        querySnapshot.forEach(doc => {
          const s_time = doc.get('start_time');
          const e_time = doc.get('end_time');
          const startnum = (Number(s_time.substr(0,2)) - 8 ) * 2 + (Number(s_time.substr(3)/30));
          const endnum = (Number(e_time.substr(0,2)) - 8 ) * 2 + (Number(e_time.substr(3)/30)) - 1;
          if((startnum <= sNum && endnum >= sNum) || (startnum <= eNum && endnum >= eNum)){
            check = false;
          }
        })
      }
      if(check){
        firestore().collection(FIRESTORE_DATA1).doc(route.params.data.dateData).collection('Data').add({
          apply_date: firestore.Timestamp.fromDate(new Date()),
          start_time: route.params.data.startTimeData,
          end_time: route.params.data.endTimeData,
          prof_name: profData,
          purpose: purposeData,
          reserv_confirm: false,
          use_check: true,
          room_id: "/"+route.params.data.classData+"/"+route.params.data.buildingData+"/"+route.params.data.roomData,
          stored_from: 0,
          user_id: auth().currentUser.uid,
          user_name: __name,
          phone_number: __phone,
        }).then(DocumentReference => {
          firestore().collection(FIRESTORE_DATA2).doc(auth().currentUser.uid).collection('reservation').doc(DocumentReference.id).set({
            id : DocumentReference.id,
            date : route.params.data.dateData,
          }).then(() => {
            navigation.navigate('Complete');
          }).catch(e => {
            /*
              예약 데이터는 저장되었는데 사용자 정보에 저장이 되지 않는경우 처리 고려해봐야 함 ?
            */
            firestore().collection(FIRESTORE_DATA1).doc(route.params.data.dateData).collection('Data').doc(DocumentReference.id).delete()
            .then(() => {
              Alert.alert('예약 오류','예약이 실패하였습니다.\n다시 예약해주세요.');
            }).catch(e => {
              Alert.alert('error 433',e.code);
            });
          });
        }).catch(e => {
          Alert.alert('error 432',e.code);
        });
      }else{
        Alert.alert('예약 오류 431','예약이 불가능합니다.다시 예약해주세요',[
          {
            text: '확인',
            onPress: () => navigation.navigate('Main')
          }
        ]);
      }
    }).catch(error => {
      Alert.alert('예약 오류 430', error.code + '\n예약이 불가능합니다.다시 예약해주세요',[
        {
          text: '확인',
          onPress: () => navigation.navigate('Main')
        }
      ]);
    })
  };

  React.useEffect(() => {
    firestore().collection(FIRESTORE_DATA2).doc(auth().currentUser.uid).get().then(querySnapshot => {
      if(querySnapshot.data().user_type === "관리자"){
        setAdminCheck(true);
      }else{
        setName(auth().currentUser.displayName);
        setPhone(querySnapshot.data().phone_number);
      }
    });
  },[]);


  return (
    <View style={detailStyle.container}>
      <View style={detailStyle.Top}>
        <Text style={detailStyle.TitleText}>
          세부사항입력
        </Text>
      </View>
      <View style={detailStyle.Mid}>
        <View style={detailStyle.midContainer}>
          <View style={detailStyle.container1}>
            <Table>
              {
                state.tableIndex.map((rowData, index) => (
                  <Row
                    key={index}
                    data={rowData}
                    widthArr={state.widthArr}
                    textStyle={detailStyle.text1}
                  />
                ))
              }
            </Table>
          </View>
          <View style={detailStyle.line}></View>
          <View style={detailStyle.container2}>
            {
              adminCheck ?
              <>
                <TouchableOpacity
                  onPress={()=>toggleNameInputModal()}
                >
                  <Text style={
                    nameStyle ?
                    detailStyle.selectedText3
                    : detailStyle.text3
                  }>{__name}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={()=>togglePhoneInputModal()}
                >
                  <Text style={
                    phoneStyle ?
                    detailStyle.selectedText3
                    : detailStyle.text3
                  }>{__phone}</Text>
                </TouchableOpacity>
              </>
              :
              <>
                <Text style={detailStyle.text2}>{__name}</Text>
                <Text style={detailStyle.text2}>{__phone}</Text>
              </>
            }
            <Text style={detailStyle.text2}>{__time}</Text>
            <TouchableOpacity
              onPress={()=>togglePurposeSelectModal()}
              >
              <Text style={
                purposeStyle ?
                detailStyle.selectedText3
                : detailStyle.text3
              }>{purposeData}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={()=>toggleProfSelectModal()}
            >
              <Text style={
                profStyle ?
                detailStyle.selectedText3
                : detailStyle.text3
              }>{profData}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={detailStyle.Bot}>
        <TouchableOpacity 
          disabled={
            adminCheck ?
            !(nameStyle && phoneStyle && purposeStyle && profStyle)
            : !(purposeStyle && profStyle)
          }
          style={
            purposeStyle && profStyle ?
            detailStyle.ActivedNextButton
            : detailStyle.NextButton
          }
          onPress={() => onPressComplete()}
        >
          <Text style={detailStyle.NextText}>제출하기</Text>
        </TouchableOpacity>
      </View>
      {nameInputModal ? 
        <NameInputModal 
          modalHandler={()=>toggleNameInputModal()}
          dataHandler={(data)=>nameHandler(data)}
        /> 
        : <></>
      }
      {phoneInputModal ? 
        <PhoneInputModal 
          modalHandler={()=>togglePhoneInputModal()}
          dataHandler={(data)=>phoneHandler(data)}
        /> 
        : <></>
      }
      {purposeSelectModal ? 
        <PurposeSelectModal 
          modalHandler={()=>togglePurposeSelectModal()}
          dataHandler={(data)=>purposeHandler(data)}
        /> 
        : <></>
      }
      {profSelectModal ? 
        <ProfSelectModal 
          modalHandler={()=>toggleProfSelectModal()}
          dataHandler={(data)=>profHandler(data)}
        /> 
        : <></>
      }
    </View>
  );
}

const detailStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  Top: {
    flex: 2,
    justifyContent: 'center',
  },
  TitleText: {
    alignSelf: 'center',
    fontSize: moderateScale(48),
    fontWeight: 'bold',
  },
  Mid: {
    flex: 6,
  },
  midContainer: {
    height: verticalScale(400),
    flexDirection: 'row',
    marginHorizontal: horizontalScale(25),
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.kuDarkGray,
  },
  container1: {
    flex: 3,
    marginRight: horizontalScale(15),
  },
  text1: {
    //fontSize: RFPercentage(3.2),
    fontSize: moderateScale(24),
    fontWeight: 'bold',
    alignSelf: 'flex-end',
    lineHeight: verticalScale(78),
  },
  line: {
    width: 1,
    marginVertical: verticalScale(20),
    backgroundColor: colors.kuDarkGray,
  },
  container2: {
    flex: 5,
    marginLeft: horizontalScale(15),
  },
  text2: {
    fontSize: moderateScale(24),
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    lineHeight: verticalScale(78),
  },
  text3: {
    color: colors.kuDarkGray,
    fontSize: moderateScale(24),
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    textDecorationLine: 'underline',
    lineHeight: verticalScale(78),
  },
  selectedText3: {
    color: colors.kuBlack,
    fontSize: moderateScale(24),
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    textDecorationLine: 'underline',
    lineHeight: verticalScale(78),
  },
  Bot: {
    height: verticalScale(130),
    justifyContent: 'center',
  },
  NextButton: {
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: colors.kuDarkGreen,
    width: '70%',
    height: verticalScale(50),
    opacity: 0.5,
    borderWidth: 1,
    borderRadius: 5,
  }, 
  ActivedNextButton: {
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: colors.kuDarkGreen,
    width: '70%',
    height: verticalScale(50),
    borderWidth: 1,
    borderRadius: 5,
  }, 
  NextText: {
    alignSelf: 'center',
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    color: colors.kuWhite,
  },
});