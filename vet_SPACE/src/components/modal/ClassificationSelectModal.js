import 'react-native-gesture-handler';
import * as React from 'react';
import moment from 'moment';

import {Text, View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';


import {colors} from '../../utils/Styles';

export default function ClassificationSelectModal(props) {
  const [selected, setSelected] = React.useState(moment().utcOffset('+09:00').format('YYYY-MM-DD'));
  const onDayPress = day => {
    //setSelected(day.dateString);
    setSelected(day.dateString);
  };
  return(
    <View style={dateselectmodalStyle.container}>
      <TouchableOpacity 
        style={dateselectmodalStyle.background}
        activeOpacity={1} // 깜박이는 효과 없애기 
        onPress={props.modalHandler}
      />
      <View style={dateselectmodalStyle.modal}>
        <Text style={dateselectmodalStyle.titleText}>날짜 선택</Text>
        <Text style={dateselectmodalStyle.dateText}>{selected}</Text>
        <View style={dateselectmodalStyle.line}></View>
        
        <View style={dateselectmodalStyle.line}></View>
        <TouchableOpacity
          onPress={()=>props.dateHandler(selected)}
        >
          <Text style={dateselectmodalStyle.buttonText}>완료</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const dateselectmodalStyle = StyleSheet.create({
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
    //fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
  },
  dateText:{
    fontSize: RFPercentage(3),
    fontWeight: 'bold',
    marginBottom: 10,
  },
  calendar: {
    marginVertical: 10,
    //marginHorizontal: 10,
    width: RFValue(280),
    //width: '100%',
    //borderColor: colors.kuCoolGray,
    //borderWidth: 1,
  },
  calendarText: {
    fontSize: RFPercentage(3),
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
    //fontSize: 15,
    margin: 20,
  },
});