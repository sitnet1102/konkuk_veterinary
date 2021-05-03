import 'react-native-gesture-handler';
import * as React from 'react';

import {View, Text, TextInput, ImageBackground, Platform, StyleSheet, Alert} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { RFPercentage } from 'react-native-responsive-fontsize';

import { colors } from '../../utils/Styles';
import {IMG_BACKGROUND} from '../../utils/icons';
//import userData from '../../data/userData';

export default function LoginScreen({navigation}) {
  /**
   추가 수정해야할 사항
   /// 아이디, 비밀번호 입력 시에 화면이 잘 안보이는 현상이 있음 -> 수정이 필요
    //1. 아이디 비밀번호 입력 시에 위로 눌러지면서 화면이 잘 보이지 않는 현상 
    2. 자동 로그인 옵션 확인
    //3. 회원가입 연결 
    //4. 네비게이션 옵션 연결 
    //5. 체크 박스랑 자동 로그인 텍스트 클릭이랑 연결해주기   -> 20210311
   */
  const [isSelected, setSelection] = React.useState(false);
  const onPress = () => setSelection(()=>!isSelected);
  const [__userID, setUserID] = React.useState("");
  const [__userPassword, setUserPassword] = React.useState("");

  const loginOnPress = () => {
    if(__userID == "User1234" && __userPassword == "1234"){
      navigation.navigate('Drawer',{
        screen: 'MainNavigator', 
        params: {
          screen: "Main",
          params: {
            data: {
              userID : {__userID},
              password : {__userPassword}
            }
          }
        }
      })
    }else if(__userID.trim() == ""){
      Alert.alert("로그인 오류","아이디를 입력해주세요");
    }else if(__userPassword.trim() == ""){
      Alert.alert("로그인 오류","패스워드를 입력해주세요");
    }else{
      Alert.alert("로그인 오류","아이디와 패스워드가 다릅니다");
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
              placeholder="아이디(ID)"
              value={__userID}
              onChangeText={setUserID}
            >
            </TextInput>
          </View>
          <View style={loginStyle.InputTextBox}>
            <TextInput 
              secureTextEntry={true}
              style={loginStyle.InputText}
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
            <CheckBox
              disabled={false}
              value={isSelected}
              onValueChange={setSelection}
              boxType='square'
              style={loginStyle.CheckBox}
              onCheckColor={colors.kuDarkGreen}
              onTintColor={colors.kuDarkGreen}
              />
            <TouchableOpacity onPress={onPress}>
              <Text style={loginStyle.AutoLoginText}>자동 로그인(Auto Login)</Text>
            </TouchableOpacity>
            <Text> / </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('SignUp')}
            >
              <Text style={loginStyle.NewAccButton}>회원가입(Sign Up)</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={loginStyle.Bot}>
        </View>
      </ImageBackground>
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
  }
});

