import 'react-native-gesture-handler';
import * as React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import {colors} from '../../utils/Styles';

import MainScreen from '../screens/Screen03_00Main';
import MyInfoScreen from '../screens/Screen07_01MyInfo';

import RoomReservNavigator from './RoomReservNavigator';
import ReservCheckNavigator from './ReservCheckNavigator';
import RoomInfoNavigator from './RoomInfoNavigator';

import MainHeader from '../header/MainHeader';
import Header from '../header/Header';

const MainStack = createStackNavigator();

export default function MainNavigator({navigation}) {
  const backTitle = '이전';
  React.useLayoutEffect( ()=> {
    navigation.setOptions({headerShown: false});
  }, [navigation]);

  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="Main"
        component={MainScreen}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.kuDarkGreen,
          },
          headerLeft: null,
          headerRight: () => (
            MainHeader()
          ),
          title: '',
          headerTitleAlign: 'center',
          headerBackTitle: 'hi',
          headerBackTitleVisible: false,
        }}
      />
      <MainStack.Screen
        name="RoomReservNavigator"
        component={RoomReservNavigator}
      />
      <MainStack.Screen
        name="ReservCheckNavigator"
        component={ReservCheckNavigator}
      />
      <MainStack.Screen
        name="RoomInfoNavigator"
        component={RoomInfoNavigator}
      />
      <MainStack.Screen
        name="MyInfo"
        component={MyInfoScreen}
        options={{
          headerStyle: {
            backgroundColor: colors.kuDarkGreen,
          },
          headerRight: () => (
            Header()
          ),
          title: '나의 정보',
          headerBackTitle: backTitle,
          headerTintColor: colors.kuLightGray,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 24,
          },
        }}
      />

    </MainStack.Navigator>
  );
}