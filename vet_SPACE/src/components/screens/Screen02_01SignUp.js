import 'react-native-gesture-handler';
import * as React from 'react';

import {View, Text, TextInput,StyleSheet, Alert, TouchableOpacity, ScrollView} from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

import { colors } from '../../utils/Styles';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import SortingSelectModal from '../modal/SortingSelectModal';
import PrivacyPolicyModal from '../modal/PrivacyPolicyModal';

export default function SignUpScreen({navigation}){
  /**
    1. 회원 가입 버튼 눌렀을 때 처리해야 하는 내요 
      1.1. 중복 확인이 된 아이디 인지 확인
      //1.2. 비밀번호, 비밀번호 확인 이 서로 같은지 확인
      1.3. 비밀번호가 올바른 형식인지 확인
      //1.4. 모든 정보가 다 들어가 있는지 확인 
    2. 텍스트 입력 박스 선택시 화면 찌그러지는 현상 수정 필요 
  */
  const [__id, setId] = React.useState("");
  const [__password, setPassword] = React.useState("");
  const [__password2, setPassword2] = React.useState("");
  const [__name, setName] = React.useState("");
  const [__phone, setPhone] = React.useState("");
  const [__number, setNumber] = React.useState("");
  const [__sort, setSort] = React.useState("");

  const [sortingSelectModal, setSortingSelectModal] = React.useState(false);
  const [sortingData, setSortingData] = React.useState('분 류');
  const [sortingStyle, setSortingStyle] = React.useState(false);

  const [privacyModal, setPrivacyModal] = React.useState(true);

  const toggleSortingSelectModal =  () => {
    setSortingSelectModal(prev => (!prev));
  };
  const sortingHandler = (data) => {
    setSortingData(data);
    setSort(data);
    toggleSortingSelectModal();
    sortingStyleChange();
  };
  const sortingStyleChange = () => {
    setSortingStyle(true);
  };

  const idChange = (data) => {
    setId(data);
  };

  const togglePrivacyModal =  () => {
    setPrivacyModal(prev => (!prev));
  };
  const cancleHandler = () => {
    setPrivacyModal(prev => (!prev));
    navigation.navigate('Login');
  };

  const signUpOnPress = () => {
    let dot = __id.indexOf('@');
    if(__id.trim() === ""){
      Alert.alert("아이디 오류", "아이디를 입력해주세요.");
    }else if(dot === 0){
      Alert.alert("아이디 오류", "올바른 이메일 형식을 입력하세요");
    }else if(__id.substr(dot+1, 12) !== "konkuk.ac.kr"){
      Alert.alert("아이디 오류", "건국 메일을 사용해주세요");
    }else if(__password.length < 8 || __password.length > 16){
      Alert.alert("패스워드 오류", "비밀번호는 8자리 이상 16자리 이하 입니다.");
    }else if(!(__password.trim() !== "" && __password === __password2)){
      Alert.alert("패스워드 오류","비밀번호가 다릅니다.");
    }else if(__name.trim() === ""){
      Alert.alert("이름 오류","이름을 입력해주세요.");
    }else if(__phone.trim() === ""){
      Alert.alert("전화번호 오류","전화번호를 입력해주세요.");
    }else if(__phone.indexOf('-') !== -1){
      Alert.alert("전화번호 오류","- 를 제거해주세요");
    }else if(__number.trim() === ""){
      Alert.alert("번호 오류","학번 또는 연구원번호 또는 사번을 입력해주세요.");
    }else if(__sort === ""){
      Alert.alert("분류 오류","분류를 선택해주세요.");
    }else{
      auth().createUserWithEmailAndPassword(__id, __password)
      .then(() => {
        const update = {
          displayName : __name,
          photoURL: '',
        };
        auth().currentUser.updateProfile(update)
        .catch(error => {
          Alert.alert('error 212', error.code);
        });
        //auth().currentUser.updatePhoneNumber();
        firestore().collection('User_info').doc(auth().currentUser.uid).set({
          ku_id: __number,
          user_type: __sort,
          phone_number: __phone,
        }).then(() => {
          auth().currentUser.sendEmailVerification().then(() => {
            Alert.alert("회원가입 완료","회원가입이 정상적으로 되었습니다.\n이메일 인증 후 이용이 가능합니다.\n이메일을 확인해주세요.");
            navigation.navigate('Login');
          }).catch(e => {
            if(e.code === 'auth/too-many-request'){
              Alert.alert('이메일 인증 오류', '인증 이메일을 확인해주세요');
              navigation.navigate('Login');
            }else{
              Alert.alert('error', e.code + '\n안증 이메일이 전송되지 않았습니다.');
            }
          });
        }).catch(error => {
          Alert.alert('error 213',error.code);
        });
      })
      .catch(error => {
        if(error.code === 'auth/email-already-in-use'){
          Alert.alert('이메일 오류', '이미 사용 중인 이메일 입니다.');
        }else if(error.code === 'auth/invalid-email'){
          Alert.alert('이메일 오류', '올바르지 않은 이메일 형식입니다.');
        }else if(error.code === 'auth/weak-password'){
          Alert.alert('비밀번호 오류', '약한 비밀번호 입니다.');
        }else{
          Alert.alert('error 211', error.code);
        }
      });
    }
  };

  return(
    <View style={signupStyle.container}>
      <View style={signupStyle.Top}>
      </View>
      <ScrollView 
        style={signupStyle.Mid}
        persistentScrollbar={true}
      >
        <View style={signupStyle.IDContainer}>
          <View style={signupStyle.InputBoxContainer2}>
            <TextInput 
              style={signupStyle.InputTextBox}
              autoCapitalize="none"
              placeholder="이메일"
              value={__id}
              onChangeText={(value) => idChange(value)}
            />
          </View>
        </View>
        <View style={signupStyle.InputBoxContainer}>
          <TextInput 
            style={signupStyle.InputTextBox}
            autoCapitalize="none"
            secureTextEntry={true}
            placeholder="비밀번호 (8 ~ 16자리)"
            value={__password}
            onChangeText={setPassword}
          />
        </View>
        <View style={signupStyle.InputBoxContainer}>
          <TextInput 
            style={signupStyle.InputTextBox}
            autoCapitalize="none"
            secureTextEntry={true}
            placeholder="비밀번호 확인"
            value={__password2}
            onChangeText={setPassword2}
          />
        </View>
        <View style={signupStyle.InputBoxContainer}>
          <TextInput 
            style={signupStyle.InputTextBox}
            autoCapitalize="none"
            placeholder="이름 (실명 입력)"
            value={__name}
            onChangeText={setName}
            />
        </View>
        <View style={signupStyle.InputBoxContainer}>
          <TextInput 
            style={signupStyle.InputTextBox}
            placeholder="휴대전화번호 ('-'제외)"
            value={__phone}
            onChangeText={setPhone}
            keyboardType={'number-pad'}
          />
        </View>
        <View style={signupStyle.InputBoxContainer}>
          <TextInput 
            style={signupStyle.InputTextBox}
            placeholder="학번, 연구원번호, 사번, 등"
            value={__number}
            onChangeText={setNumber}
            keyboardType={'number-pad'}
          />
        </View>
        <View style={signupStyle.InputBoxContainer}>
          <TouchableOpacity 
            style={signupStyle.InputTextBox}
            value={__sort}
            onPress={()=>toggleSortingSelectModal()}
          >
            <Text style={
              sortingStyle ?
              signupStyle.InboxSelectedText
              : signupStyle.InboxText
            }>{sortingData}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={signupStyle.Bot}>
        <TouchableOpacity 
          style={signupStyle.Button}
          onPress={() => signUpOnPress()}
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
      {privacyModal ? 
        <PrivacyPolicyModal 
          modalHandler={()=>togglePrivacyModal()}
          cancleHandler={()=>cancleHandler()}
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
    //flex : 20,
    height: '80%',
  },
  Bot: {
   //flex : 4,
   height: RFPercentage(12),
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
    fontWeight: 'bold',
    //color: colors.kuCoolGray,
    //marginLeft: '5%',
    //marginRight: '5%',
  },
  InboxText: {
    fontSize: 20,
    fontWeight:'bold',
    color: colors.kuCoolGray,
  },
  InboxSelectedText: {
    fontSize: 20,
    fontWeight:'bold',
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
