import 'react-native-gesture-handler';
import * as React from 'react';

import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Picker} from '@react-native-community/picker';

import {colors} from '../../utils/Styles';
import {horizontalScale, verticalScale, moderateScale} from '../../utils/scailing';

export default function TimeSelectModal(props) {
  const [selectedHour, setSelectedHour] = React.useState('08');
  const [selectedMin, setSelectedMin] = React.useState('00');
  const state = {
    HourData: [],
    MinData: [
      "00",
      "30",
    ],
  };
  for(let i = 0;i<15; i+=1){
    const tmp = i+8;
    if(tmp<10){
      tmp = "0"+tmp;
    }else{
      tmp = ""+tmp;
    }
    state.HourData.push(tmp);
  }
  /*
  for(let i = 0;i<2; i+=1){
    const tmp = i*30;
    if(tmp<10){
      tmp = "0"+tmp;
    }else{
      tmp = ""+tmp;
    }
    state.MinData.push(tmp);
  }
  */
  return(
    <View style={timeselectmodalStyle.container}>
      <TouchableOpacity 
        style={timeselectmodalStyle.background}
        activeOpacity={1} // 깜박이는 효과 없애기 
        onPress={props.modalHandler}
      />
      <View style={timeselectmodalStyle.modal}>
        <Text style={timeselectmodalStyle.titleText}>{props.title} 선택</Text>
        <Text style={timeselectmodalStyle.dataText}>{selectedHour+":"+selectedMin}</Text>
        <View style={timeselectmodalStyle.line}></View>
        <View style={timeselectmodalStyle.pickerContainer}>
          <Picker
            style={timeselectmodalStyle.picker}
            selectedValue={selectedHour}
            onValueChange={(itemValue) => {
              setSelectedHour(itemValue)
            }}
            >
            {
              state.HourData.map((rowData, index) => (
                <Picker.Item 
                key ={index}
                label = {rowData}
                value = {rowData}
                />
              ))
            }
          </Picker>
          <Picker
            style={timeselectmodalStyle.picker}
            selectedValue={selectedMin}
            onValueChange={(itemValue) => {
              setSelectedMin(itemValue)
            }}
          >
            {
              state.MinData.map((rowData, index) => (
                <Picker.Item 
                key ={index}
                label = {rowData}
                value = {rowData}
                />
              ))
            }
          </Picker>
        </View>
        <View style={timeselectmodalStyle.line}></View>
        <TouchableOpacity
          onPress={()=>props.dataHandler(selectedHour,selectedMin)}
        >
          <Text style={timeselectmodalStyle.buttonText}>완료</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const timeselectmodalStyle = StyleSheet.create({
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
  pickerContainer: {
    flexDirection: 'row',
  },
  picker: {
    marginVertical: verticalScale(10),
    width: horizontalScale(150),
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