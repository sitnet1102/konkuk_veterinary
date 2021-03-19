import 'react-native-gesture-handler';
import * as React from 'react';

import {Text, View, StyleSheet, Image, ScrollView} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
//import {createDrawerNavigator} from '@react-navigation/drawer';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Table, Row, Rows } from 'react-native-table-component';
import {SliderBox} from 'react-native-image-slider-box';

import {colors} from './utils/Styles';
import {IC_MENU, IC_HOME} from './utils/icons';

import StartScreen from './components/screens/Screen01_00Start';
import LoginScreen from './components/screens/Screen02_00Login';
import SignUpScreen from './components/screens/Screen02_01SignUp';
import MainScreen from './components/screens/Screen03_00Main';
import DateLocaScreen from './components/screens/Screen04_01DateLoca';
import TimeSelectScreen from './components/screens/Screen04_02TimeSelect';
import RoomReservDetailScreen from './components/screens/Screen04_03RoomReservDetail';
import CompleteScreen from './components/screens/Screen04_04Complete';
import ReservCheckScreen from './components/screens/Screen05_00ReservCheck';
import ListScreen from './components/screens/Screen05_01List';
import ReservDetailScreen from './components/screens/Screen05_01ReservDetail';
import StatusScreen from './components/screens/Screen05_02Status';
import RoomInfoScreen from './components/screens/Screen06_00RoomInfo';
import RoomInfoDetailScreen from './components/screens/Screen06_01RoomInfoDetail';


const Stack = createStackNavigator();
//const Drawer = createDrawerNavigator();

function MainHeader() {
  const navigation = useNavigation();
  return(
      <TouchableOpacity 
        style={headerStyle.headerMenuTouchBox}
        //onPress={() => navigation.navigate('menu')}
      >
        <Image source={IC_MENU}/>
      </TouchableOpacity>
  );
}

function Header() {
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
        //onPress={() => navigation.navigate('Menu')}
        >
        <Image source={IC_MENU}/>
      </TouchableOpacity>
    </View>
  );
}
//headerRight: () => (
//)
/*
function Menu() {
  return(
    <Drawer.Navigator>
    <Drawer.Screen/>
    </Drawer.Navigator>
    );
  }
  */

function App() {
  const backTitle = '이전';
  return (
    <NavigationContainer>
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
          name="Main"
          component={MainScreen}
          options={{
            headerStyle: {
              backgroundColor: colors.kuDarkGreen,
            },
            headerRight: () => (
              MainHeader()
            ),
            title: '',
            headerTitleAlign: 'center',
            headerBackTitle: 'hi',
            headerBackTitleVisible: false,
          }}
          />
        <Stack.Screen
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
        <Stack.Screen
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
        <Stack.Screen
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
        <Stack.Screen
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
        <Stack.Screen
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
        <Stack.Screen
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
        <Stack.Screen
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
        <Stack.Screen
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
        <Stack.Screen
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
        <Stack.Screen
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
      </Stack.Navigator>
    </NavigationContainer>
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

export default App;