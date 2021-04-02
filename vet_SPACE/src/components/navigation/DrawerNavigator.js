import 'react-native-gesture-handler';
import * as React from 'react';

import {View, Text, StyleSheet,SafeAreaView, TouchableOpacity, Image} from 'react-native';

import {createDrawerNavigator, DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';

import MainNavigator from './MainNavigator';
import { colors } from '../../utils/Styles';
import {IC_BACK, IC_FAQ, IC_HELP, IC_LOUDSPEAKER, IC_NOTEBOOK, IC_PROFILE} from '../../utils/icons';
import { RFPercentage } from 'react-native-responsive-fontsize';
import packageJson from '../../../package.json';

const Drawer = createDrawerNavigator();

function MenuDrawer(props) {
  const footerText = {
    address1: "서울특별시 광진구 능동로 120",
    address2: "건국대학교 수의학관 201호 행정실",
    tel1: "Tel : 02-450-3039",
    tel2: "Fax : 02-450-3037",
    version: "Version. ",
    copyright1: "COPYRIGHT ⓒALL RIGHT RESERVED.",
    copyright2: "COLLEGE OF VETERINARY, KONKUK UNIVERSITY",
  };
  const data = {
    id: "User1234",
    name: "홍길동",
    password: "1234",

  };

  return (
    <SafeAreaView style={menudrawerStyle.safearea}>
      <DrawerContentScrollView {...props}
        style={menudrawerStyle.container}
        scrollEnabled={false}
      >
        <View style={menudrawerStyle.top}>
          <TouchableOpacity 
            style={menudrawerStyle.touchBox}
            onPress={() => props.navigation.toggleDrawer()}
          >
            <Image source={IC_BACK}/>
          </TouchableOpacity>
        </View>
        <View style={menudrawerStyle.mid}>
          <View style={menudrawerStyle.idBox}>
            <Text style={menudrawerStyle.idText}>{data.name} 님</Text>
            <View style={menudrawerStyle.box2}></View>
            <TouchableOpacity 
              style={menudrawerStyle.logOut}
              onPress={() => props.navigation.navigate('Login')}
            >
              <Text style={menudrawerStyle.logOutText}>로그아웃</Text>
            </TouchableOpacity>
          </View>
          <View style={menudrawerStyle.line}></View>
        </View>
        <View style={menudrawerStyle.box}>
        </View>
        <DrawerItem
          style={menudrawerStyle.item}
          label="내 정보"
          labelStyle={menudrawerStyle.label}
          icon={({ focused, color, size }) => (
            <Image
              source={IC_PROFILE}
              style={{height: size, width: size}}
              resizeMode="contain"
            />
          )}
          onPress={() => props.navigation.navigate('MainNavigator', {
            screen: "MyInfo",
          })}
        />
        <DrawerItem
          style={menudrawerStyle.item}
          label="나의 강의실 예약"
          labelStyle={menudrawerStyle.label}
          icon={({ focused, color, size }) => (
            <Image
              source={IC_NOTEBOOK}
              style={{height: size, width: size}}
              resizeMode="contain"
            />
          )}
          onPress={() => props.navigation.navigate("MainNavigator", {
            screen: "ReservCheckNavigator",
            params: {
              screen: "List",
            }
          })}
        />
        <DrawerItem
          style={menudrawerStyle.item}
          label="공지사항"
          labelStyle={menudrawerStyle.label}
          icon={({ focused, color, size }) => (
            <Image
              source={IC_LOUDSPEAKER}
              style={{height: size, width: size}}
              resizeMode="contain"
            />
          )}
          //onPress={() => }
        />
        <DrawerItem
          style={menudrawerStyle.item}
          label="자주 묻는 질문"
          labelStyle={menudrawerStyle.label}
          icon={({ focused, color, size }) => (
            <Image
              source={IC_FAQ}
              style={{height: size, width: size}}
              resizeMode="contain"
            />
          )}
          //onPress={() => }
        />
        <DrawerItem
          style={menudrawerStyle.item}
          label="도움말"
          labelStyle={menudrawerStyle.label}
          icon={({ focused, color, size }) => (
            <Image
              source={IC_HELP}
              style={{height: size, width: size}}
              resizeMode="contain"
            />
          )}
          //onPress={() => }
        />
      </DrawerContentScrollView>
      <View style={menudrawerStyle.bot}>
        <Text style={menudrawerStyle.text1}>{footerText.address1}</Text>
        <Text style={menudrawerStyle.text1}>{footerText.address2}</Text>
        <Text style={menudrawerStyle.text1}>{footerText.tel1}</Text>
        <Text style={menudrawerStyle.text1}>{footerText.tel2}</Text>
        <Text style={menudrawerStyle.text}>{footerText.version+packageJson.version}</Text>
        <Text style={menudrawerStyle.text}>{footerText.copyright1}</Text>
        <Text style={menudrawerStyle.text}>{footerText.copyright2}</Text>
        <Text></Text>
      </View>
    </SafeAreaView>
  );
}

const menudrawerStyle = StyleSheet.create({
  safearea: {
    flex: 1,
    backgroundColor: colors.gray,
  },
  container: {
  },
  top: {
    height: 50,
    backgroundColor: colors.kuDarkGreen,
  },
  mid: {
    height: 100,
    backgroundColor: colors.lightGray,
  },
  idBox: {
    marginTop: 30,
    alignItems: 'center',
    flexDirection: 'row',
  },
  line: {
    height: 2,
    backgroundColor: colors.kuBlack,
    marginHorizontal: 12,
    marginTop: 10,
  },
  idText:{
    fontSize: RFPercentage(3),
    fontWeight: 'bold',
    marginLeft: 20,
  },
  box2: {
    flex: 1,
  },
  logOut: {
    marginRight: 15,
  },
  logOutText: {
    color: colors.kuDarkGreen,
    fontSize: RFPercentage(2),
    fontWeight: '400',
  },
  bot: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 130,
    backgroundColor: colors.kuCoolGray,
  },
  box: {
    height: 10,
  },
  item: {
    backgroundColor: colors.lightGray,
  },
  label: {
    color: colors.kuBlack,
    fontSize: RFPercentage(2.9),
    fontWeight: '500',
  },
  text: {
    fontSize: RFPercentage(1.3),
  },
  text1: {
    fontSize: RFPercentage(1.7),
  },
  touchBox: {
    padding: 5,
    marginRight: '10%',
  },
});


export default function DrawerNavigator({navigation}) {
  React.useLayoutEffect( ()=> {
    navigation.setOptions({headerShown: false});
  }, [navigation]);
  return (
    <Drawer.Navigator
      drawerPosition="right"
      drawerType="front"
      drawerContent={(props) => <MenuDrawer {...props}/>}
    >
      <Drawer.Screen
        name="MainNavigator"
        component={MainNavigator}
      />
    </Drawer.Navigator>
  );
}