import 'react-native-gesture-handler';
import * as React from 'react';

import {StyleSheet, View, Image, Text} from 'react-native';
import {WebView} from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RFPercentage } from 'react-native-responsive-fontsize';

import { colors } from '../../utils/Styles';
import {IC_PREVIOUS} from '../../utils/icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
        source={{uri: 'https://www.notion.so/876c0b53525c42a19c9840b16941f10b'}}
      />
    </SafeAreaView>
  );
}

const helpStyle = StyleSheet.create({
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