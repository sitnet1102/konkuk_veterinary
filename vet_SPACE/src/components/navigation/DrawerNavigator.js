import 'react-native-gesture-handler';
import * as React from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';

import MainNavigator from './MainNavigator';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator({navigation}) {
  React.useLayoutEffect( ()=> {
    navigation.setOptions({headerShown: false});
  }, [navigation]);
  return (
    <Drawer.Navigator
      drawerPosition="right"
      drawerType="front"
    >
      <Drawer.Screen
        name="MainNavigator"
        component={MainNavigator}
      />
    </Drawer.Navigator>
  );
}