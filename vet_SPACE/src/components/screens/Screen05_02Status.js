import 'react-native-gesture-handler';
import * as React from 'react';

import {Text, View, StyleSheet, ScrollView} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Table, Row} from 'react-native-table-component';

import {colors} from '../../utils/Styles';

export default function StatusScreen() {
  const state = {
    tableTitle: ['2021년 03월 01일 // 207호 예약 내역'],
    widthArr: ['100%'],
    divisionArr: ['시간', '내용'],
    widthArr2: [100,314],
    widthArr3: [100,314],
  };
  const timeTableData = [];
  for(let i = 0;i<14; i+=1){
    const rowData = [];
    const tmp = i+8;
    const tmp2 = i+9;
    if(tmp<10){
      tmp = '0'+tmp;
    }
    if(tmp2<10){
      tmp2 = '0'+tmp2;
    }
    rowData.push(tmp+'00~'+tmp2+'00');
    rowData.push(i);
    timeTableData.push(rowData);
  }
  return(
    <View style={statusStyle.container}>
      <View style={statusStyle.top}>
      </View>
      <View style={statusStyle.mid}>
        <View style={statusStyle.rowContainer}>
          <View style={statusStyle.TextContainer}>
            <Text style={statusStyle.Text}>날짜 :</Text>
          </View>
          <TouchableOpacity style={statusStyle.SelectBox}>
            <Text style={statusStyle.InboxText}>선 택</Text>
          </TouchableOpacity>
        </View>
        <View style={statusStyle.rowContainer}>
          <View style={statusStyle.TextContainer}>
            <Text style={statusStyle.Text}>구분 :</Text>
          </View>
          <TouchableOpacity style={statusStyle.SelectBox}>
            <Text style={statusStyle.InboxText}>선 택</Text>
          </TouchableOpacity>
        </View>
        <View style={statusStyle.rowContainer}>
          <View style={statusStyle.TextContainer}>
            <Text style={statusStyle.Text}>장소 :</Text>
          </View>
          <TouchableOpacity style={statusStyle.SelectBox}>
            <Text style={statusStyle.InboxText}>선 택</Text>
          </TouchableOpacity>
        </View>

      </View>
      <View style={statusStyle.bot}>
        <View style={statusStyle.TimeSheet}>
          <Table borderStyle={statusStyle.Border}>
            <Row data={state.tableTitle} widthArr={state.widthArr} style={statusStyle.SheetTitle} textStyle={statusStyle.SheetTitleText}/>
          </Table>
          <Table borderStyle={statusStyle.Border}>
            <Row data={state.divisionArr} widthArr={state.widthArr2} style={statusStyle.SheetDivision} textStyle={statusStyle.SheetTitleText}/>
          </Table>
          <ScrollView style={statusStyle.Wrapper}>
            <Table borderStyle={statusStyle.Border}>
              {
                timeTableData.map((rowData, index) => (
                  <Row
                    key={index}
                    data={rowData}
                    widthArr={state.widthArr3}
                    style={[statusStyle.ScrollRow]}
                    textStyle={statusStyle.SheetText}
                  />
                ))
              }
            </Table>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const statusStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    height: 20,
  },
  mid: {
    height: 240,
  },
  bot: {
    flex: 1,
    marginBottom: 40,
  },
  rowContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginLeft: '2%',
    marginTop: '5%',
  },
  TextContainer: {
    width: '30%',
  },
  Text: {
    fontSize: RFPercentage(5),
    fontWeight: 'bold',
  },
  SelectBox: {
    justifyContent: 'center',
    height: 40,
    width: 250,
    backgroundColor: colors.kuWhite,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.kuDarkGray,
  },
  InboxText: {
    alignSelf: 'center',
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.kuDarkGray,
  },

  TimeSheet: {
    flex: 5,
  },
  Border: {
    borderWidth: 1,
    borderColor: colors.kuBlack,
  },
  SheetTitle: {
    justifyContent: 'center',
    height: 40,
    backgroundColor: colors.kuWarmGray,
  },
  SheetTitleText: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  SheetDivision:  {
    backgroundColor: colors.kuLightGray,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Wrapper: {
    //marginTop: -1,
  },
  ScrollRow: {
    height: 40,
    backgroundColor: colors.kuLightGray,
  },
  SheetText: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },

});