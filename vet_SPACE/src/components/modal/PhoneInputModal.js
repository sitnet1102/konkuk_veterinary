import 'react-native-gesture-handler';
import * as React from 'react';

import {Text, View, StyleSheet, TextInput, TouchableOpacity, Alert} from 'react-native';

import {colors} from '../../utils/Styles';
import {horizontalScale, verticalScale, moderateScale} from '../../utils/scailing';

export default function PhoneInputModal(props) {
	const [phone, setPhone] = React.useState('');
	const confirm = () => {
		if(phone.trim() === ''){
			Alert.alert('입력 오류', '전화번호를 입력해주세요');
		}else{
			props.dataHandler(phone);
		}
	};
  
  return(
    <View style={phoneinputmodalStyle.container}>
      <TouchableOpacity 
        style={phoneinputmodalStyle.background}
        activeOpacity={1} // 깜박이는 효과 없애기 
        onPress={props.modalHandler}
      />
      <View style={phoneinputmodalStyle.modal}>
        <Text style={phoneinputmodalStyle.titleText}>전화번호 입력</Text>
				<View style={phoneinputmodalStyle.line}/>
        <TextInput
					placeholder="전화번호"
					autoCapitalize="none"
					keyboardType="number-pad"
					value={phone}
          onChangeText={setPhone}
          style={phoneinputmodalStyle.text}
        />
				<View style={phoneinputmodalStyle.line}/>
        <TouchableOpacity
					onPress={confirm}
        >
          <Text style={phoneinputmodalStyle.buttonText}>확인</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const phoneinputmodalStyle = StyleSheet.create({
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
  text: {
    fontSize: moderateScale(28),
    marginVertical: verticalScale(16),
  }, 
});