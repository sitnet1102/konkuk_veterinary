import 'react-native-gesture-handler';
import * as React from 'react';

import {Text, View, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {Picker} from '@react-native-community/picker';

import database from '@react-native-firebase/database';

import {colors} from '../../utils/Styles';
import {horizontalScale, verticalScale, moderateScale} from '../../utils/scailing';

export default function ProfSelectModal(props) {
  const [selected, setSelected] = React.useState('선택');
  const [classData, setClassData] = React.useState([]);
  
  let onData;

  const complete = () => {
    if(selected === '선택'){
      Alert.alert('선택해주세요');
    }else{
      setClassData(false);
      props.dataHandler(selected);
    }
  };
  React.useEffect(() => {
    onData =  database().ref('/Prof_info/Prof_info_list').on('value', snapshot => {
      setClassData(snapshot.val());
    });

    return () => database().ref('/Prof_info/Prof_info_list').off('value', onData);
  }, []);
  
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
          <Picker
            style={profselectmodalStyle.picker}
            selectedValue={selected}
            onValueChange={(itemValue) => {
              setSelected(itemValue)
            }}
            >
            {
              classData.map((rowData, index) => (
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
          //onPress={()=>props.dataHandler(selected)}
          onPress={() => complete()}
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