import 'react-native-gesture-handler';
import * as React from 'react';

import {View, Text, TextInput, ImageBackground, StyleSheet, Alert, TouchableOpacity, BackHandler, SafeAreaView} from 'react-native';

import auth from '@react-native-firebase/auth';

import { colors } from '../../utils/Styles';
import {IMG_BACKGROUND} from '../../utils/icons';
import {horizontalScale, verticalScale, moderateScale} from '../../utils/scailing';

import PasswordResetModal from '../modal/PasswordResetModal';

export default function LoginScreen({navigation}) {
  const [isSelected, setSelection] = React.useState(true);
  const [__userID, setUserID] = React.useState("");
  const [__userPassword, setUserPassword] = React.useState("");
  const [passwordResetModal, setPasswordResetModal] = React.useState(false);
  const togglePasswordReset = () => {
    setPasswordResetModal(prev => (!prev));
  };

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
    if(auth().currentUser && isSelected){
      navigation.navigate('Drawer',{
        screen: 'MainNavigator', 
        params: {
          screen: "Main",
        }
      });
    }
    return () => backHandler.remove();
  }, []);

  const loginOnPress = () => {
    if(__userID.trim() == ""){
      Alert.alert("로그인 오류","아이디를 입력해주세요");
    }else if(__userPassword.trim() == ""){
      Alert.alert("로그인 오류","패스워드를 입력해주세요");
    }else{
      auth().signInWithEmailAndPassword(__userID, __userPassword).then(() =>{
        if(auth().currentUser.emailVerified){
          navigation.navigate('Drawer',{
            screen: 'MainNavigator', 
            params: {
              screen: "Main",
            }
          });
        }else{
          // => 이메일 인증 화면으로 넘어감 => 다시 로그인 화면
          auth().currentUser.sendEmailVerification().then(() => {
            Alert.alert('이메일 인증', '이메일로 인증링크가 전송되었습니다.\n인증 후 다시 로그인 해주세요');
          }).catch(e => {
            if(e.code === 'auth/too-many-requests'){
              Alert.alert('인증 오류', '인증 이메일을 확인해주세요.');
            }else{
              Alert.alert('error', e.code + '\n안증 이메일이 전송되지 않았습니다.');
            }
          });
        }
      }).catch(e => {
        if(e.code === 'auth/invalid-email' || e.code === 'auth/wrong-password'){
          Alert.alert("로그인 오류","아이디와 패스워드가 다릅니다");
        }else if(e.code === 'auth/user-not-found'){
          Alert.alert("로그인 오류","아이디와 비밀번호를 확인해주세요");
        }else if(e.code === 'auth/user-disabled'){
          Alert.alert("로그인 오류","사용할 수 없는 계정입니다.");
        }else{
          Alert.alert("error201",e.code);
        }
      });
    }
  };
  
  return (
    <View style={loginStyle.container}>
      <ImageBackground
        source={IMG_BACKGROUND}
        style={{width: '100%', height: '100%'}}>
        <SafeAreaView style={loginStyle.safe}>
          <View style={loginStyle.Top}>
            <Text style={loginStyle.TitleText} >건국대학교</Text>
            <Text style={loginStyle.TitleText} >수의과대학</Text>
            <Text style={loginStyle.TitleText} >강의실대여</Text>
          </View>
          <View style={loginStyle.Mid}>
            <View style={loginStyle.InputTextBox}>
              <TextInput
                style={loginStyle.InputText}
                autoCapitalize="none"
                placeholder="이메일(Email address)"
                keyboardType="email-address"
                accessibilityLabel="email_input"
                value={__userID}
                onChangeText={setUserID}
              >
              </TextInput>
            </View>
            <View style={loginStyle.InputTextBox}>
              <TextInput 
                secureTextEntry={true}
                style={loginStyle.InputText}
                autoCapitalize="none"
                placeholder="비밀번호(Password)"
                accessibilityLabel="password_input"
                value={__userPassword}
                onChangeText={setUserPassword}
              >
              </TextInput>
            </View>
            <TouchableOpacity 
              style={loginStyle.Button}
              onPress={() => loginOnPress()}
            >
              <Text style={loginStyle.ButtonText}>로그인(Login)</Text>
            </TouchableOpacity>
            
            <View style={loginStyle.AutoLogin}>
              <TouchableOpacity 
                style={loginStyle.PasswordReset}
                onPress={togglePasswordReset}
              >
                <Text style={loginStyle.PasswordResetText}>비밀번호 재설정</Text>
              </TouchableOpacity>
              <Text>  /  </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('SignUp')}
              >
                <Text style={loginStyle.NewAccButton}>회원가입(Sign Up)</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={loginStyle.Bot}>
          </View>
        </SafeAreaView>
      </ImageBackground>
      {passwordResetModal ?
        <PasswordResetModal
          modalHandler={()=>togglePasswordReset()}
        />
        : <></>
      }
    </View>
  );
}

const loginStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  safe:{
    flex: 1,
  },
  Top: {
    height: verticalScale(160),
    marginTop: verticalScale(50),
    alignItems: 'center',
  },
  TitleText: {
    fontWeight: 'bold',
    fontSize: moderateScale(45),
    lineHeight: moderateScale(50),
  },
  Mid: {
    justifyContent: 'center',
    flex: 6,
  },
  InputTextBox: {
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: colors.kuLightGray,
    width: horizontalScale(300),
    height: verticalScale(70),
    opacity: 0.8,
    margin: '2%',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.kuDarkGray,
  },
  InputText: {
    fontWeight: 'bold',
    fontSize: moderateScale(20),
    marginLeft: horizontalScale(20),
    marginRight: horizontalScale(20),
  },
  Button: {
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: colors.kuGreen,
    opacity: 0.8,
    width: horizontalScale(300),
    padding: '3%',
    margin: '2%',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.kuGreen,
  },
  ButtonText: {
    fontWeight: 'bold',
    fontSize: moderateScale(20),
  },
  AutoLogin: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(10),
  },
  PasswordReset: {
    alignItems: 'center',
  },
  PasswordResetText: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    fontSize: moderateScale(20),
  },
  NewAccButton: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    fontSize: moderateScale(20),
  },
  Bot: {
    flex: 3,
  },
});

