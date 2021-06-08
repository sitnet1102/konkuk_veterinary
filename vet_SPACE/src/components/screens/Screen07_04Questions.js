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
        source={{uri: 'https://www.notion.so/ed6219e087594a1185f20e60b0be970b?v=01c2e2a7c68c493f9f5322b4a5eaa236'}}
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