import 'react-native-gesture-handler';
import * as React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import {colors} from '../../utils/Styles';

import StartScreen from '../screens/Screen01_00Start';
import LoginScreen from '../screens/Screen02_00Login';
import SignUpScreen from '../screens/Screen02_01SignUp';

import DrawerNavigator from './DrawerNavigator';

const Stack = createStackNavigator();

export default function StackNavigator(){
  return (
  <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Start"
        component={StartScreen}
        options={{
          headerTitleAlign: 'center',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          title: '로그인',
          headerTitleAlign: 'center',
          headerShown: false,
          headerTintColor: colors.kuWhite,
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{
          headerStyle: {
            backgroundColor: colors.kuDarkGreen,
          },
          title: '회원가입(Sign Up)',
          headerTitleAlign: 'center',
          headerTintColor: colors.kuWhite,
        }}
      />
      <Stack.Screen
        name="Drawer"
        component={DrawerNavigator}
      />
    </Stack.Navigator>
  );
}