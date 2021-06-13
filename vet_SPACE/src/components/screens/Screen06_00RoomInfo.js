import 'react-native-gesture-handler';
import * as React from 'react';

import {Text, View, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {colors} from '../../utils/Styles';
import {horizontalScale, verticalScale, moderateScale} from '../../utils/scailing';

export default function RoomInfoScreen({navigation}){
  return(
    <View style={roominfoStyle.container}>
      <View style={roominfoStyle.container1}>
        <TouchableOpacity 
          style={roominfoStyle.touchBox}
          onPress={() => navigation.navigate('RoomInfoDetail', {
              data: "강의실"
            }
          )}
          >
          <Text style={roominfoStyle.text1}>강의실</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={roominfoStyle.touchBox}
          onPress={() => navigation.navigate('RoomInfoDetail', {
              data: "실습실"
            }
          )}
          >
          <Text style={roominfoStyle.text1}>실습실</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={roominfoStyle.touchBox}
          onPress={() => navigation.navigate('RoomInfoDetail', {
              data: "세미나실"
            }
          )}
          >
          <Text style={roominfoStyle.text1}>세미나실</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={roominfoStyle.touchBox}
          onPress={() => navigation.navigate('RoomInfoDetail', {
              data: "기타"
            }
          )}
        >
          <Text style={roominfoStyle.text1}>기타</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const roominfoStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  container1: {
    flex: 1,
    margin: moderateScale(24),
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.kuDarkGray,
    justifyContent: 'center',
  },
  touchBox: {
    marginHorizontal: horizontalScale(40),
    marginVertical: verticalScale(20),
    height: verticalScale(80),
    backgroundColor: colors.kuLightGray,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.kuDarkGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text1: {
    fontSize: moderateScale(42),
    fontWeight: 'bold',
  },
})
