import 'react-native-gesture-handler';
import * as React from 'react';

import {Text, View, StyleSheet, TextInput, TouchableOpacity, Alert} from 'react-native';

import {colors} from '../../utils/Styles';
import {horizontalScale, verticalScale, moderateScale} from '../../utils/scailing';

export default function NameInputModal(props) {
	const [name, setName] = React.useState('');
	const confirm = () => {
		if(name.trim() === ''){
			Alert.alert('입력 오류', '이름을 입력해주세요');
		}else{
			props.dataHandler(name);
		}
	};
  
  return(
    <View style={nameinputmodalStyle.container}>
      <TouchableOpacity 
        style={nameinputmodalStyle.background}
        activeOpacity={1} // 깜박이는 효과 없애기 
        onPress={props.modalHandler}
      />
      <View style={nameinputmodalStyle.modal}>
        <Text style={nameinputmodalStyle.titleText}>이름 입력</Text>
				<View style={nameinputmodalStyle.line}/>
        <TextInput
					placeholder="이름"
					autoCapitalize="none"
					keyboardType="default"
					value={name}
          onChangeText={setName}
          style={nameinputmodalStyle.text}
        />
				<View style={nameinputmodalStyle.line}/>
        <TouchableOpacity
					onPress={confirm}
        >
          <Text style={nameinputmodalStyle.buttonText}>확인</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const nameinputmodalStyle = StyleSheet.create({
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