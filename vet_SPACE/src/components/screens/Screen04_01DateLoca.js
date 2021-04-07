import 'react-native-gesture-handler';
import * as React from 'react';

import {View, Text, StyleSheet,TouchableOpacity, Alert} from 'react-native';
import { colors } from '../../utils/Styles';

import DateSelectModal from '../modal/DateSelectModal';
import ClassificationSelectModal from '../modal/ClassificationSelectModal';
import LocationSelectModal from '../modal/LocationSelectModal';

export default function DateLocaScreen({navigation}){
  /**
    추가 및 변경해야 하는 내용
    //1. 날짜, 구분, 장소 각각 선택창 UI
    //2. 다음 버튼 활성화 옵션
    //3. 다믕 버튼 활성화 스타일 
    4. 메뉴 연결
    //5. 홈 버튼 연결
   */
  const [dateSelectModal, setDateSelectModal] = React.useState(false);
  const [dateData, setDateData] = React.useState('선 택');
  const [dateStyle, setDateStyle] = React.useState(false);
  
  const [classificationSelectModal, setClassificationSelectModal] = React.useState(false);
  const [classificationData, setClassificationData] = React.useState('선 택');
  const [classificationStyle, setClassificationStyle] = React.useState(false);

  const [locationSelectModal, setLocationSelectModal] = React.useState(false);
  const [locationData, setLocationData] = React.useState('선 택');
  const [locationStyle, setLocationStyle] = React.useState(false);

  const toggleDateSelectModal =  () => {
    setDateSelectModal(prev => (!prev));
  };
  const dateHandler = (data) => {
    if(classificationStyle){
      setClassificationStyle(false);
      setClassificationData('선 택');
    }
    if(locationStyle){
      setLocationStyle(false);
      setLocationData('선 택');
    }
    setDateData(data);
    toggleDateSelectModal();
    dateStyleChange();
  };
  const dateStyleChange = () => {
    setDateStyle(true);
  };
  
  const toggleClassificationSelectModal = () => {
    if(!dateStyle){
      Alert.alert("날짜 오류","날짜를 먼저 선택해주세요");
    }else{
      setClassificationSelectModal(prev => (!prev));
    }
  };
  const classificationHandler = (data) => {
    if(locationStyle){
      setLocationStyle(false);
      setLocationData('선 택');
    }
    setClassificationData(data);
    toggleClassificationSelectModal();
    classificationStyleChange();
    
  };
  const classificationStyleChange = () => {
    setClassificationStyle(true);
  };
  
  const toggleLocationSelectModal = () => {
    if(!dateStyle){
      Alert.alert("날짜 오류","날짜를 먼저 선택해주세요");
    }else if(!classificationStyle){
      Alert.alert("구분 오류","구분을 먼저 선택해주세요");
    }else{
      setLocationSelectModal(prev => (!prev));
    }
  };
  const locationHandler = (data) => {
    setLocationData(data);
    toggleLocationSelectModal();
    locationStyleChange();
  };
  const locationStyleChange = () => {
    setLocationStyle(true);
  };

  return (
    <View style={DateLocaStyle.container}>
      <View style={DateLocaStyle.Top}>
      </View>
      <View style={DateLocaStyle.Mid}>
        <View style={DateLocaStyle.Container}>
          <View style={DateLocaStyle.TextContainer}>
            <Text style={DateLocaStyle.Text}>날짜 :</Text>
          </View>
          <TouchableOpacity 
            style={DateLocaStyle.SelectBox}
            onPress={() => toggleDateSelectModal()}
          >
            <Text style={
              dateStyle ?
              DateLocaStyle.InboxSelectedText
              : DateLocaStyle.InboxText
            }>{dateData}</Text>
          </TouchableOpacity>
        </View>
        <View style={DateLocaStyle.Container}>
          <View style={DateLocaStyle.TextContainer}>
            <Text style={DateLocaStyle.Text}>구분 :</Text>
          </View>
          <TouchableOpacity 
            style={DateLocaStyle.SelectBox}
            onPress={()=>toggleClassificationSelectModal()}
          >
            <Text style={
              classificationStyle ?
              DateLocaStyle.InboxSelectedText2
              : DateLocaStyle.InboxText
            }>{classificationData}</Text>
          </TouchableOpacity>
        </View>
        <View style={DateLocaStyle.Container}>
          <View style={DateLocaStyle.TextContainer}>
            <Text style={DateLocaStyle.Text}>장소 :</Text>
          </View>
          <TouchableOpacity 
            style={DateLocaStyle.SelectBox}
            onPress={()=>toggleLocationSelectModal()}
          >
            <Text style={
              locationStyle ? 
              DateLocaStyle.InboxSelectedText3
              : DateLocaStyle.InboxText
            }>{locationData}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={DateLocaStyle.Bot}>
        <TouchableOpacity 
          disabled={!(dateStyle && classificationStyle && locationStyle)}
          style={
            dateStyle && classificationStyle && locationStyle ?
            DateLocaStyle.ActivedNextButton
            : DateLocaStyle.NextButton
          }
          onPress={() => navigation.navigate('TimeSelect', {
            data : {
              dateData: dateData,
              classData: classificationData,
              locaData: locationData,
            }
          })}
        >
          <Text style={DateLocaStyle.NextText}>다     음</Text>
        </TouchableOpacity>
      </View>
      {dateSelectModal ? 
        <DateSelectModal 
          modalHandler={()=>toggleDateSelectModal()}
          dataHandler={(data)=>dateHandler(data)}
        /> 
        : <></>
      }
      {classificationSelectModal ?
        <ClassificationSelectModal
          modalHandler={()=>toggleClassificationSelectModal()}
          dataHandler={(data)=>classificationHandler(data)}
        /> 
        : <></>
      }
      {locationSelectModal ?
        <LocationSelectModal
          modalHandler={()=>toggleLocationSelectModal()}
          dataHandler={(data)=>locationHandler(data)}
        /> 
        : <></>
      }
    </View>
  );
}

const DateLocaStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  Top:{
    flex: 1,
  },
  Mid: {
    flex: 7,
  },
  Bot: {
    //flex: 2,
    height: 130,
    justifyContent: 'center',
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
    width: 250,
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
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.kuBlack,
  },
  InboxSelectedText2: {
    alignSelf: 'center',
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.kuBlack,
  },
  InboxSelectedText3: {
    alignSelf: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.kuBlack,
  },
  NextButton: {
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: colors.kuDarkGreen,
    width: '70%',
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
