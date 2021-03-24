import 'react-native-gesture-handler';
import * as React from 'react';

import {Text, View, StyleSheet} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {Table, TableWrapper, Cell} from 'react-native-table-component';
import RadioButtonRN from 'radio-buttons-react-native';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';

import {colors} from '../../utils/Styles';

export default function ListScreen({navigation}) {
  const [isSelected, setSelection] = React.useState(false);
  const onPressCheckBox = () => setSelection(()=>!isSelected);
  const onPressRow = () => navigation.navigate('ReservDetail');
  const radiobuttondata = [
    {label: '시간순'}, {label: '강의실순'}
  ];
  const state = {
    widthArr: ['100%'],
  };
  const tableData = [
    ['수의학관 216호\n\n2021년 03월 02일\n\n0900 ~ 1200'],
    ['수의학관 216호\n\n2021년 03월 05일\n\n0900 ~ 1200'],
  ];
  const element = (data, index) => (
    <TouchableOpacity onPress={() => onPressRow()}>
      <View style={listStyle.tableTouchBox}>
        <Text style={listStyle.text3}>{data}</Text>
      </View>
    </TouchableOpacity>
  );
  /// 임시 데이터 넣기


  return(
    <View style={listStyle.container}>
      <View style={listStyle.top}>
        <View style={listStyle.checkBox}>
          <CheckBox
            disabled={false}
            value={isSelected}
            onValueChange={setSelection}
            boxType='square'
            style={listStyle.checkBox}
            onCheckColor={colors.kuDarkGreen}
            onTintColor={colors.kuDarkGreen}
          />
        </View>
        <View>
          <TouchableOpacity onPress={onPressCheckBox}>
            <Text style={listStyle.text1}>이전 예약 보기  </Text>
          </TouchableOpacity>
        </View>
        <View style={listStyle.line}></View>
        <Text style={listStyle.text1}>  정렬 순서 :   </Text>
        <View style={listStyle.sortRadio}>
          <RadioButtonRN
            style={listStyle.radiobutton}
            data={radiobuttondata}
            //selectedBtn={(e) => console.log(e)}
            box={false}
            initial={1}
            boxStyle={listStyle.radiobuttonBox}
            textStyle={listStyle.radiobuttonText}
            activeColor={colors.kuDarkGreen}
            circleSize={10}
            labelHorizontal={false}
          />
        </View>
      </View>
      <View style={listStyle.bot}>
        <ScrollView style={listStyle.scroll}>
          <Table>
            {
              tableData.map((rowData, index) => (
                <TableWrapper
                  key={index}
                  widthArr={state.widthArr}
                  style={[listStyle.scrollRow]}
                  textStyle={listStyle.text2}
                >
                  {
                    rowData.map((cellData, index) => (
                      <Cell 
                        key={index}
                        data={element(rowData, index)}
                      />
                    ))
                  }
                </TableWrapper>
              ))
            }
          </Table>
        </ScrollView>
      </View>
    </View>
  );
}
  
const listStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.kuWhite,
  },
  top: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal : '3%',
    borderWidth: 1,
    borderColor: colors.kuDarkGray,
    borderRadius: 5,
  },
  bot: {
    flex: 9,
    marginHorizontal: '3%',
    marginBottom: '5%',
    marginTop: '2%',
  },
  checkBox: {
    marginTop: 4,
    transform: [{scaleX: 0.8}, {scaleY: 0.8}]
  },
  text1: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  line: {
    width: 1,
    height: '60%',
    backgroundColor: colors.kuDarkGray,
  },
  sortRadio: {
    flex: 1,
    alignItems:'center',
    marginBottom: 10,
  },
  radiobutton: {
    flexDirection: 'row',
    width: '51%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radiobuttonbox: {
    flex: 1,
  },
  radiobuttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  scroll: {

  },
  scrollRow: {
    height: 200,
    backgroundColor: colors.kuLightGray,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.kuDarkGray,
    marginVertical: 5,
  },
  text2: {
    marginLeft: 20,
    //alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  tableTouchBox: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    marginLeft: 20,
  },
  text3: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});