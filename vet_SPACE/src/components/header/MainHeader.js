import 'react-native-gesture-handler';
import * as React from 'react';

import {StyleSheet, Image,TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {IC_MENU} from '../../utils/icons';

export default function MainHeader() {
  const navigation = useNavigation();
  return(
    <TouchableOpacity 
      style={headerStyle.headerMenuTouchBox}
      onPress={() => navigation.toggleDrawer()}
    >
      <Image source={IC_MENU}/>
    </TouchableOpacity>
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
