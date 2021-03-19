import 'react-native-gesture-handler';
import * as React from 'react';

import {Text, View, StyleSheet, Image, ScrollView} from 'react-native';


import {colors} from '../../utils/Styles';
import {IC_MENU, IC_HOME} from '../../utils/icons';

export default function DateSelectModal() {
  return(
    <View style={dateselectmodalStyle.container}>
      <Text>hi</Text>
    </View>
  );
}

const dateselectmodalStyle = StyleSheet.create({
  container: { 
    flex: 1,
  },
});