import 'react-native-gesture-handler';
import * as React from 'react';

import {View, Text, ImageBackground, StyleSheet, Image} from 'react-native';

import {IMG_BACKGROUND, IMG_KULOGO} from '../../utils/icons';

export default function StartScreen() {
  /** 
    1. splash로 변경해서 넣어주기
    2. 건국대학교 로고 배경 없는 것으로 넣어주기 
   */
  return (
    <View style={startStyle.container}>
      <ImageBackground
        source={IMG_BACKGROUND}
        style={{width: '100%', height: '100%'}}>
        <View style={startStyle.startTop}>
          <Image style={startStyle.startLogoImage} source={IMG_KULOGO}/>
        </View>
        <View style={startStyle.startMid}>
          <Text style={startStyle.startTitleText}>건국대학교</Text>
          <Text style={startStyle.startTitleText}>수의과대학</Text>
          <Text style={startStyle.startTitleText}>강의실대여</Text>
        </View>
        <View style={startStyle.startBot}>
        </View>
      </ImageBackground>
    </View>
  );
}

const startStyle = StyleSheet.create({
  // 폰트 사이즈 정리해야함
  container: {
    flex: 1,
  },
  startTop: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startMid: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 4,
  },
  startBot: {
    flex: 3,
  },
  startLogoImage: {
    aspectRatio: 0.2,
    resizeMode: 'contain',
  },
  startTitleText: {
    fontWeight: 'bold',
    fontSize: 42,
  }
});