import 'react-native-gesture-handler';
import * as React from 'react';

import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Picker} from '@react-native-community/picker';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';


import {colors} from '../../utils/Styles';

export default function ClassificationSelectModal(props) {
  const [selectedBuilding, setSelectedBuilding] = React.useState('수의학관');
  const [selectedRoom, setSelectedRoom] = React.useState('207');
  return(
    <View style={locationselectmodalStyle.container}>
      <TouchableOpacity 
        style={locationselectmodalStyle.background}
        activeOpacity={1} // 깜박이는 효과 없애기 
        onPress={props.modalHandler}
      />
      <View style={locationselectmodalStyle.modal}>
        <Text style={locationselectmodalStyle.titleText}>장소 선택</Text>
        <Text style={locationselectmodalStyle.dataText}>{selectedBuilding+"/"+selectedRoom}</Text>
        <View style={locationselectmodalStyle.line}></View>
        <View style={locationselectmodalStyle.pickerContainer}>
          <Picker
            style={locationselectmodalStyle.picker}
            selectedValue={selectedBuilding}
            onValueChange={(itemValue) => {
              setSelectedBuilding(itemValue)
            }}
            >
            <Picker.Item label = "수의학관" value = "수의학관"/>
            <Picker.Item label = "동물생명과학관" value = "동물생명과학관"/>
            <Picker.Item label = "기타" value = "기타"/>
          </Picker>
          <Picker
            style={locationselectmodalStyle.picker}
            selectedValue={selectedRoom}
            onValueChange={(itemValue) => {
              setSelectedRoom(itemValue)
            }}
            >
            <Picker.Item label = "207" value = "207"/>
            <Picker.Item label = "306" value = "306"/>
            <Picker.Item label = "307" value = "307"/>
            <Picker.Item label = "409" value = "409"/>
            <Picker.Item label = "410" value = "410"/>
            <Picker.Item label = "510" value = "510"/>
            <Picker.Item label = "511" value = "511"/>
            <Picker.Item label = "710-3" value = "710-3"/>
            <Picker.Item label = "710-4" value = "710-4"/>
          </Picker>
        </View>
        <View style={locationselectmodalStyle.line}></View>
        <TouchableOpacity
          onPress={()=>props.dataHandler(selectedBuilding+"/"+selectedRoom)}
        >
          <Text style={locationselectmodalStyle.buttonText}>완료</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const locationselectmodalStyle = StyleSheet.create({
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
  pickerContainer: {
    flexDirection: 'row',
  },
  picker: {
    marginVertical: 10,
    width: RFValue(150),
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