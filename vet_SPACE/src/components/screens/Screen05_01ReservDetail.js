import 'react-native-gesture-handler';
import * as React from 'react';

import {Text, View, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Table, Row} from 'react-native-table-component';

import {colors} from '../../utils/Styles';

export default function ReservDetailScreen({/*Data,*/}) {
  const t1 = '수의학관 216호\n';
  const t2 = '2021년 03월 02일\n';
  const t3 = '0900 ~ 1200';
  const titledata=[
    [t1],
    [t2],
    [t3],
  ];
  const state = {
    widthArr: ['100%'],
  };
  const columndata = [
    ['목 적'],
    ['신청자'],
    ['연락처'],
    ['신청일자'],
    ['담당교수'],
    ['내선'],
  ];
  const data1 = '세미나';
  const data2 = '홍길동';
  const data3 = '010-1234-5678';
  const data4 = '2021년 01월 15일';
  const data5 = '홍길동 교수님';
  const data6 = '0445';
  const tabledata = [
    [data1],
    [data2],
    [data3],
    [data4],
    [data5],
    [data6],
  ];
  return(
    <View style={reservdetailStyle.container}>
      <View style={reservdetailStyle.top}>
        <Text style={reservdetailStyle.titletext}>{titledata}</Text>
      </View>
      <View style={reservdetailStyle.mid}>
        <View style={reservdetailStyle.container0}>
          <View style={reservdetailStyle.container1}>
            <Table>
              {
                columndata.map((rowData, index) => (
                  <Row
                    key={index}
                    data={rowData}
                    widthArr={state.widthArr}
                    style={[reservdetailStyle.table1]}
                    textStyle={reservdetailStyle.text1}
                  />
                ))
              }
            </Table>
          </View>
          <View style={reservdetailStyle.line}></View>
          <View style={reservdetailStyle.container2}>
            <Table>
              {
                tabledata.map((rowData, index) => (
                  <Row
                    key={index}
                    data={rowData}
                    widthArr={state.widthArr}
                    style={[reservdetailStyle.table2]}
                    textStyle={reservdetailStyle.text2}
                  />
                ))
              }
            </Table>
          </View>
        </View>
      </View>
      <View style={reservdetailStyle.bot}>
        <TouchableOpacity style={reservdetailStyle.button}>
          <Text style={reservdetailStyle.buttontext}>예약 취소</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const reservdetailStyle = StyleSheet.create({
  container:{
    flex: 1,
    margin: '5%',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.kuDarkGray,
  },
  top: {
    flex: 2,
    justifyContent: 'center',
    marginLeft: 20,
    marginTop: 10,
  },
  mid: {
    marginTop: 10,
    marginLeft: 20,
    flex: 7,
  },
  bot: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titletext: {
    fontSize: RFPercentage(4),
    //fontSize: RFValue(28),
    fontWeight: 'bold',
    lineHeight: 34,
  },
  container0: {
    height: 360,
    flexDirection: 'row',
  },
  container1: {
    flex: 3,
    marginRight: 10,
  },
  container2: {
    flex: 5,
    marginLeft: 10,
  },
  line: {
    width: 1,
    backgroundColor: colors.kuDarkGray,
  },
  table1: {
  },
  text1: {
    fontSize: RFPercentage(4),
    fontWeight: 'bold',
    alignSelf: 'flex-end',
    lineHeight: 60,
  },
  text2: {
    fontSize: RFPercentage(3),
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    lineHeight: 60,
  },
  button: {
    backgroundColor: colors.kuDarkGreen,
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttontext: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.kuWhite,
  },
});