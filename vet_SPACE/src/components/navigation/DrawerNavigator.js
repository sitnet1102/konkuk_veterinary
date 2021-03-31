import 'react-native-gesture-handler';
import * as React from 'react';

import {View, Text, StyleSheet,SafeAreaView, TouchableOpacity, Image} from 'react-native';

import {createDrawerNavigator, DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';

import MainNavigator from './MainNavigator';
import { colors } from '../../utils/Styles';
import {IC_BACK} from '../../utils/icons';
import { RFPercentage } from 'react-native-responsive-fontsize';

const Drawer = createDrawerNavigator();

function MenuDrawer(props, {navigation}) {
  const footerText = {
    address1: "서울특별시 광진구 능동로 120",
    address2: "건국대학교 수의학관 201호 행정실",
    tel1: "Tel : 02-450-3039",
    tel2: "Fax : 02-450-3037",
    version: "Version. 1.0.0",
    copyright1: "COPYRIGHT ALL RIGHT RESERVED.",
    copyright2: "COLLEGE OF VETERINARY, KONKUK UNIVERSITY",
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
            //onPress={() => navigation.toggleDrawer()}
          >
            <Image source={IC_BACK}/>
          </TouchableOpacity>
        </View>
        <View style={menudrawerStyle.idBox}>
        </View>
        <View style={menudrawerStyle.box}>
        </View>
        <DrawerItem
          label="내 정보"
          style={menudrawerStyle.item}
          textStyle={menudrawerStyle.itemText}
          //onPress={() => }
          />
        <DrawerItem
          style={menudrawerStyle.item}
          label="나의 강의실 예약"
          //onPress={() => }
          />
        <DrawerItem
          style={menudrawerStyle.item}
          label="이용 방법"
          //onPress={() => }
        />
      </DrawerContentScrollView>
      <View style={menudrawerStyle.bot}>
        <Text style={menudrawerStyle.text1}>{footerText.address1}</Text>
        <Text style={menudrawerStyle.text1}>{footerText.address2}</Text>
        <Text style={menudrawerStyle.text1}>{footerText.tel1}</Text>
        <Text style={menudrawerStyle.text1}>{footerText.tel2}</Text>
        <Text style={menudrawerStyle.text}>{footerText.version}</Text>
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
  },
  container: {
    //backgroundColor: colors.kuDarkGray,
  },
  top: {
    height: 50,
    backgroundColor: colors.kuDarkGreen,
  },
  idBox: {
    height: 100,
    backgroundColor: colors.kuLightGray,
  },
  bot: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'flex-end',
    //height: RFPercentage(18),
    height: 130,
    backgroundColor: colors.kuOrange,
    //marginBottom: 10,
  },
  box: {
    height: 10,
  },
  item: {
    backgroundColor: colors.kuCoolGray,
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