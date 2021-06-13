import 'react-native-gesture-handler';
import * as React from 'react';

import {Text, View, StyleSheet, TextInput, TouchableOpacity, Alert} from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import {colors} from '../../utils/Styles';
import {FIRESTORE_DATA2} from '../../utils/firebaseData';
import {horizontalScale, verticalScale, moderateScale} from '../../utils/scailing';

export default function PhoneChangeModal(props) {
  const [phone, setPhone] = React.useState('');
  const reset = () => {
    Alert.alert('확인','전화번호를 변경하시겠습니까?',[
      {
        text: '예',
        onPress: () => {
          firestore().collection(FIRESTORE_DATA2).doc(auth().currentUser.uid).update({
            'phone_number': phone,
          }).then(() => {
            props.dataHandler(phone);
          }).catch(e => {
            Alert.alert('error Phone number Change',e.code);
          });
        },
      },
      {
        text: '아니오',
        onPress: () => null,
      },
    ]);
	};
  return(
    <View style={phonechangemodalStyle.container}>
      <TouchableOpacity 
        style={phonechangemodalStyle.background}
        activeOpacity={1} // 깜박이는 효과 없애기 
        onPress={props.modalHandler}
      />
      <View style={phonechangemodalStyle.modal}>
        <Text style={phonechangemodalStyle.titleText}>전화번호 재설정</Text>
				<View style={phonechangemodalStyle.line}/>
          <TextInput
            placeholder="전화번호"
            autoCapitalize="none"
            keyboardType='number-pad'
            value={phone}
            onChangeText={setPhone}
            style={phonechangemodalStyle.text}
          />
				<View style={phonechangemodalStyle.line}/>
        <TouchableOpacity
					onPress={reset}
        >
          <Text style={phonechangemodalStyle.buttonText}>재설정</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const phonechangemodalStyle = StyleSheet.create({
  container: { 
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  background: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modal: {
    marginHorizontal: horizontalScale(20),
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: colors.kuWhite,
  },
  titleText: {
    color: colors.kuDarkGreen,
    fontSize: moderateScale(28),
    fontWeight: 'bold',
    marginTop: verticalScale(20),
    marginBottom: verticalScale(10),
  },
  line: {
    height: 1,
    width: '80%',
    backgroundColor: colors.kuDarkGray,
  },
  buttonText: {
    color: colors.kuDarkGreen,
    fontSize: moderateScale(28),
    fontWeight: 'bold',
    margin: moderateScale(20),
  },
  text: {
    fontSize: moderateScale(28),
    marginVertical: verticalScale(16),
  }, 
});