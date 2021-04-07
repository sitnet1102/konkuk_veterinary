import 'react-native-gesture-handler';
import * as React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import {colors} from '../../utils/Styles';
import RoomInfoScreen from '../screens/Screen06_00RoomInfo';
import RoomInfoDetailScreen from '../screens/Screen06_01RoomInfoDetail';

import Header from '../header/Header';

const RoomInfoStack = createStackNavigator();

export default function RoomInfoNavigator({navigation}) {
  const backTitle = '이전';
  React.useLayoutEffect( ()=> {
    navigation.setOptions({headerShown: false});
  }, [navigation]);

  return(
    <RoomInfoStack.Navigator>
      <RoomInfoStack.Screen
        name="RoomInfo"
        component={RoomInfoScreen}
        options={{
          headerStyle: {
            backgroundColor: colors.kuDarkGreen,
          },
          headerRight: () => (
            Header()
          ),
          title: '강의실 정보',
          headerBackTitle: backTitle,
          headerTintColor: colors.kuLightGray,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 24,
          },
        }}
      />
      <RoomInfoStack.Screen
        name="RoomInfoDetail"
        component={RoomInfoDetailScreen}
        options={{
          headerStyle: {
            backgroundColor: colors.kuDarkGreen,
          },
          headerRight: () => (
            Header()
          ),
          title: '강의실 정보',
          headerBackTitle: backTitle,
          headerTintColor: colors.kuLightGray,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 24,
          },
        }}
      />
    </RoomInfoStack.Navigator>
  )
}