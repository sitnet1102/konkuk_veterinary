import 'react-native-gesture-handler';
import * as React from 'react';

import {View, Text, Button, TextInput, ImageBackground, Platform, StyleSheet, Image, CheckBox} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { colors } from './utils/Styles';

import {IMG_BACKGROUND, IMG_KULOGO} from './utils/icons';

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
  /// 체크 박스 안드로이드에서 사라질 예정이어서 따로 다운로드를 해주어야 함
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
              <View style={loginStyle.loginContainer}>
                <Text>로그인(Login)</Text>
              </View>
            </TouchableOpacity>
            <View style={loginStyle.loginAutoLogin}>
              <CheckBox
                value={isSelected}
                onValueChange={setSelection}
                style={loginStyle.loginCheckBox}
              />
              <Text style={loginStyle.loginAutoLoginText}>자동 로그인(Auto Login)</Text>
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
function CreatePostScreen({navigation, route}) {
  const [postText, setPostText] = React.useState('');

  return (
    <>
      <TextInput
        multiline
        placeholder="What's on your mind?"
        style={{height: 200, padding: 10, backgroundColor: 'white'}}
        value={postText}
        onChangeText={setPostText}
      />
      <Button
        title="Done"
        onPress={() => {
          // Pass params back to home screen
          navigation.navigate('Login', {post: postText});
        }}
      />
    </>
  );
}
function DetailsScreen({route, navigation}) {
  /* 2. Get the param */
  const {itemId, otherParam} = route.params;
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Details Screen</Text>
      <Text>itemId: {JSON.stringify(itemId)}</Text>
      <Text>otherParam: {JSON.stringify(otherParam)}</Text>
      <Button
        title="Go to Details... again"
        onPress={() =>
          navigation.push('Details', {
            itemId: Math.floor(Math.random() * 100),
          })
        }
      />
      <Button
        title="Go to Login"
        onPress={() => navigation.navigate('Login')}
      />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
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
            title: '',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          initialParams={{itemId: 42}}
        />
        <Stack.Screen
          name="CreatePost"
          component={CreatePostScreen}
          options={{
            title: 'Post',
            headerTitleAlign: 'center',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const loginStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  loginTop: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  loginMid: {
    alignItems: 'center',
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
    backgroundColor: colors.kuLightGray,
    width: '70%',
    height: '15%',
    opacity: 0.8,
    margin: '2%',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.kuDarkGray,
  },
  loginContainer:{
    backgroundColor: colors.kuGreen,
  },
  loginButton: {
    backgroundColor: colors.kuGreen,
    margin: '2%',
    borderRadius: 5,
    borderWidth: 1,
  },
  loginAutoLogin: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginCheckBox: {

  },
  loginAutoLoginText: {
    fontWeight: 'bold',
    flexDirection: 'row',
  },
});

const startStyle = StyleSheet.create({
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
    backgroundColor: colors.kuLightGray,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    margin: '1%',
    width: '80%',
  },
  mainSelectTitleText: {
    fontSize: 42,
  },
});







export default App;
