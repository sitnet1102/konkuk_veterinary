import 'react-native-gesture-handler';
import * as React from 'react';

import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Picker} from '@react-native-community/picker';

import {colors} from '../../utils/Styles';
import {horizontalScale, verticalScale, moderateScale} from '../../utils/scailing';

export default function PurposeSelectModal(props) {
  const [selected, setSelected] = React.useState('강의');
  const ClassData = [
    "강의",
    "세미나",
    "간담회",
    "연구보고",
    "행사",
  ];
  return(
    <View style={purposeselectmodalStyle.container}>
      <TouchableOpacity 
        style={purposeselectmodalStyle.background}
        activeOpacity={1} // 깜박이는 효과 없애기 
        onPress={props.modalHandler}
      />
      <View style={purposeselectmodalStyle.modal}>
        <Text style={purposeselectmodalStyle.titleText}>목적 선택</Text>
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
    marginHorizontal: horizontalScale(20),
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: colors.kuWhite,
  },
  titleText: {
    color: colors.kuDarkGreen,
    fontSize: moderateScale(28),
    fontWeight: 'bold',
    marginTop: verticalScale(20),
    marginBottom: verticalScale(10),
  },
  dataText:{
    fontSize: moderateScale(28),
    fontWeight: 'bold',
    marginBottom: verticalScale(10),
  },
  picker: {
    marginVertical: verticalScale(10),
    width: horizontalScale(280),
  },
  line: {
    height: 1,
    width: '80%',
    backgroundColor: colors.kuDarkGray,
  },
  buttonText: {
    color: colors.kuDarkGreen,
    fontSize: moderateScale(28),
    fontWeight: 'bold',
    margin: moderateScale(20),
  },
});