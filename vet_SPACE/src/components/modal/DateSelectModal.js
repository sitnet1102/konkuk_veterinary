import 'react-native-gesture-handler';
import * as React from 'react';
import moment from 'moment';
import 'moment/locale/ko';

import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import {Calendar} from 'react-native-calendars';

import {colors} from '../../utils/Styles';

moment.locale('ko');

export default function DateSelectModal(props) {
  const [selected, setSelected] = React.useState(moment().utcOffset('+09:00').format('YYYY-MM-DD'));
  const [selectedDay, setSelectedDay] = React.useState(moment().utcOffset('+09:00').format('(dd)'));
  const endDate = new Date();
  endDate.setMonth(endDate.getMonth() + 3);
  const onDayPress = day => {
    setSelected(day.dateString);
    setSelectedDay(moment(day.dateString).format('(dd)'));
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
        <Text style={dateselectmodalStyle.dateText}>{selected + " " + selectedDay}</Text>
        <View style={dateselectmodalStyle.line}></View>
        <Calendar
          current={Date()}
          style={dateselectmodalStyle.calendar}
          textStyle={dateselectmodalStyle.calendarText}
          minDate={Date()}
          maxDate={endDate}
          onDayPress={onDayPress}
          enableSwipeMonths={true}
          monthFormat={'yyyy.MM'}
          hideExtraDays={true}
          disableAllTouchEventsForDisabledDay={true}
          markedDates={{
            [selected]: {
              selected: true, 
              selectedColor: colors.kuGreen
            },
          }}
        />
        <View style={dateselectmodalStyle.line}></View>
        <TouchableOpacity
          onPress={()=>props.dataHandler(selected + " " + selectedDay)}
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
    width: RFValue(280),
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
    margin: 20,
  },
});