import 'react-native-gesture-handler';
import * as React from 'react';

import {StyleSheet, View, Image, Text} from 'react-native';
import {WebView} from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RFPercentage } from 'react-native-responsive-fontsize';

import { colors } from '../../utils/Styles';
import {IC_PREVIOUS} from '../../utils/icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Notice_Link({navigation}) {
  return (
    <SafeAreaView style = {noticeStyle.container}>
      <View style={noticeStyle.top}>
        <TouchableOpacity 
          style={noticeStyle.touchBox}
          onPress={() => navigation.navigate("Main")}
        >
          <Image
            source={IC_PREVIOUS}
          />
          <Text style={noticeStyle.text}>
            메인
          </Text>
        </TouchableOpacity>
      </View>
      <WebView 
        source={{uri: 'https://www.notion.so/9d5cafd0076843f792fc332ee4a6853c?v=cc61cf79e919472ea3b674635e9be97f'}}
      />
    </SafeAreaView>
  );
}

const noticeStyle = StyleSheet.create({
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