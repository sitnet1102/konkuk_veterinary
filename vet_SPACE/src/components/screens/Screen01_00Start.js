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
        <View style={startStyle.Top}>
          <Image style={startStyle.LogoImage} source={IMG_KULOGO}/>
        </View>
        <View style={startStyle.Mid}>
          <Text style={startStyle.TitleText}>건국대학교</Text>
          <Text style={startStyle.TitleText}>수의과대학</Text>
          <Text style={startStyle.TitleText}>강의실대여</Text>
        </View>
        <View style={startStyle.Bot}>
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
  Top: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Mid: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 4,
  },
  Bot: {
    flex: 3,
  },
  LogoImage: {
    aspectRatio: 0.2,
    resizeMode: 'contain',
  },
  TitleText: {
    fontWeight: 'bold',
    fontSize: 42,
  }
});