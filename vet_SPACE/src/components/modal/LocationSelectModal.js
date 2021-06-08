import 'react-native-gesture-handler';
import * as React from 'react';

import {Text, View, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {Picker} from '@react-native-community/picker';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

import database from '@react-native-firebase/database';

import {colors} from '../../utils/Styles';

export default function LocationSelectModal(props) {
  const [selectedBuilding, setSelectedBuilding] = React.useState('수의학관');
  const [selectedRoom, setSelectedRoom] = React.useState('호실 선택');

  const [roomData, setRoomData] = React.useState([]);
  
  let onRoomData = '';

  const state = {
    BuildingData: [
      "건물 선택",
      "수의학관",
      "동물생명과학관",
    ],
  };
  const [buildingData, setBuildingData] = React.useState([]);

  const buildingDataChanged = (itemValue) => {
    setSelectedBuilding(itemValue);
    setSelectedRoom('호실 선택');
    onRoomData = database()
    .ref('/Room_info/Room_info_list/'+props.classificationdata+'/'+itemValue)
    .on('value', snapshot => {
      if(!snapshot.val()){
        setRoomData(["없음"]);
      }else{
        setRoomData(snapshot.val());
      }
    });
  };

  const complete = () => {
    if(selectedBuilding === "건물 선택" || selectedRoom === "호실 선택" || selectedRoom === "없음"){
      Alert.alert("건물 또는 호실을 선택해주세요");
    }else{
      //props.dataHandler(selectedBuilding+"/"+selectedRoom);
      props.dataHandler(selectedBuilding, selectedRoom);
    }
  };

  React.useEffect(()=> {
    if(props.classificationdata === "강의실"){
      setBuildingData([
        "수의학관",
        "동물생명과학관",
      ]);
    }else{
      setBuildingData([
        "수의학관",
      ]);
    }
  },[]);

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
              buildingDataChanged(itemValue)
            }}
            >
            {
              buildingData.map((rowData, index) => (
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
              roomData.map((rowData, index) => (
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