import 'react-native-gesture-handler';
import * as React from 'react';

import {StyleSheet, View, Image, Text} from 'react-native';
import {WebView} from 'react-native-webview';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '../../utils/Styles';
import {IC_PREVIOUS} from '../../utils/icons';
import {horizontalScale, verticalScale, moderateScale} from '../../utils/scailing';

export default function Help_Link({navigation}) {
  return (
    <SafeAreaView style = {helpStyle.container}>
      <View style={helpStyle.top}>
        <TouchableOpacity 
          style={helpStyle.touchBox}
          onPress={() => navigation.navigate("Main")}
        >
          <Image
            source={IC_PREVIOUS}
          />
          <Text style={helpStyle.text}>
            메인
          </Text>
        </TouchableOpacity>
      </View>
      <WebView 
        source={{uri: 'https://www.notion.so/cdb971a22fa64b299d04d12048b0e20e'}}
      />
    </SafeAreaView>
  );
}

const helpStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    height: verticalScale(55),
    justifyContent: 'center',
    backgroundColor: colors.kuDarkGreen,
  },
  touchBox: {
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: horizontalScale(10),
  },
  text: {
    fontSize: moderateScale(28),
    fontWeight: 'bold',
    color: colors.kuWhite,
  },
});