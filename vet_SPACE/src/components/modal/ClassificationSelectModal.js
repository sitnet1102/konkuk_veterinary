import 'react-native-gesture-handler';
import * as React from 'react';

import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Picker} from '@react-native-community/picker';

import {colors} from '../../utils/Styles';
import {horizontalScale, verticalScale, moderateScale} from '../../utils/scailing';

export default function ClassificationSelectModal(props) {
  const [selected, setSelected] = React.useState('강의실');
  const ClassData = [
    "강의실",
    "실습실",
    "세미나실",
    "기타",
  ];
  return(
    <View style={classificationselectmodalStyle.container}>
      <TouchableOpacity 
        style={classificationselectmodalStyle.background}
        activeOpacity={1} // 깜박이는 효과 없애기 
        onPress={props.modalHandler}
      />
      <View style={classificationselectmodalStyle.modal}>
        <Text style={classificationselectmodalStyle.titleText}>구분 선택</Text>
        <Text style={classificationselectmodalStyle.dataText}>{selected}</Text>
        <View style={classificationselectmodalStyle.line}></View>
        <View>
          <Picker
            style={classificationselectmodalStyle.picker}
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