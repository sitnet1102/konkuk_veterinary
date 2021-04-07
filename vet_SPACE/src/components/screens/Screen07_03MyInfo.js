import 'react-native-gesture-handler';
import * as React from 'react';

import {Text, View, StyleSheet} from 'react-native';
import { RFPercentage} from "react-native-responsive-fontsize";

import {colors} from '../../utils/Styles';


export default function MyInfoScreen() {
  const data = {
    name: ['홍길동'],
    id: ['ID12345'],
    phoneNumber: ['010-1234-5678'],
    num: ['202012345'],
    sort: ['학부생'],
  };

  return(
    <View style={myinfoStyle.container}>
      <Text style={myinfoStyle.title}>기본 정보</Text>
      <View style={myinfoStyle.line}></View>
      <View style={myinfoStyle.dataContainer}>
        <Text style={myinfoStyle.text}>이름</Text>
        <Text style={myinfoStyle.text2}>{data.name}</Text>
      </View>
      <View style={myinfoStyle.line2}></View>
      <View style={myinfoStyle.dataContainer}>
        <Text style={myinfoStyle.text}>아이디</Text>
        <Text style={myinfoStyle.text2}>{data.id}</Text>
      </View>
      <View style={myinfoStyle.line2}></View>
      <View style={myinfoStyle.dataContainer}>
        <Text style={myinfoStyle.text}>전화번호</Text>
        <Text style={myinfoStyle.text2}>{data.phoneNumber}</Text>
      </View>
      <View style={myinfoStyle.line2}></View>
      <View style={myinfoStyle.dataContainer}>
        <Text style={myinfoStyle.text}>학번/사번/연구원번호</Text>
        <Text style={myinfoStyle.text2}>{data.num}</Text>
      </View>
      <View style={myinfoStyle.line2}></View>
      <View style={myinfoStyle.dataContainer}>
        <Text style={myinfoStyle.text}>분류</Text>
        <Text style={myinfoStyle.text2}>{data.sort}</Text>
      </View>
      <View style={myinfoStyle.line2}></View>
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

});