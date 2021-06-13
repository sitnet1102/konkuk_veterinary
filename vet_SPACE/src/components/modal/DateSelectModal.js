import 'react-native-gesture-handler';
import * as React from 'react';
import moment from 'moment';
import 'moment/locale/ko';

import {Text, View, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {Calendar} from 'react-native-calendars';

import {colors} from '../../utils/Styles';
import {horizontalScale, verticalScale, moderateScale} from '../../utils/scailing';

moment.locale('ko');

export default function DateSelectModal(props) {
  const [selected, setSelected] = React.useState(moment().utcOffset('+09:00').add(1,'days').format('YYYY-MM-DD'));
  const [selectedDay, setSelectedDay] = React.useState(moment().utcOffset('+09:00').add(1,'days').format('(dd)'));
  const startDate = new Date();
  startDate.setDate(startDate.getDate() + 1);
  const endDate = new Date();
  endDate.setMonth(endDate.getMonth() + 3);
  const onDayPress = day => {
    if(moment(day.dateString).format('dd') === '토' || moment(day.dateString).format('dd') === '일'){
      Alert.alert('경고','주말 예약입니다.');
    }
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
        <Text style={dateselectmodalStyle.dataText}>{selected + " " + selectedDay}</Text>
        <View style={dateselectmodalStyle.line}></View>
        <Calendar
          current={startDate}
          style={dateselectmodalStyle.calendar}
          textStyle={dateselectmodalStyle.calendarText}
          minDate={startDate}
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
  calendar: {
    marginVertical: verticalScale(10),
    width: horizontalScale(280),
  },
  calendarText: {
    fontSize: moderateScale(28),
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