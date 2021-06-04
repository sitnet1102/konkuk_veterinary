import 'react-native-gesture-handler';
import * as React from 'react';

import {View, StyleSheet, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {IC_MENU, IC_HOME} from '../../utils/icons';


export default function Header() {
  const navigation = useNavigation();
  return(
    <View style={headerStyle.headerContainer}>
      <TouchableOpacity 
        style={headerStyle.headerHomeTouchBox}
        onPress={() => navigation.navigate('Main')}
        >
        <Image source={IC_HOME}/>
      </TouchableOpacity>
      <TouchableOpacity 
        style={headerStyle.headerMenuTouchBox}
        onPress={() => navigation.toggleDrawer()}
        >
        <Image source={IC_MENU}/>
      </TouchableOpacity>
    </View>
  );
}

const headerStyle = StyleSheet.create({
  headerMenuTouchBox:{
    // padding 크기 정리해야함 
    // 아이콘 바꾸면 바꿀 예정임 
    padding: 5,
    //scaleX: 0.5,
  },
  headerHomeTouchBox: {
    padding: 5,
    marginRight: '10%',
  },
  headerContainer: {
    flexDirection: 'row',
  },
});
