import 'react-native-gesture-handler';
import * as React from 'react';

import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Picker} from '@react-native-community/picker';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';


import {colors} from '../../utils/Styles';

export default function PurposeSelectModal(props) {
  const [selected, setSelected] = React.useState('강의실');
  const ClassData = [
    "강의",
    "세미나",
    "간담회",
    "연구보고",
  ];
  return(
    <View style={purposeselectmodalStyle.container}>
      <TouchableOpacity 
        style={purposeselectmodalStyle.background}
        activeOpacity={1} // 깜박이는 효과 없애기 
        onPress={props.modalHandler}
      />
      <View style={purposeselectmodalStyle.modal}>
        <Text style={purposeselectmodalStyle.titleText}>구분 선택</Text>
        <Text style={purposeselectmodalStyle.dataText}>{selected}</Text>
        <View style={purposeselectmodalStyle.line}></View>
        <View>
          <Picker
            style={purposeselectmodalStyle.picker}
            selectedValue={selected}
            onValueChange={(itemValue) => {
              setSelected(itemValue)
            }}
            >
            {
              ClassData.map((rowData, index) => (
                <Picker.Item 
                key ={index}
                label = {rowData}
                value = {rowData}
                />
              ))
            }
            <Picker.Item label="기타" value="기타"/>
          </Picker>
        </View>
        <View style={purposeselectmodalStyle.line}></View>
        <TouchableOpacity
          onPress={()=>props.dataHandler(selected)}
        >
          <Text style={purposeselectmodalStyle.buttonText}>완료</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const purposeselectmodalStyle = StyleSheet.create({
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
  dataText:{
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