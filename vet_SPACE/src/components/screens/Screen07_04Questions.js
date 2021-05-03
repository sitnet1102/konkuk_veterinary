import 'react-native-gesture-handler';
import * as React from 'react';

import {StyleSheet, View, Image, Text} from 'react-native';
import {WebView} from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RFPercentage } from 'react-native-responsive-fontsize';

import { colors } from '../../utils/Styles';
import {IC_PREVIOUS} from '../../utils/icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Question_Link({navigation}) {
  return (
    <SafeAreaView style = {questionStyle.container}>
      <View style={questionStyle.top}>
        <TouchableOpacity 
          style={questionStyle.touchBox}
          onPress={() => navigation.navigate("Main")}
        >
          <Image
            source={IC_PREVIOUS}
          />
          <Text style={questionStyle.text}>
            메인
          </Text>
        </TouchableOpacity>
      </View>
      <WebView 
        source={{uri: 'https://www.notion.so/a894d3c16211427383c035ae9c3a2796?v=1ba256da5eda4603b10ba793a3916caa'}}
      />
    </SafeAreaView>
  );
}

const questionStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    height: RFPercentage(7),
    justifyContent: 'center',
    backgroundColor: colors.kuDarkGreen,
  },
  touchBox: {
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: RFPercentage(1),
  },
  text: {
    fontSize: RFPercentage(3),
    fontWeight: 'bold',
    color: colors.kuWhite,
  },
});