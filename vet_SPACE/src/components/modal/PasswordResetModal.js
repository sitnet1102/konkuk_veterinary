import 'react-native-gesture-handler';
import * as React from 'react';

import {Text, View, StyleSheet, TextInput, TouchableOpacity, Alert} from 'react-native';
import { RFPercentage} from 'react-native-responsive-fontsize';

import auth from '@react-native-firebase/auth';

import {colors} from '../../utils/Styles';

export default function PasswordResetModal(props) {
	const [email, setEmail] = React.useState('');
	const reset = () => {
		if(email !== ''){
			auth().sendPasswordResetEmail(email).then(() =>{
				Alert.alert('완료', '이메일로 비밀번호 재설정 메일이 발송되었습니다.');
				props.modalHandler();
			}).catch(e => {
				if(e.code === 'auth/invalid-email'){
					Alert.alert('이메일 오류', '올바르지 않은 이메일 형식입니다.');
				}else if(e.code === 'auth/user-not-found'){
					Alert.alert('계정 오류', '등록되지 않은 계정입니다.');
				}else{
					Alert.alert('error', e.code);
				}
			})
		}else{
			Alert.alert('이메일 오류', '이메일을 입력해주새요');
		}
	};
  
  return(
    <View style={passwordresetmodalStyle.container}>
      <TouchableOpacity 
        style={passwordresetmodalStyle.background}
        activeOpacity={1} // 깜박이는 효과 없애기 
        onPress={props.modalHandler}
      />
      <View style={passwordresetmodalStyle.modal}>
        <Text style={passwordresetmodalStyle.titleText}>비밀번호 재설정</Text>
				<View style={passwordresetmodalStyle.line}/>
        <TextInput
					placeholder="이메일(Email address)"
					autoCapitalize="none"
					keyboardType="email-address"
					value={email}
					onChangeText={setEmail}
        />
				<View style={passwordresetmodalStyle.line}/>
        <TouchableOpacity
					onPress={reset}
        >
          <Text style={passwordresetmodalStyle.buttonText}>재설정</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const passwordresetmodalStyle = StyleSheet.create({
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
});