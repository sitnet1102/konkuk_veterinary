import 'react-native-gesture-handler';
import * as React from 'react';

import {View, Text, StyleSheet} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Table, Rows} from 'react-native-table-component';
import { colors } from '../../utils/Styles';


export default function DetailScreen({navigation}){
  const __name = '홍길동'
  const __phone = '010-1234-5678'
  const __time = '1200 ~ 1400'
  const __purpose = '선 택'
  const __prof = '선 택'

  const state = {
    tableIndex: [
      ['신청자'],
      ['연락처'],
      ['시 간'],
      ['목 적'],
      ['담당교수'],
    ],
    widthArr: [
      140
    ],
    widthArr2: [
      260
    ],
  }
  return (
    <View style={detailStyle.container}>
      <View style={detailStyle.detailTop}>
        <Text style={detailStyle.detailTitleText}>
          세부사항입력
        </Text>
      </View>
      <View style={detailStyle.detailMid}>
        <View style={detailStyle.detailTableContainer}>
          <Table>
            <Rows data={state.tableIndex} widthArr={state.widthArr} style={detailStyle.detailTable} textStyle={detailStyle.detailTableText}/>
          </Table>
          <View style={detailStyle.detailVerticleLine}></View>
          <View style={detailStyle.detailTable}>
            <Text style={detailStyle.detailTableText2}>{__name}</Text>
            <Text style={detailStyle.detailTableText2}>{__phone}</Text>
            <Text style={detailStyle.detailTableText2}>{__time}</Text>
            <TouchableOpacity>
              <Text style={detailStyle.detailTableText3}>{__purpose}</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={detailStyle.detailTableText3}>{__prof}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={detailStyle.detailBot}>
        <TouchableOpacity 
          style={detailStyle.detailNextButton}
          onPress={() => navigation.navigate('Complete')}
        >
          <Text style={detailStyle.detailNextText}>제출하기</Text>
        </TouchableOpacity>
      </View>
    </View>

  );
}

const detailStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  detailTop: {
    flex: 2,
    justifyContent: 'center',
  },
  detailMid: {
    flex: 6,
  },
  detailBot: {
    flex: 2,
    justifyContent: 'center',
  },
  detailTitleText: {
    alignSelf: 'center',
    fontSize: 48,
    fontWeight: 'bold',
  },
  detailTableContainer: {
    flex: 1,
    marginLeft: '5%',
    marginRight: '5%',
    height: '100%',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.kuDarkGray,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  detailTable: {
    margin: '3%',
  },
  detailTableText: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
    margin: '10%',
  },
  detailTableText2: {
    fontSize: 28,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    margin: '6%',
  },
  detailTableText3: {
    color: colors.kuDarkGray,
    fontSize: 28,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    margin: '6%',
    textDecorationLine: 'underline',
  },
  detailVerticleLine: {
    width: 1,
    height: '90%',
    backgroundColor: colors.kuBlack,
    margin: '1%',
  },


  detailNextButton: {
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: colors.kuDarkGreen,
    width: '70%',
    height: '60%',
    opacity: 0.5,
    borderWidth: 1,
    borderRadius: 5,
  }, 
  detailNextText: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.kuWhite,
  },
});