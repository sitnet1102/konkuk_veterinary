import 'react-native-gesture-handler';
import * as React from 'react';

import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Picker} from '@react-native-community/picker';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';


import {colors} from '../../utils/Styles';

export default function ClassificationSelectModal(props) {
  const [selected, setSelected] = React.useState('강의실');
  const [selectedIndex, setSelectedIndex] = React.useState('0');
  return(
    <View style={classificationselectmodalStyle.container}>
      <TouchableOpacity 
        style={classificationselectmodalStyle.background}
        activeOpacity={1} // 깜박이는 효과 없애기 
        onPress={props.modalHandler}
      />
      <View style={classificationselectmodalStyle.modal}>
        <Text style={classificationselectmodalStyle.titleText}>구분 선택</Text>
        <Text style={classificationselectmodalStyle.dateText}>{selected}</Text>
        <View style={classificationselectmodalStyle.line}></View>
        <View>
          <Picker
            style={classificationselectmodalStyle.picker}
            selectedValue={selected}
            onValueChange={(itemValue, itemIndex) => {
              setSelected(itemValue)
              setSelectedIndex(itemIndex)
            }}
            >
            <Picker.Item label = "강의실" value = "강의실"/>
            <Picker.Item label = "실습실" value = "실습실"/>
            <Picker.Item label = "세미나실" value = "세미나실"/>
            <Picker.Item label = "기타" value = "기타"/>
          </Picker>
        </View>
        <View style={classificationselectmodalStyle.line}></View>
        <TouchableOpacity
          onPress={()=>props.dataHandler(selected)}
        >
          <Text style={classificationselectmodalStyle.buttonText}>완료</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const classificationselectmodalStyle = StyleSheet.create({
  container: { 
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  background: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modal: {
    marginHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: colors.kuWhite,
  },
  titleText: {
    color: colors.kuDarkGreen,
    fontSize: RFPercentage(3),
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  dateText:{
    fontSize: RFPercentage(3),
    fontWeight: 'bold',
    marginBottom: 10,
  },
  picker: {
    marginVertical: 10,
    width: RFValue(280),
  },
  line: {
    height: 1,
    width: '80%',
    backgroundColor: colors.kuDarkGray,
  },
  buttonText: {
    color: colors.kuDarkGreen,
    fontSize: RFPercentage(3),
    fontWeight: 'bold',
    margin: 20,
  },
});