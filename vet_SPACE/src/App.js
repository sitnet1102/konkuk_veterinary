import 'react-native-gesture-handler';
import * as React from 'react';

import {View, Text, Button, TextInput, ImageBackground, Platform, StyleSheet, Image} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { colors } from './utils/Styles';

import {IMG_BACKGROUND, IMG_KULOGO, IC_SETTING} from './utils/icons';

//import background1 from '../assets/images/';
//'https://www.notion.so/Test-fd9f7012616644019d0d2e4f007f6c70' -> 노션 예시 링크
/*
<Button
          title="Create post"
          onPress={() => navigation.navigate('CreatePost')}
        />
        <Text style={{margin: 10}}></Text>
*/
function StartScreen({navigation, route}) {
  /// splash 로 변경해서 넣어주어야 함
  return (
    <View style={startStyle.container}>
      <ImageBackground
        source={IMG_BACKGROUND}
        style={{width: '100%', height: '100%'}}>
        <View style={startStyle.startTop}>
          <Image style={startStyle.startLogoImage} source={IMG_KULOGO}/>
        </View>
        <View style={startStyle.startMid}>
          <Text style={startStyle.startTitleText}>건국대학교</Text>
          <Text style={startStyle.startTitleText}>수의과대학</Text>
          <Text style={startStyle.startTitleText}>강의실대여</Text>
        </View>
        <View style={startStyle.startBot}>

        </View>
      </ImageBackground>
    </View>
  );
}

function LoginScreen({navigation, route}) {
  /// 아이디, 비밀번호 입력 시에 화면이 잘 안보이는 현상이 있음 -> 수정이 필요
  const [isSelected, setSelection] = React.useState(false);
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
          <View style={loginStyle.loginTop}>
            <Text style={loginStyle.loginTitleText} >건국대학교</Text>
            <Text style={loginStyle.loginTitleText} >수의과대학</Text>
            <Text style={loginStyle.loginTitleText} >강의실대여</Text>
          </View>
          <View style={loginStyle.loginMid}>
            <TextInput style={loginStyle.loginInputTextBox}>
              <Text>     아이디(ID)</Text>
            </TextInput>
            <TextInput style={loginStyle.loginInputTextBox}>
              <Text>     비밀번호(Password)</Text>
            </TextInput>
            <TouchableOpacity style={loginStyle.loginButton}>
              <Text>로그인(Login)</Text>
            </TouchableOpacity>
            
            <View style={loginStyle.loginAutoLogin}>
              <CheckBox
                disabled={false}
                value={isSelected}
                onValueChange={setSelection}
                boxType='square'
                style={loginStyle.loginCheckBox}
              />
              <Text style={loginStyle.loginAutoLoginText}>자동 로그인(Auto Login) / </Text>
              <TouchableOpacity>
                <Text style={loginStyle.loginNewAccButton}>회원가입(Sign Up)</Text>
              </TouchableOpacity>
            </View>
            
          </View>
          <View style={loginStyle.loginBot}>
          </View>
        </ImageBackground>
      </View>
    );
  }
}
function MainScreen({navigation, route}){
  return (
    <View>
      <ImageBackground
        source={IMG_BACKGROUND}
        style={{width: '100%', height: '100%'}}>
        <View style={mainStyle.mainTop}>
          <Text style={mainStyle.mainTitleText}>수의과대학</Text>
          <Text style={mainStyle.mainTitleText}>강의실대여</Text>
        </View>
        <View style={mainStyle.mainMid}>
          <TouchableOpacity style={mainStyle.mainTouchBox}>
            <Text style={mainStyle.mainSelectTitleText}>강의실예약</Text>
          </TouchableOpacity>
          <TouchableOpacity style={mainStyle.mainTouchBox}>
            <Text style={mainStyle.mainSelectTitleText}>예약확인</Text>
          </TouchableOpacity>
          <TouchableOpacity style={mainStyle.mainTouchBox}>
            <Text style={mainStyle.mainSelectTitleText}>강의실정보</Text>
          </TouchableOpacity>
        </View>
        <View style={mainStyle.mainBot}>
          
        </View>
      </ImageBackground>
    </View>
  );
}
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen
          name="Start"
          component={StartScreen}
          options={{
            headerTitleAlign: 'center',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            title: 'Overview',
            headerTitleAlign: 'center',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{
            headerStyle: {
              backgroundColor: colors.kuDarkGreen,
            },
            headerRight: () => (
              <TouchableOpacity style={headerStyle.headerMenuTouchBox}>
                <Image source={IC_SETTING}/>
              </TouchableOpacity>
            ),
            title: '',
            headerTitleAlign: 'center',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const loginStyle = StyleSheet.create({
  // 폰트 사이즈 정리해야함
  container: {
    flex: 1,
  },
  loginTop: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  loginMid: {
    //alignItems: 'center',
    justifyContent: 'center',
    flex: 5,
  },
  loginBot: {
    flex: 2,
  },
  loginTitleText: {
    fontWeight: 'bold',
    fontSize: 42,
  },
  loginInputTextBox: {
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
  loginButton: {
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
  loginAutoLogin: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginCheckBox: {
    transform: [{scaleX: 0.8}, {scaleY: 0.8}]
  },
  loginAutoLoginText: {
    fontWeight: 'bold',
    flexDirection: 'row',
  },
  loginNewAccButton: {
    textDecorationLine: 'underline',
  }
});

const startStyle = StyleSheet.create({
  // 폰트 사이즈 정리해야함
  container: {
    flex: 1,
  },
  startTop: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startMid: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 4,
  },
  startBot: {
    flex: 3,
  },
  startLogoImage: {
    aspectRatio: 0.2,
    resizeMode: 'contain',
  },
  startTitleText: {
    fontWeight: 'bold',
    fontSize: 42,
  }
});

const mainStyle = StyleSheet.create({
  // 폰트 사이즈 정리해야함
  container: {
    flex: 1,
  }, 
  mainTop: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainMid: {
    justifyContent: 'center',
    flex: 4,
  },
  mainBot: {
    flex: 2,
  },
  mainTitleText: {
    fontWeight: 'bold',
    fontSize: 42,
  },
  mainTouchBox: {
    alignSelf: 'center',
    fontWeight: 'bold',
    backgroundColor: colors.kuLightGray,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    opacity: 0.8,
    margin: '2%',
    width: '70%',
    padding: '4%',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.kuDarkGreen,
  },
  mainSelectTitleText: {
    fontSize: 42,
  },
});

const headerStyle = StyleSheet.create({
  headerMenuTouchBox:{
    // padding 크기 정리해야함 
    // 아이콘 바꾸면 바꿀 예정임 
    backgroundColor: colors.kuBeige,
    padding: 5,
  },
});




export default App;
