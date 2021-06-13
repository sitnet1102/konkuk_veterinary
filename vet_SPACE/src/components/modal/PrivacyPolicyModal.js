import 'react-native-gesture-handler';
import * as React from 'react';

import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

import {colors} from '../../utils/Styles';
import {horizontalScale, verticalScale, moderateScale} from '../../utils/scailing';

export default function PrivacyPolicyModal(props) {
  const cancle = () => {
    props.cancleHandler();
  };
	const reset = () => {
    props.modalHandler();
	};
  
  return(
    <View style={privacypolicymodalStyle.container}>
      <View 
        style={privacypolicymodalStyle.background}
      />
      <View style={privacypolicymodalStyle.modal}>
        <Text style={privacypolicymodalStyle.titleText}>개인정보 수집 및 이용 동의서</Text>
				<View style={privacypolicymodalStyle.line}/>
        <View style={privacypolicymodalStyle.midContainer}>
          <Text style={privacypolicymodalStyle.midText}>
            {'\n'}
            강의실 대여 업무와 관련하여 수집된 개인정보를 관리함에 있어서 [개인정보보호법] 에서 규정하고 있는 책임과 의무를 준수하고 있으며 제공자가 동의한 내용 외 다른 목적으로는 활용하지 않음을 알려드립니다. 
            {'\n'}
          </Text>
          <Text>
            필수정보 처리 내역
            {'\n'}
          </Text>
          <View style={privacypolicymodalStyle.textBox}>
            <Text>
              - 항목 : 이메일, 비밀번호, 핸드폰번호, 
              고유번호(학번,사번,연구원번호 등)
            </Text>
            <Text>
              - 수집목적 : 어플리케이션 서비스 이용
            </Text>
            <Text>
              - 보유기간 : 준영구
            </Text>
          </View>
          <Text style={privacypolicymodalStyle.midText}>
            {'\n'}
            정보주체는 개인정보 수집 동의를 거부할 권리가 있으며, 동의 거부 시 어플리케이션 서비스 이용이 불가할 수 있습니다.
            {'\n'}
          </Text>
        </View>
				<View style={privacypolicymodalStyle.line}/>
        <View style={privacypolicymodalStyle.bot}>
          <TouchableOpacity
            onPress={cancle}
          >
            <Text style={privacypolicymodalStyle.buttonText}>취소</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={reset}
          >
            <Text style={privacypolicymodalStyle.buttonText}>동의하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const privacypolicymodalStyle = StyleSheet.create({
  container: { 
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  bot: {
    flexDirection: 'row',
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
    fontSize: moderateScale(24),
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
  midContainer: {
    marginHorizontal: horizontalScale(40),
  },
  midText: {
    color: colors.kuDarkGray,
  },
  textBox: {
    borderColor: colors.kuCoolGray,
  },
});