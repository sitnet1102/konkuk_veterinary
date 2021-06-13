import 'react-native-gesture-handler';
import * as React from 'react';

import {Text, View, StyleSheet,TouchableOpacity, Alert} from 'react-native';
import { RFPercentage} from "react-native-responsive-fontsize";

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import {colors} from '../../utils/Styles';
import {FIRESTORE_DATA2} from '../../utils/firebaseData';
import {horizontalScale, verticalScale, moderateScale} from '../../utils/scailing';

import NameChangeModal from '../modal/NameChangeModal';
import PhoneChangeModal from '../modal/PhoneChangeModal';

export default function MyInfoScreen() {
  const [nameChangeModal, setNameChangeModal] = React.useState(false);
  const [phoneChangeModal, setPhoneChangeModal] = React.useState(false);

  const [__name, setName] = React.useState('');
  const [__id, setId] = React.useState(''); 
  const [__phoneNumber, setPhoneNumber] = React.useState(' '); 
  const [__num, setNum] = React.useState(' ');
  const [__sort, setSort] = React.useState(' ');
  firestore().collection(FIRESTORE_DATA2).doc(auth().currentUser.uid).get().then(Snapshot => {
    setPhoneNumber(Snapshot.data().phone_number);
    setNum(Snapshot.data().ku_id);
    setSort(Snapshot.data().user_type);
  });

  const toggleNameChangeModal =  () => {
    setNameChangeModal(prev => (!prev));
  };
  const nameDataHandler = (data) => {
    setName(data);
    toggleNameChangeModal();
  };
  const togglePhoneChangeModal =  () => {
    setPhoneChangeModal(prev => (!prev));
  };
  const phoneDataHandler = (data) => {
    setPhoneNumber(data);
    togglePhoneChangeModal();
  };

  React.useEffect(() => {
    setName(auth().currentUser.displayName);
    setId(auth().currentUser.email);
    firestore().collection(FIRESTORE_DATA2).doc(auth().currentUser.uid).get()
    .then(Snapshot => {
      setPhoneNumber(Snapshot.data().phone_number);
      setNum(Snapshot.data().ku_id);
      setSort(Snapshot.data().user_type);
    }).catch(e => {
      Alert.alert('오류710','개인 정보를 불러올수없습니다.');
    });
    return () => {
      setName('');
      setId('');
      setPhoneNumber('');
      setNum('');
      setSort('');
    };
  },[]);

  return(
    <View style={myinfoStyle.container}>
      <Text style={myinfoStyle.title}>기본 정보</Text>
      <View style={myinfoStyle.line}></View>
      <View style={myinfoStyle.dataContainer}>
        <View style={myinfoStyle.rowContainer}>
          <Text style={myinfoStyle.text}>이름</Text>
          <View style={myinfoStyle.emptyBox}></View>
          <TouchableOpacity 
            onPress={()=>toggleNameChangeModal()}
          >
            <Text style={myinfoStyle.text3}>수정하기</Text>
          </TouchableOpacity>
        </View>
        <Text style={myinfoStyle.text2}>{__name}</Text>
      </View>
      <View style={myinfoStyle.line2}></View>
      <View style={myinfoStyle.dataContainer}>
        <Text style={myinfoStyle.text}>아이디</Text>
        <Text style={myinfoStyle.text2}>{__id}</Text>
      </View>
      <View style={myinfoStyle.line2}></View>
      <View style={myinfoStyle.dataContainer}>
        <View style={myinfoStyle.rowContainer}>
          <Text style={myinfoStyle.text}>전화번호</Text>
          <View style={myinfoStyle.emptyBox}></View>
          <TouchableOpacity 
            onPress={()=>togglePhoneChangeModal()}
          >
            <Text style={myinfoStyle.text3}>수정하기</Text>
          </TouchableOpacity>
        </View>
        <Text style={myinfoStyle.text2}>{__phoneNumber}</Text>
      </View>
      <View style={myinfoStyle.line2}></View>
      <View style={myinfoStyle.dataContainer}>
        <Text style={myinfoStyle.text}>학번/사번/연구원번호</Text>
        <Text style={myinfoStyle.text2}>{__num}</Text>
      </View>
      <View style={myinfoStyle.line2}></View>
      <View style={myinfoStyle.dataContainer}>
        <Text style={myinfoStyle.text}>분류</Text>
        <Text style={myinfoStyle.text2}>{__sort}</Text>
      </View>
      <View style={myinfoStyle.line2}></View>
      {nameChangeModal ?
        <NameChangeModal
          modalHandler={()=>toggleNameChangeModal()}
          dataHandler={(data)=>nameDataHandler(data)}
          /> 
          : <></>
        }
      {phoneChangeModal ?
        <PhoneChangeModal
          modalHandler={()=>togglePhoneChangeModal()}
          dataHandler={(data)=>phoneDataHandler(data)}
        /> 
        : <></>
      }
    </View>
  );
}
  
const myinfoStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: colors.kuBlack,
    fontSize: moderateScale(32),
    fontWeight: 'bold',
    marginLeft: horizontalScale(30),
    marginTop: verticalScale(20),
    marginBottom: verticalScale(10),
  },
  line: {
    height: 1,
    width: '90%',
    backgroundColor: colors.kuDarkGreen,
    alignSelf: 'center',
  },
  dataContainer: {
    height: verticalScale(100),
    marginVertical: verticalScale(5),
    marginHorizontal: horizontalScale(35),
  },
  rowContainer: {
    flexDirection: 'row',
  },
  text: {
    fontSize: moderateScale(28),
    fontWeight: 'bold',
    marginVertical: verticalScale(5),
  },
  emptyBox: {
    flex: 1,
  },
  text3: {
    fontSize: moderateScale(24),
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginVertical: verticalScale(5),
  },
  line2: {
    height: 1,
    width: '90%',
    backgroundColor: colors.kuCoolGray,
    alignSelf: 'center',
  },
  text2: {
    fontSize: moderateScale(24),
    fontWeight: 'bold',
    marginVertical: verticalScale(10),
    marginLeft: horizontalScale(20),
  },
});