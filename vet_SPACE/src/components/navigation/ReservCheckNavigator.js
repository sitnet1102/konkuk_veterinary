import 'react-native-gesture-handler';
import * as React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import {colors} from '../../utils/Styles';

import ReservCheckScreen from '../screens/Screen05_00ReservCheck';
import ListScreen from '../screens/Screen05_01List';
import ReservDetailScreen from '../screens/Screen05_01ReservDetail';
import StatusScreen from '../screens/Screen05_02Status';

import Header from '../header/Header';

const ReservCheckStack = createStackNavigator();

export default function ReservCheckNavigator({navigation}) {
  const backTitle = '이전';
  React.useLayoutEffect( ()=> {
    navigation.setOptions({headerShown: false});
  }, [navigation]);

  return(
    <ReservCheckStack.Navigator>
      <ReservCheckStack.Screen
        name="ReservCheck"
        component={ReservCheckScreen}
        options={{
          headerStyle: {
            backgroundColor: colors.kuDarkGreen,
          },
          headerRight: () => (
            Header()
          ),
          title: '예약 확인',
          headerBackTitle: backTitle,
          headerTintColor: colors.kuLightGray,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 24,
          },
        }}
      />
      <ReservCheckStack.Screen
        name="List"
        component={ListScreen}
        options={{
          headerStyle: {
            backgroundColor: colors.kuDarkGreen,
          },
          headerRight: () => (
            Header()
          ),
          title: '나의 예약 확인',
          headerBackTitle: backTitle,
          headerTintColor: colors.kuLightGray,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 24,
          },
        }}
      />
      <ReservCheckStack.Screen
        name="ReservDetail"
        component={ReservDetailScreen}
        options={{
          headerStyle: {
            backgroundColor: colors.kuDarkGreen,
          },
          headerRight: () => (
            Header()
          ),
          title: '나의 예약 확인',
          headerBackTitle: backTitle,
          headerTintColor: colors.kuLightGray,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 24,
          },
        }}
      />
      <ReservCheckStack.Screen
        name="Status"
        component={StatusScreen}
        options={{
          headerStyle: {
            backgroundColor: colors.kuDarkGreen,
          },
          headerRight: () => (
            Header()
          ),
          title: '강의실별 예약 현황 확인',
          headerBackTitle: backTitle,
          headerTintColor: colors.kuLightGray,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 24,
          },
        }}
      />
    </ReservCheckStack.Navigator>
  )
}