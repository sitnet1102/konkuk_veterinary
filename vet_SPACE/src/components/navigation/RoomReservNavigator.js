import 'react-native-gesture-handler';
import * as React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import {colors} from '../../utils/Styles';

import DateLocaScreen from '../screens/Screen04_01DateLoca';
import TimeSelectScreen from '../screens/Screen04_02TimeSelect';
import RoomReservDetailScreen from '../screens/Screen04_03RoomReservDetail';
import CompleteScreen from '../screens/Screen04_04Complete';

import Header from '../header/Header';

const RoomReservStack = createStackNavigator();

export default function RoomReservNavigator({navigation}) {
  const backTitle = '이전';
  React.useLayoutEffect( ()=> {
    navigation.setOptions({headerShown: false});
  }, [navigation]);

  return (
    <RoomReservStack.Navigator>
      <RoomReservStack.Screen
        name="DateLoca"
        component={DateLocaScreen}
        options={{
          headerStyle: {
            backgroundColor: colors.kuDarkGreen,
          },
          headerRight: () => (
            Header()
            ),
            title: '강의실 예약',
            headerBackTitle: backTitle,
            headerTintColor: colors.kuLightGray,
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 24,
            },
          }}
      />
      <RoomReservStack.Screen
        name="TimeSelect"
        component={TimeSelectScreen}
        options={{
          headerStyle: {
            backgroundColor: colors.kuDarkGreen,
          },
          headerRight: () => (
            Header()
            ),
            title: '강의실 예약',
            headerBackTitle: backTitle,
            headerTintColor: colors.kuLightGray,
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 24,
            },
          }}
      />
      <RoomReservStack.Screen
        name="RoomReservDetail"
        component={RoomReservDetailScreen}
        options={{
          headerStyle: {
            backgroundColor: colors.kuDarkGreen,
          },
          headerRight: () => (
            Header()
          ),
          title: '강의실 예약',
          headerBackTitle: backTitle,
          headerTintColor: colors.kuLightGray,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 24,
          },
        }}
      />
      <RoomReservStack.Screen
        name="Complete"
        component={CompleteScreen}
        options={{
          headerStyle: {
            backgroundColor: colors.kuDarkGreen,
          },
          headerRight: () => (
            Header()
          ),
          title: '강의실 예약',
          headerBackTitle: backTitle,
          headerTintColor: colors.kuLightGray,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 24,
          },
        }}
      />
    </RoomReservStack.Navigator>
  )
}