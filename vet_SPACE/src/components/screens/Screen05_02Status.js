import 'react-native-gesture-handler';
import * as React from 'react';

import {Text, View, StyleSheet, ScrollView} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Table, Row} from 'react-native-table-component';

import {colors} from '../../utils/Styles';

import DateSelectModal from '../modal/DateSelectModal2';
import ClassificationSelectModal from '../modal/ClassificationSelectModal';
import LocationSelectModal from '../modal/LocationSelectModal';

export default function StatusScreen() {
  const [dateSelectModal, setDateSelectModal] = React.useState(false);
  const [dateData, setDateData] = React.useState('선 택');
  const [dateStyle, setDateStyle] = React.useState(false);
  
  const [classificationSelectModal, setClassificationSelectModal] = React.useState(false);
  const [classificationData, setClassificationData] = React.useState('선 택');
  const [classificationStyle, setClassificationStyle] = React.useState(false);

  const [locationSelectModal, setLocationSelectModal] = React.useState(false);
  const [locationData, setLocationData] = React.useState('선 택');
  const [locationStyle, setLocationStyle] = React.useState(false);

  const toggleDateSelectModal =  () => {
    setDateSelectModal(prev => (!prev));
  };
  const dateHandler = (data) => {
    setDateData(data);
    toggleDateSelectModal();
    dateStyleChange();
  };
  const dateStyleChange = () => {
    setDateStyle(true);
  };
  
  const toggleClassificationSelectModal = () => {
    setClassificationSelectModal(prev => (!prev));
  };
  const classificationHandler = (data) => {
    setClassificationData(data);
    toggleClassificationSelectModal();
    classificationStyleChange();
  };
  const classificationStyleChange = () => {
    setClassificationStyle(true);
  };
  
  const toggleLocationSelectModal = () => {
    setLocationSelectModal(prev => (!prev));
  };
  const locationHandler = (data) => {
    setLocationData(data);
    toggleLocationSelectModal();
    locationStyleChange();
  };
  const locationStyleChange = () => {
    setLocationStyle(true);
  };

  const state = {
    tableTitle: ['2021년 03월 01일 // 207호 예약 내역'],
    widthArr: [370],
    divisionArr: ['시간', '내용'],
    widthArr2: [100,270],
    widthArr3: [100,270],
  };
  const timeTableData = [];
  for(let i = 0;i<14; i+=1){
    const rowData = [];
    const tmp = i+8;
    const tmp2 = i+9;
    if(tmp<10){
      tmp = '0'+tmp;
    }
    if(tmp2<10){
      tmp2 = '0'+tmp2;
    }
    rowData.push(tmp+'00~'+tmp2+'00');
    rowData.push(i);
    timeTableData.push(rowData);
  }
  return(
    <View style={statusStyle.container}>
      <View style={statusStyle.top}>
      </View>
      <View style={statusStyle.mid}>
        <View style={statusStyle.rowContainer}>
          <View style={statusStyle.TextContainer}>
            <Text style={statusStyle.Text}>날짜 :</Text>
          </View>
          <TouchableOpacity 
            style={statusStyle.SelectBox}
            onPress={() => toggleDateSelectModal()}
          >
            <Text style={
              dateStyle ?
              statusStyle.InboxSelectedText
              : statusStyle.InboxText
            }>{dateData}</Text>
          </TouchableOpacity>
        </View>
        <View style={statusStyle.rowContainer}>
          <View style={statusStyle.TextContainer}>
            <Text style={statusStyle.Text}>구분 :</Text>
          </View>
          <TouchableOpacity 
            style={statusStyle.SelectBox}
            onPress={()=>toggleClassificationSelectModal()}
          >
            <Text style={
              classificationStyle ?
              statusStyle.InboxSelectedText2
              : statusStyle.InboxText
            }>{classificationData}</Text>
          </TouchableOpacity>
        </View>
        <View style={statusStyle.rowContainer}>
          <View style={statusStyle.TextContainer}>
            <Text style={statusStyle.Text}>장소 :</Text>
          </View>
          <TouchableOpacity 
            style={statusStyle.SelectBox}
            onPress={()=>toggleLocationSelectModal()}
          >
            <Text style={
              locationStyle ? 
              statusStyle.InboxSelectedText3
              : statusStyle.InboxText
            }>{locationData}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={statusStyle.bot}>
        <View style={statusStyle.TimeSheet}>
          <Table borderStyle={statusStyle.Border}>
            <Row data={state.tableTitle} widthArr={state.widthArr} style={statusStyle.SheetTitle} textStyle={statusStyle.SheetTitleText}/>
          </Table>
          <Table borderStyle={statusStyle.Border}>
            <Row data={state.divisionArr} widthArr={state.widthArr2} style={statusStyle.SheetDivision} textStyle={statusStyle.SheetTitleText}/>
          </Table>
          <ScrollView style={statusStyle.Wrapper} persistentScrollbar={true}>
            <Table borderStyle={statusStyle.Border}>
              {
                timeTableData.map((rowData, index) => (
                  <Row
                    key={index}
                    data={rowData}
                    widthArr={state.widthArr3}
                    style={[statusStyle.ScrollRow]}
                    textStyle={statusStyle.SheetText}
                  />
                ))
              }
            </Table>
          </ScrollView>
        </View>
      </View>
      {dateSelectModal ? 
        <DateSelectModal 
          modalHandler={()=>toggleDateSelectModal()}
          dataHandler={(data)=>dateHandler(data)}
        /> 
        : <></>
      }
      {classificationSelectModal ?
        <ClassificationSelectModal
          modalHandler={()=>toggleClassificationSelectModal()}
          dataHandler={(data)=>classificationHandler(data)}
        /> 
        : <></>
      }
      {locationSelectModal ?
        <LocationSelectModal
          modalHandler={()=>toggleLocationSelectModal()}
          dataHandler={(data)=>locationHandler(data)}
          classificationdata={classificationData}
        /> 
        : <></>
      }
    </View>
  );
}

const statusStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    height: 20,
  },
  mid: {
    height: 240,
  },
  bot: {
    flex: 1,
    marginBottom: 40,
  },
  rowContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginLeft: '2%',
    marginTop: '5%',
  },
  TextContainer: {
    width: '30%',
  },
  Text: {
    fontSize: RFPercentage(5),
    fontWeight: 'bold',
  },
  SelectBox: {
    justifyContent: 'center',
    height: 40,
    width: 250,
    backgroundColor: colors.kuWhite,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.kuDarkGray,
  },
  InboxText: {
    alignSelf: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.kuDarkGray,
  },
  InboxSelectedText: {
    alignSelf: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.kuBlack,
  },
  InboxSelectedText2: {
    alignSelf: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.kuBlack,
  },
  InboxSelectedText3: {
    alignSelf: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.kuBlack,
  },

  TimeSheet: {
    flex: 5,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  Border: {
    borderWidth: 1,
    borderColor: colors.kuBlack,
  },
  SheetTitle: {
    justifyContent: 'center',
    height: 40,
    backgroundColor: colors.kuWarmGray,
  },
  SheetTitleText: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  SheetDivision:  {
    backgroundColor: colors.kuLightGray,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Wrapper: {
    //marginTop: -1,
  },
  ScrollRow: {
    height: 40,
    backgroundColor: colors.kuLightGray,
  },
  SheetText: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },

});