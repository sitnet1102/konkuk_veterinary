import 'react-native-gesture-handler';
import * as React from 'react';

import {Text, View, StyleSheet,TouchableOpacity} from 'react-native';
import { RFPercentage} from "react-native-responsive-fontsize";

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import {colors} from '../../utils/Styles';

import NameChangeModal from '../modal/NameChangeModal';
import PhoneChangeModal from '../modal/PhoneChangeModal';

export default function MyInfoScreen() {
  const [nameChangeModal, setNameChangeModal] = React.useState(false);
  const [phoneChangeModal, setPhoneChangeModal] = React.useState(false);

  const [__name, setName] = React.useState(auth().currentUser.displayName);
  const __id = auth().currentUser.email;
  const [__phoneNumber, setPhoneNumber] = React.useState(' '); 
  const [__num, setNum] = React.useState(' ');
  const [__sort, setSort] = React.useState(' ');
  firestore().collection('User_info').doc(auth().currentUser.uid).get().then(Snapshot => {
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

  return(
    <View style={myinfoStyle.container}>
      <Text style={myinfoStyle.title}>기본 정보</Text>
      <View style={myinfoStyle.line}></View>
      <View style={myinfoStyle.dataContainer}>
        <View style={myinfoStyle.rowContainer}>
          <Text style={myinfoStyle.text}>이름</Text>
          <View style={myinfoStyle.emptyBox}></View>
          <TouchableOpacity 
            style={myinfoStyle.update}
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
            style={myinfoStyle.update}
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
    fontSize: RFPercentage(4),
    fontWeight: 'bold',
    marginLeft: 30,
    marginTop: 20,
    marginBottom: 10,
  },
  line: {
    height: 1,
    width: '90%',
    backgroundColor: colors.kuDarkGreen,
    alignSelf: 'center',
  },
  dataContainer: {
    height: RFPercentage(12),
    marginVertical: RFPercentage(0.5),
    marginHorizontal: 35,
    //backgroundColor: colors.kuOrange,
    //flexDirection: 'row',
  },
  line2: {
    height: 1,
    width: '90%',
    backgroundColor: colors.kuCoolGray,
    alignSelf: 'center',
  },
  text: {
    fontSize: RFPercentage(3.5),
    fontWeight: 'bold',
    //alignSelf: 'center',
    //marginRight: 40,
    marginVertical: RFPercentage(0.5),
  },
  text2: {
    fontSize: RFPercentage(3),
    fontWeight: 'bold',
    marginVertical: RFPercentage(1),
    marginLeft: 20,
    //alignSelf: 'center',
  },
  text3: {
    fontSize: RFPercentage(3),
    fontWeight: 'bold',
  },
  rowContainer: {
    flexDirection: 'row',
  },
  emptyBox: {
    flex: 1,
  },
  update: {

  },
});