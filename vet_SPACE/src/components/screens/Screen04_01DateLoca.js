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
      <View style={DateLocaStyle.Top}>
      </View>
      <View style={DateLocaStyle.Mid}>
        <View style={DateLocaStyle.Container}>
          <View style={DateLocaStyle.TextContainer}>
            <Text style={DateLocaStyle.Text}>날짜 :</Text>
          </View>
          <TouchableOpacity style={DateLocaStyle.SelectBox}>
            <Text style={DateLocaStyle.InboxText}>선 택</Text>
          </TouchableOpacity>
        </View>
        <View style={DateLocaStyle.Container}>
          <View style={DateLocaStyle.TextContainer}>
            <Text style={DateLocaStyle.Text}>구분 :</Text>
          </View>
          <TouchableOpacity style={DateLocaStyle.SelectBox}>
            <Text style={DateLocaStyle.InboxText}>선 택</Text>
          </TouchableOpacity>
        </View>
        <View style={DateLocaStyle.Container}>
          <View style={DateLocaStyle.TextContainer}>
            <Text style={DateLocaStyle.Text}>장소 :</Text>
          </View>
          <TouchableOpacity style={DateLocaStyle.SelectBox}>
            <Text style={DateLocaStyle.InboxText}>선 택</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={DateLocaStyle.Bot}>
        <TouchableOpacity 
          style={DateLocaStyle.NextButton}
          onPress={() => navigation.navigate('TimeSelect')}
        >
          <Text style={DateLocaStyle.NextText}>다     음</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const DateLocaStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  Top:{
    flex: 1,
  },
  Mid: {
    flex: 7,
  },
  Bot: {
    //flex: 2,
    height: 130,
    justifyContent: 'center',
  },
  Container: {
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
    fontSize: 40,
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
