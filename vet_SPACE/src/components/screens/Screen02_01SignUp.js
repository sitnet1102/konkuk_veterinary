import 'react-native-gesture-handler';
import * as React from 'react';

import {View, Text, TextInput,StyleSheet, Alert} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors } from '../../utils/Styles';

import SortingSelectModal from '../modal/SortingSelectModal';
import { RFPercentage } from 'react-native-responsive-fontsize';

export default function SignUpScreen({navigation}){
  /**
      1. 회원 가입 버튼 눌렀을 때 처리해야 하는 내요 
        1.1. 중복 확인이 된 아이디 인지 확인
        1.2. 비밀번호, 비밀번호 확인 이 서로 같은지 확인
        1.3. 비밀번호가 올바른 형식인지 확인
        1.4. 모든 정보가 다 들어가 있는지 확인 
      2. 텍스트 입력 박스 선택시 화면 찌그러지는 현상 수정 필요 
   */
  const [sortingSelectModal, setSortingSelectModal] = React.useState(false);
  const [sortingData, setSortingData] = React.useState('분 류');
  const [sortingStyle, setSortingStyle] = React.useState(false);

  const toggleSortingSelectModal =  () => {
    setSortingSelectModal(prev => (!prev));
  };
  const sortingHandler = (data) => {
    setSortingData(data);
    toggleSortingSelectModal();
    sortingStyleChange();
  };
  const sortingStyleChange = () => {
    setSortingStyle(true);
  };

  return(
    <View style={signupStyle.container}>
      <View style={signupStyle.Top}>
      </View>
      <View style={signupStyle.Mid}>
        <View style={signupStyle.IDContainer}>
          <View style={signupStyle.InputBoxContainer2}>
            <TextInput style={signupStyle.InputTextBox}>
              <Text >아이디</Text>
            </TextInput>
          </View>
          <TouchableOpacity 
            style={signupStyle.IDCheckContainer}
            onPress={() => Alert.alert(
              title='중복확인',
              message='사용가능한 아이디입니다.',
            )}
          >
            <Text style={signupStyle.IDCheckText}>중복확인</Text>
          </TouchableOpacity>
        </View>
        <View style={signupStyle.InputBoxContainer}>
          <TextInput style={signupStyle.InputTextBox}>
            <Text>비밀번호</Text>
          </TextInput>
        </View>
        <View style={signupStyle.InputBoxContainer}>
          <TextInput style={signupStyle.InputTextBox}>
            <Text>비밀번호 확인</Text>
          </TextInput>
        </View>
        <View style={signupStyle.InputBoxContainer}>
          <TextInput style={signupStyle.InputTextBox}>
            <Text>이름 (실명 입력)</Text>
          </TextInput>
        </View>
        <View style={signupStyle.InputBoxContainer}>
          <TextInput style={signupStyle.InputTextBox}>
            <Text>휴대전화번호 ('-'제외)</Text>
          </TextInput>
        </View>
        <View style={signupStyle.InputBoxContainer}>
          <TextInput style={signupStyle.InputTextBox}>
            <Text>학번, 연구원번호, 사번, 등</Text>
          </TextInput>
        </View>
        <View style={signupStyle.InputBoxContainer}>
          <TouchableOpacity 
            style={signupStyle.InputTextBox}
            onPress={()=>toggleSortingSelectModal()}
          >
            <Text style={
              sortingStyle ?
              signupStyle.InboxSelectedText
              : signupStyle.InboxText
            }>{sortingData}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={signupStyle.Bot}>
        <TouchableOpacity 
          style={signupStyle.Button}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={signupStyle.Text}>회원가입</Text>
        </TouchableOpacity>
      </View>
      {sortingSelectModal ? 
        <SortingSelectModal 
          modalHandler={()=>toggleSortingSelectModal()}
          dataHandler={(data)=>sortingHandler(data)}
        /> 
        : <></>
      }
    </View>
  );
}


const signupStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  Top: {
    flex : 1,
  },
  Mid: {
    flex : 20,
  },
  Bot: {
   flex : 4,
   justifyContent: 'center',
  },
  IDContainer: {
    //flex: 1,
    height: RFPercentage(7),
    flexDirection: 'row',
    margin: '3%',
    marginLeft: '8%',
    marginRight: '8%',
  },
  InputBoxContainer2: {
    flex: 1,
    //height: RFPercentage(10),
    justifyContent: 'center',
    borderBottomColor: colors.kuDarkGreen,
    borderBottomWidth: 1,
  },
  IDCheckContainer: {
    height: RFPercentage(7),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.kuDarkGreen,
    borderRadius: 5,
    width: 100,
    height: '100%',
  },
  IDCheckText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.kuWhite,
  },
  InputBoxContainer: {
    //flex: 1,
    height: RFPercentage(7),
    margin: '3%',
    marginLeft: '8%',
    marginRight: '8%',
    borderBottomColor: colors.kuDarkGreen,
    borderBottomWidth: 1,
    justifyContent: 'center',
  },
  InputTextBox: {
    justifyContent: 'center',
    fontSize: 20,
    color: colors.kuCoolGray,
    //marginLeft: '5%',
    //marginRight: '5%',
  },
  InboxText: {
    fontSize: 20,
    color: colors.kuCoolGray,
  },
  InboxSelectedText: {
    fontSize: 20,
    color: colors.kuBlack,
  },
  Button: {
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: colors.kuDarkGreen,
    width: '70%',
    height: '60%',
    borderWidth: 1,
    borderRadius: 5,
  }, 
  Text: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.kuWhite,
  },
});