import 'react-native-gesture-handler';
import * as React from 'react';

import {View, Text, ImageBackground, StyleSheet} from 'react-native';
import { TouchableOpacity} from 'react-native-gesture-handler';
import { colors } from '../../utils/Styles';

import {IMG_BACKGROUND} from '../../utils/icons';

export default function MainScreen({navigation}){
  /**
    추가 변경해야할 사항
    1. 각 옵션 선택 시 넘어가는 네비게이션 연결 
    2. 메뉴 연결 
   */
  return (
    <View>
      <ImageBackground
        source={IMG_BACKGROUND}
        style={{width: '100%', height: '100%'}}>
        <View style={mainStyle.mainTop}>
          <Text style={mainStyle.mainTitleText}>수의과대학</Text>
          <Text style={mainStyle.mainTitleText}>강의실대여</Text>
        </View>
        <View style={mainStyle.mainMid}>
          <TouchableOpacity 
            style={mainStyle.mainTouchBox}
            onPress={() => navigation.navigate('DateLoca')}
            >
            <Text style={mainStyle.mainSelectTitleText}>강의실예약</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={mainStyle.mainTouchBox}
            //onPress={() => navigation.navigate('')}
            >
            <Text style={mainStyle.mainSelectTitleText}>예약확인</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={mainStyle.mainTouchBox}
            //onPress={() => navigation.navigate('')}
          >
            <Text style={mainStyle.mainSelectTitleText}>강의실정보</Text>
          </TouchableOpacity>
        </View>
        <View style={mainStyle.mainBot}>
          
        </View>
      </ImageBackground>
    </View>
  );
}

const mainStyle = StyleSheet.create({
  // 폰트 사이즈 정리해야함
  container: {
    flex: 1,
  }, 
  mainTop: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainMid: {
    justifyContent: 'center',
    flex: 4,
  },
  mainBot: {
    flex: 2,
  },
  mainTitleText: {
    fontWeight: 'bold',
    fontSize: 42,
  },
  mainTouchBox: {
    alignSelf: 'center',
    fontWeight: 'bold',
    backgroundColor: colors.kuLightGray,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    opacity: 0.8,
    margin: '2%',
    width: '70%',
    padding: '4%',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.kuDarkGreen,
  },
  mainSelectTitleText: {
    fontSize: 42,
  },
});