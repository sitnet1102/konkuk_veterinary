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
      <View style={detailStyle.Top}>
        <Text style={detailStyle.TitleText}>
          세부사항입력
        </Text>
      </View>
      <View style={detailStyle.Mid}>
        <View style={detailStyle.TableContainer}>
          <Table>
            <Rows data={state.tableIndex} widthArr={state.widthArr} style={detailStyle.Table} textStyle={detailStyle.TableText}/>
          </Table>
          <View style={detailStyle.VerticleLine}></View>
          <View style={detailStyle.Table}>
            <Text style={detailStyle.TableText2}>{__name}</Text>
            <Text style={detailStyle.TableText2}>{__phone}</Text>
            <Text style={detailStyle.TableText2}>{__time}</Text>
            <TouchableOpacity>
              <Text style={detailStyle.TableText3}>{__purpose}</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={detailStyle.TableText3}>{__prof}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={detailStyle.Bot}>
        <TouchableOpacity 
          style={detailStyle.NextButton}
          onPress={() => navigation.navigate('Complete')}
        >
          <Text style={detailStyle.NextText}>제출하기</Text>
        </TouchableOpacity>
      </View>
    </View>

  );
}

const detailStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  Top: {
    flex: 2,
    justifyContent: 'center',
  },
  Mid: {
    flex: 6,
  },
  Bot: {
    flex: 2,
    justifyContent: 'center',
  },
  TitleText: {
    alignSelf: 'center',
    fontSize: 48,
    fontWeight: 'bold',
  },
  TableContainer: {
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
  Table: {
    margin: '3%',
  },
  TableText: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
    margin: '10%',
  },
  TableText2: {
    fontSize: 28,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    margin: '6%',
  },
  TableText3: {
    color: colors.kuDarkGray,
    fontSize: 28,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    margin: '6%',
    textDecorationLine: 'underline',
  },
  VerticleLine: {
    width: 1,
    height: '90%',
    backgroundColor: colors.kuBlack,
    margin: '1%',
  },


  NextButton: {
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: colors.kuDarkGreen,
    width: '70%',
    height: '60%',
    opacity: 0.5,
    borderWidth: 1,
    borderRadius: 5,
  }, 
  NextText: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.kuWhite,
  },
});