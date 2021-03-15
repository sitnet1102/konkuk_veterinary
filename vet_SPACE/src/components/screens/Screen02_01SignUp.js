import 'react-native-gesture-handler';
import * as React from 'react';

import {View, Text, TextInput,StyleSheet} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors } from '../../utils/Styles';

export default function SignUpScreen({navigation}){
  /**
      1. 회원 가입 버튼 눌렀을 때 처리해야 하는 내요 
        1.1. 중복 확인이 된 아이디 인지 확인
        1.2. 비밀번호, 비밀번호 확인 이 서로 같은지 확인
        1.3. 비밀번호가 올바른 형식인지 확인
        1.4. 모든 정보가 다 들어가 있는지 확인 
      
   */
  return(
    <View style={signupStyle.container}>
      <View style={signupStyle.signupTop}>

      </View>
      <View style={signupStyle.signupMid}>
        <View style={signupStyle.signupIDContainer}>
          <View style={signupStyle.signupInputBoxContainer2}>
            <TextInput style={signupStyle.signupInputTextBox}>
              <Text >아이디</Text>
            </TextInput>
          </View>
          <TouchableOpacity style={signupStyle.signupIDCheckContainer}>
            <Text style={signupStyle.signupIDCheckText}>중복확인</Text>
          </TouchableOpacity>
        </View>
        <View style={signupStyle.signupInputBoxContainer}>
          <TextInput style={signupStyle.signupInputTextBox}>
            <Text>비밀번호</Text>
          </TextInput>
        </View>
        <View style={signupStyle.signupInputBoxContainer}>
          <TextInput style={signupStyle.signupInputTextBox}>
            <Text>비밀번호 확인</Text>
          </TextInput>
        </View>
        <View style={signupStyle.signupInputBoxContainer}>
          <TextInput style={signupStyle.signupInputTextBox}>
            <Text>이름 (실명 입력)</Text>
          </TextInput>
        </View>
        <View style={signupStyle.signupInputBoxContainer}>
          <TextInput style={signupStyle.signupInputTextBox}>
            <Text>휴대전화번호 ('-'제외)</Text>
          </TextInput>
        </View>
        <View style={signupStyle.signupInputBoxContainer}>
          <TextInput style={signupStyle.signupInputTextBox}>
            <Text>학번, 연구원번호, 사번, 등</Text>
          </TextInput>
        </View>
        <View style={signupStyle.signupInputBoxContainer}>
          <TouchableOpacity>
            <Text style={signupStyle.signupInputTextBox}>분류 - 선택 상자</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={signupStyle.signupBot}>
        <TouchableOpacity 
          style={signupStyle.signupButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={signupStyle.signupText}>회원가입</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


const signupStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  signupTop: {
    flex : 1,
  },
  signupMid: {
    flex : 20,
  },
 signupBot: {
   flex : 4,
   justifyContent: 'center',
  },
  signupIDContainer: {
    flex: 1,
    flexDirection: 'row',
    margin: '3%',
    marginLeft: '8%',
    marginRight: '8%',
  },
  signupInputBoxContainer2: {
    flex: 1,
    justifyContent: 'center',
    borderBottomColor: colors.kuDarkGreen,
    borderBottomWidth: 1,
  },
  signupIDCheckContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.kuDarkGreen,
    borderRadius: 5,
    width: 100,
    height: '100%',
  },
  signupIDCheckText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.kuWhite,
  },
  signupInputBoxContainer: {
    flex: 1,
    margin: '3%',
    marginLeft: '8%',
    marginRight: '8%',
    borderBottomColor: colors.kuDarkGreen,
    borderBottomWidth: 1,
    justifyContent: 'center',
  },
  signupInputTextBox: {
    justifyContent: 'center',
    fontSize: 20,
    color: colors.kuCoolGray,
    //marginLeft: '5%',
    //marginRight: '5%',
  },
  signupButton: {
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: colors.kuDarkGreen,
    width: '70%',
    height: '60%',
    borderWidth: 1,
    borderRadius: 5,
  }, 
  signupText: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.kuWhite,
  },
});