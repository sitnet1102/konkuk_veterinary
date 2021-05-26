import 'react-native-gesture-handler';
import * as React from 'react';

import {View, Text, StyleSheet, TouchableOpacity, BackHandler, Alert} from 'react-native';
import { colors } from '../../utils/Styles';


export default function CompleteScreen({route, navigation}){
  /**
    추가 수정해야 하는 사항
    //1. 완료 네비게이션 연결
    //2. 홈버튼 연결하기
    3. 메뉴 연결하기 
  */
  /*
  const {
    dateData, 
    classData, 
    //locaData, 
    buildingData,
    roomData,
    startTimeData, 
    endTimeData, 
    purposeData, 
    profData
  } = route.params;
  */

  React.useEffect(() => {
    const backAction = () => {
      Alert.alert("종료", "앱을 종료하시겠습니까?", [
        {
          text: "취소",
          onPress: () => null,
        },
        { text: "확인", onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return(
    <View style={completeStyle.container}>
      <View style={completeStyle.Top}>
        <Text style={completeStyle.TitleText}>예약신청 작성 완료</Text>
      </View>
      <View style={completeStyle.Mid}>
        <Text style={completeStyle.Text}>
          아래 내용을 확인해주세요
        </Text>
        <View style={completeStyle.Line}></View>
        <Text style={completeStyle.Text2}>
          ▣ 이용시간 30분 전까지
        </Text>
        <Text style={completeStyle.Text2}>
          취소할 수 있습니다
        </Text>
        <Text style={completeStyle.Text3}>
          + 주말 예약일 경우 
        </Text>
        <View>
          <Text style={completeStyle.Text4}>
            ▣ 대관신청서 출력 및 작성
          </Text>
          <Text style={completeStyle.Text4}>
            ▣ 주임교수님 확인 받기
          </Text>
          <Text style={completeStyle.Text4}>
            ▣ 행정실에 제출하여 
          </Text>
          <Text style={completeStyle.Text5}>
            총무 · 구매팀으로
          </Text>
          <Text style={completeStyle.Text5}>
            공문 요청하기 
          </Text>
        </View>
        {
        /*

        <Text>{
        route.params.data.dateData + " " +
        route.params.data.classData + " " +
        //route.params.data.locaData + " " +
        route.params.data.buildingData + " " +
        route.params.data.roomData + " " +
        route.params.data.startTimeData + " " +
        route.params.data.endTimeData + " " +
        route.params.data.purposeData + " " +
        route.params.data.profData
        }</Text>

        */
        }
      </View>
      <View style={completeStyle.Bot}>
        <TouchableOpacity 
          style={completeStyle.NextButton}
          onPress={() => navigation.navigate('Main')}
        >
          <Text style={completeStyle.NextText}>메인으로</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const completeStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  Top: {
    flex: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Mid: {
    alignItems: 'center',
    flex: 6.5,
  },
  Bot: {
    //flex: 2,
    height: 130,
    justifyContent: 'center',
  },
  TitleText: {
    fontSize: 44,
    fontWeight: 'bold',
  },
  
  Text: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  Text2: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  Text3: {
    fontSize: 28,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginLeft: '10%',
    marginBottom: '2%',
    marginTop: '5%',
  },
  Text4: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: '2%',
  },
  Text5: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: '6%',
  },
  Line: {
    height: 1,
    width: '85%',
    backgroundColor: colors.kuBlack,
    margin: '2%',
  },
  NextButton: {
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: colors.kuDarkGreen,
    width: '70%',
    //height: '60%',
    height: 50,
    opacity: 1,
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