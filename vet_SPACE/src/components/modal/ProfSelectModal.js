import 'react-native-gesture-handler';
import * as React from 'react';

import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Picker} from '@react-native-community/picker';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';


import {colors} from '../../utils/Styles';
import { TextInput } from 'react-native-gesture-handler';

export default function ProfSelectModal(props) {
  const [selected, setSelected] = React.useState('강영선');
  const ClassData = [
    "강영선",
    "이정익",
    "이상원",
    "윤헌영",
    "윤경아",
  ];
  return(
    <View style={profselectmodalStyle.container}>
      <TouchableOpacity 
        style={profselectmodalStyle.background}
        activeOpacity={1} // 깜박이는 효과 없애기 
        onPress={props.modalHandler}
      />
      <View style={profselectmodalStyle.modal}>
        <Text style={profselectmodalStyle.titleText}>담당 교수</Text>
        <Text style={profselectmodalStyle.dataText}>{selected}</Text>
        <View style={profselectmodalStyle.line}></View>
        <View>
          {/**
          <TextInput
            style={profselectmodalStyle.inputText}
          />
           *   */}
          <Picker
            style={profselectmodalStyle.picker}
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
        <View style={profselectmodalStyle.line}></View>
        <TouchableOpacity
          onPress={()=>props.dataHandler(selected)}
        >
          <Text style={profselectmodalStyle.buttonText}>완료</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const profselectmodalStyle = StyleSheet.create({
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
  inputText: {
    fontSize: RFPercentage(4),
    alignSelf: 'center',
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