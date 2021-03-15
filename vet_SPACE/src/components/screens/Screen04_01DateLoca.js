import 'react-native-gesture-handler';
import * as React from 'react';

import {View, Text, StyleSheet} from 'react-native';
import { TouchableOpacity} from 'react-native-gesture-handler';
import { colors } from '../../utils/Styles';

export default function DateLocaScreen({navigation}){
  /**
    추가 및 변경해야 하는 내용
    1. 날짜, 구분, 장소 각각 선택창 UI
    2. 다음 버튼 활성화 옵션
    3. 다믕 버튼 활성화 스타일 
    4. 메뉴 연결
    5. 홈 버튼 연결
   */
  return (
    <View style={DateLocaStyle.container}>
      <View style={DateLocaStyle.dateLocaTop}>
      </View>
      <View style={DateLocaStyle.dateLocaMid}>
        <View style={DateLocaStyle.dateLocaContainer}>
          <View style={DateLocaStyle.dateLocaTextContainer}>
            <Text style={DateLocaStyle.dateLocaText}>날짜 :</Text>
          </View>
          <TouchableOpacity style={DateLocaStyle.dateLocaSelectBox}>
            <Text style={DateLocaStyle.dateLocaInboxText}>선 택</Text>
          </TouchableOpacity>
        </View>
        <View style={DateLocaStyle.dateLocaContainer}>
          <View style={DateLocaStyle.dateLocaTextContainer}>
            <Text style={DateLocaStyle.dateLocaText}>구분 :</Text>
          </View>
          <TouchableOpacity style={DateLocaStyle.dateLocaSelectBox}>
            <Text style={DateLocaStyle.dateLocaInboxText}>선 택</Text>
          </TouchableOpacity>
        </View>
        <View style={DateLocaStyle.dateLocaContainer}>
          <View style={DateLocaStyle.dateLocaTextContainer}>
            <Text style={DateLocaStyle.dateLocaText}>장소 :</Text>
          </View>
          <TouchableOpacity style={DateLocaStyle.dateLocaSelectBox}>
            <Text style={DateLocaStyle.dateLocaInboxText}>선 택</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={DateLocaStyle.dateLocaBot}>
        <TouchableOpacity 
          style={DateLocaStyle.dateLocaNextButton}
          onPress={() => navigation.navigate('TimeSelect')}
        >
          <Text style={DateLocaStyle.dateLocaNextText}>다     음</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const DateLocaStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  dateLocaTop:{
    flex: 1,
  },
  dateLocaMid: {
    flex: 7,
  },
  dateLocaBot: {
    flex: 2,
    justifyContent: 'center',
  },
  dateLocaContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginLeft: '2%',
    marginTop: '5%',
  },
  dateLocaTextContainer: {
    width: '30%',
  },
  dateLocaText: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  dateLocaSelectBox: {
    justifyContent: 'center',
    height: 40,
    width: 250,
    backgroundColor: colors.kuWhite,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.kuDarkGray,
  },
  dateLocaInboxText: {
    alignSelf: 'center',
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.kuDarkGray,
  },
  dateLocaNextButton: {
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: colors.kuDarkGreen,
    width: '70%',
    height: '60%',
    opacity: 0.5,
    borderWidth: 1,
    borderRadius: 5,
  }, 
  dateLocaNextText: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.kuWhite,
  },
});
