import 'react-native-gesture-handler';
import * as React from 'react';

import {View, Text, StyleSheet, BackHandler, Alert} from 'react-native';
import { TouchableOpacity} from 'react-native-gesture-handler';

import { colors } from '../../utils/Styles';
import {horizontalScale, verticalScale, moderateScale} from '../../utils/scailing';

export default function MainScreen({navigation}){
  React.useEffect(() => {
    const backAction = () => {
      Alert.alert("종료", "앱을 종료하시겠습니까?", [
        {
          text: "취소",
          onPress: () => null,
        },
        { text: "확인", onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View style={mainStyle.container}>
      <View style={mainStyle.Top}>
        <Text style={mainStyle.TitleText}>수의과대학</Text>
        <Text style={mainStyle.TitleText}>강의실대여</Text>
      </View>
      <View style={mainStyle.Mid}>
        <TouchableOpacity 
          style={mainStyle.TouchBox}
          onPress={() => navigation.navigate('RoomReservNavigator', {
              screen: 'DateLoca',
            }
          )}
          >
          <Text style={mainStyle.SelectTitleText}>강의실예약</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={mainStyle.TouchBox}
          onPress={() => navigation.navigate('ReservCheckNavigator', {
              screen: 'ReservCheck',
            }
          )}
          >
          <Text style={mainStyle.SelectTitleText}>예약확인</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={mainStyle.TouchBox}
          onPress={() => navigation.navigate('RoomInfoNavigator', {
              screen: 'RoomInfo', 
            }
          )}
        >
          <Text style={mainStyle.SelectTitleText}>강의실정보</Text>
        </TouchableOpacity>
      </View>
      <View style={mainStyle.Bot}>
      </View>
    </View>
  );
}

const mainStyle = StyleSheet.create({
  container: {
    flex: 1,
  }, 
  Top: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  TitleText: {
    fontWeight: 'bold',
    fontSize: moderateScale(48),
    lineHeight: verticalScale(70),
  },
  Mid: {
    flex: 4,
    justifyContent: 'center',
  },
  TouchBox: {
    alignSelf: 'center',
    fontWeight: 'bold',
    backgroundColor: colors.kuLightGray,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    opacity: 0.8,
    margin: '2%',
    width: horizontalScale(300),
    height: verticalScale(100),
    padding: '4%',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.kuDarkGreen,
  },
  SelectTitleText: {
    fontSize: moderateScale(42),
  },
  Bot: {
    flex: 2,
  },
});