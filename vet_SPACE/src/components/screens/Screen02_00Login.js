import 'react-native-gesture-handler';
import * as React from 'react';

import {View, Text, TextInput, ImageBackground, Platform, StyleSheet} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { colors } from '../../utils/Styles';

import {IMG_BACKGROUND} from '../../utils/icons';

export default function LoginScreen({navigation}) {
  /**
   추가 수정해야할 사항
   /// 아이디, 비밀번호 입력 시에 화면이 잘 안보이는 현상이 있음 -> 수정이 필요
    1. 아이디 비밀번호 입력 시에 위로 눌러지면서 화면이 잘 보이지 않는 현상 
    2. 자동 로그인 옵션 확인
    3. 회원가입 연결 
    4. 네비게이션 옵션 연결 
    5. 체크 박스랑 자동 로그인 텍스트 클릭이랑 연결해주기   -> 20210311
   */
  const [isSelected, setSelection] = React.useState(false);
  const onPress = () => setSelection(()=>!isSelected);

  if (Platform.OS === 'web') {
    return (
      <View></View>
    );
  }
  else{
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
            <TextInput style={loginStyle.InputTextBox}>
              <Text style={loginStyle.InputText}>     아이디(ID)</Text>
            </TextInput>
            <TextInput style={loginStyle.InputTextBox}>
              <Text style={loginStyle.InputText}>     비밀번호(Password)</Text>
            </TextInput>
            <TouchableOpacity 
              style={loginStyle.Button}
              onPress={() => navigation.navigate('Main')}
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
                />
              <TouchableOpacity onPress={onPress}>
                <Text style={loginStyle.AutoLoginText}>자동 로그인(Auto Login) / </Text>
              </TouchableOpacity>
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
}

const loginStyle = StyleSheet.create({
  // 폰트 사이즈 정리해야함
  container: {
    flex: 1,
  },
  Top: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  Mid: {
    //alignItems: 'center',
    justifyContent: 'center',
    flex: 5,
  },
  Bot: {
    flex: 1.5,
  },
  TitleText: {
    fontWeight: 'bold',
    fontSize: 40,
  },
  InputTextBox: {
    alignSelf: 'center',
    backgroundColor: colors.kuLightGray,
    width: '70%',
    height: '15%',
    opacity: 0.8,
    margin: '2%',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.kuDarkGray,
  },
  InputText: {
    fontWeight: 'bold',
    fontSize: 16
  },
  Button: {
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: colors.kuGreen,
    opacity: 0.8,
    width: '70%',
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

