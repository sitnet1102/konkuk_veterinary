import 'react-native-gesture-handler';
import * as React from 'react';

import {View, Text, TextInput, ImageBackground, StyleSheet, Alert, TouchableOpacity, BackHandler} from 'react-native';
//import CheckBox from '@react-native-community/checkbox';
import { RFPercentage } from 'react-native-responsive-fontsize';

import auth from '@react-native-firebase/auth';

import { colors } from '../../utils/Styles';
import {IMG_BACKGROUND} from '../../utils/icons';

import PasswordResetModal from '../modal/PasswordResetModal';

export default function LoginScreen({navigation}) {
  /**
   추가 수정해야할 사항
   /// 아이디, 비밀번호 입력 시에 화면이 잘 안보이는 현상이 있음 -> 수정이 필요
    //1. 아이디 비밀번호 입력 시에 위로 눌러지면서 화면이 잘 보이지 않는 현상 
    //2. 자동 로그인 옵션 확인
    //3. 회원가입 연결 
    //4. 네비게이션 옵션 연결 
    //5. 체크 박스랑 자동 로그인 텍스트 클릭이랑 연결해주기   -> 20210311
    //6. 비밀번호 잊었을 때, 비밀번호 찾기 링크 보내주기 화면 만들기 
  */
  const [isSelected, setSelection] = React.useState(true);
  const onPressAutoLogin = () => setSelection(()=>!isSelected);
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
            {/**
            <CheckBox
              disabled={false}
              value={isSelected}
              onValueChange={setSelection}
              boxType='square'
              style={loginStyle.CheckBox}
              onCheckColor={colors.kuDarkGreen}
              onTintColor={colors.kuDarkGreen}
              />
            <TouchableOpacity onPress={onPressAutoLogin}>
              <Text style={loginStyle.AutoLoginText}>자동 로그인(Auto Login)</Text>
            </TouchableOpacity>
             */}
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
          <TouchableOpacity 
            style={loginStyle.PasswordReset}
            onPress={togglePasswordReset}
          >
            <Text style={loginStyle.PasswordResetText}>비밀번호 재설정</Text>
          
        </View>
        <View style={loginStyle.Bot}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Test')}
          >
        </View>
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
  // 폰트 사이즈 정리해야함
  container: {
    flex: 1,
  },
  Top: {
    //flex: 3,
    height: RFPercentage(20),
    alignItems: 'center',
    marginTop: RFPercentage(10),
    //justifyContent: 'flex-end',
  },
  Mid: {
    //alignItems: 'center',
    justifyContent: 'center',
    //marginTop: RFPercentage(8),
    flex: 6,
  },
  Bot: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  TitleText: {
    fontWeight: 'bold',
    fontSize: RFPercentage(5.5),
    lineHeight: RFPercentage(6.5),
    //fontFamily: 'Binggrae-Bold',
  },
  InputTextBox: {
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: colors.kuLightGray,
    width: 300,
    height: 65,
    opacity: 0.8,
    margin: '2%',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.kuDarkGray,
  },
  InputText: {
    fontWeight: 'bold',
    fontSize: RFPercentage(2),
    marginLeft: 20,
    marginRight: 20,
  },
  Button: {
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: colors.kuGreen,
    opacity: 0.8,
    width: 300,
    padding: '3%',
    margin: '2%',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.kuGreen,
  },
  ButtonText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  AutoLogin: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  CheckBox: {
    transform: [{scaleX: 0.8}, {scaleY: 0.8}]
  },
  AutoLoginText: {
    fontWeight: 'bold',
    flexDirection: 'row',
  },
  NewAccButton: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    fontSize: RFPercentage(2.5),
  },
  PasswordReset: {
    //marginTop: 10,
    //alignContent: 'center',
    //justifyContent: 'center',
    alignItems: 'center',
  },
  PasswordResetText: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    fontSize: RFPercentage(2.5),
  },
});

