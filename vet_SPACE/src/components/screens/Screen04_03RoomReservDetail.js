import 'react-native-gesture-handler';
import * as React from 'react';

import {View, Text, StyleSheet} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Table, Row} from 'react-native-table-component';
import { colors } from '../../utils/Styles';
import { RFPercentage } from 'react-native-responsive-fontsize';


export default function RoomReservDetailScreen({navigation}){
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
      '100%'
    ],
    tabledata: [
      [__name],
      [__phone],
      [__time],
      [__purpose],
      [__prof],
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
        <View style={detailStyle.midContainer}>
          <View style={detailStyle.container1}>
            <Table>
              {
                state.tableIndex.map((rowData, index) => (
                  <Row
                    key={index}
                    data={rowData}
                    widthArr={state.widthArr}
                    style={[detailStyle.table1]}
                    textStyle={detailStyle.text1}
                  />
                ))
              }
            </Table>
          </View>
          <View style={detailStyle.line}></View>
          <View style={detailStyle.container2}>
            <Text style={detailStyle.text2}>{__name}</Text>
            <Text style={detailStyle.text2}>{__phone}</Text>
            <Text style={detailStyle.text2}>{__time}</Text>
            <TouchableOpacity>
              <Text style={detailStyle.text3}>{__purpose}</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={detailStyle.text3}>{__prof}</Text>
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
    //flex: 2,
    height: 130,
    justifyContent: 'center',
  },
  TitleText: {
    alignSelf: 'center',
    fontSize: 48,
    fontWeight: 'bold',
  },
  midContainer: {
    height: 360,
    flexDirection: 'row',
    marginHorizontal: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.kuDarkGray,
  },
  container1: {
    flex: 3,
    marginRight: 15,
  },
  container2: {
    flex: 5,
    marginLeft: 15,
  },
  line: {
    width: 1,
    marginVertical: 20,
    backgroundColor: colors.kuDarkGray,
  },
  text1: {
    fontSize: RFPercentage(3.2),
    fontWeight: 'bold',
    alignSelf: 'flex-end',
    lineHeight: 70,
  },
  text2: {
    fontSize: RFPercentage(3),
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    lineHeight: 70,
  },
  text3: {
    color: colors.kuDarkGray,
    fontSize: RFPercentage(3),
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    textDecorationLine: 'underline',
    lineHeight: 70,
  },
  tableTouchBox: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    marginLeft: 20,
    backgroundColor: colors.kuBlue,
  },

  NextButton: {
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: colors.kuDarkGreen,
    width: '70%',
    //height: '60%',
    height: 50,
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