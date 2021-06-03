import 'react-native-gesture-handler';
import * as React from 'react';

import {Text, View, StyleSheet,TouchableOpacity} from 'react-native';

import {colors} from '../../utils/Styles';


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
          <Text style={roominfoStyle.text1}>실습실 / 실험실</Text>
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
    margin: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.kuDarkGray,
    //backgroundColor: colors.kuYellow,
    justifyContent: 'center',
  },
  touchBox: {
    marginHorizontal: 40,
    marginVertical: 20,
    height: 80,
    backgroundColor: colors.kuLightGray,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.kuDarkGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text1: {
    fontSize: 42,
    fontWeight: 'bold',
  },
})
