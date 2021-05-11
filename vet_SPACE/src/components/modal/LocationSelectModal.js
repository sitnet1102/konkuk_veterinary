import 'react-native-gesture-handler';
import * as React from 'react';

import {Text, View, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {Picker} from '@react-native-community/picker';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';


import {colors} from '../../utils/Styles';

export default function LocationSelectModal(props) {
  const [selectedBuilding, setSelectedBuilding] = React.useState('건물 선택');
  const [selectedRoom, setSelectedRoom] = React.useState('호실 선택');
  
  const state = {
    BuildingData: [
      "건물 선택",
      "수의학관",
      "동물생명과학관",
      "기타",
    ],
   RoomData: [
    "호실 선택",
    "207",
    "306",
    "307",
    "409",
    "410",
    "510",
    "710-3",
    "710-4",
   ],
  };
  const complete = () => {
    if(selectedBuilding === "건물 선택" || selectedRoom === "호실 선택"){
      Alert.alert("건물 또는 호실을 선택해주세요");
    }else{
      props.dataHandler(selectedBuilding+"/"+selectedRoom);
    }
  };
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
            {
              state.BuildingData.map((rowData, index) => (
                <Picker.Item 
                key ={index}
                label = {rowData}
                value = {rowData}
                />
              ))
            }
          </Picker>
          <Picker
            style={locationselectmodalStyle.picker}
            selectedValue={selectedRoom}
            onValueChange={(itemValue) => {
              setSelectedRoom(itemValue)
            }}
            >
            {
              state.RoomData.map((rowData, index) => (
                <Picker.Item 
                key ={index}
                label = {rowData}
                value = {rowData}
                />
              ))
            }
          </Picker>
        </View>
        <View style={locationselectmodalStyle.line}></View>
        <TouchableOpacity
          //onPress={()=>props.dataHandler(selectedBuilding+"/"+selectedRoom)}
          onPress={complete}
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