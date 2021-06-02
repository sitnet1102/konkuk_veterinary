import 'react-native-gesture-handler';
import * as React from 'react';

import {Text, View, StyleSheet, TextInput, TouchableOpacity, Alert} from 'react-native';
import { RFPercentage} from 'react-native-responsive-fontsize';

import auth from '@react-native-firebase/auth';

import {colors} from '../../utils/Styles';

export default function NameChangeModal(props) {
  const [name, setName] = React.useState('');
  const reset = () => {
    Alert.alert('확인','이름을 변경하시겠습니까?',[
      {
        text: "예",
        onPress: () => {
          auth().currentUser.updateProfile({
            displayName: name,
            photoURL: ''
          }).then(() => {
            props.dataHandler(name);
          }).catch(e => {
            Alert.alert('error nameChange',e.code);
          });
        },
      },
      {
        text: "아니오",
        onPress: () => null,
      },
    ]);
	};
  return(
    <View style={namechangemodalStyle.container}>
      <TouchableOpacity 
        style={namechangemodalStyle.background}
        activeOpacity={1} // 깜박이는 효과 없애기 
        onPress={props.modalHandler}
      />
      <View style={namechangemodalStyle.modal}>
        <Text style={namechangemodalStyle.titleText}>이름 재설정</Text>
				<View style={namechangemodalStyle.line}/>
          <TextInput
            placeholder="이름"
            autoCapitalize="none"
            keyboardType="default"
            value={name}
            onChangeText={setName}
            style={namechangemodalStyle.text}
          />
				<View style={namechangemodalStyle.line}/>
        <TouchableOpacity
					onPress={reset}
        >
          <Text style={namechangemodalStyle.buttonText}>재설정</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const namechangemodalStyle = StyleSheet.create({
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
    marginHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: colors.kuWhite,
  },
  titleText: {
    color: colors.kuDarkGreen,
    fontSize: RFPercentage(3),
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  line: {
    height: 1,
    width: '80%',
    backgroundColor: colors.kuDarkGray,
  },
  buttonText: {
    color: colors.kuDarkGreen,
    fontSize: RFPercentage(3),
    fontWeight: 'bold',
    margin: 20,
  },
  text: {
    fontSize: RFPercentage(3),
    marginVertical: RFPercentage(2),
  }, 
});