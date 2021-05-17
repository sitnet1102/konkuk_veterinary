import 'react-native-gesture-handler';
import * as React from 'react';

import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Table, Row} from 'react-native-table-component';
import { colors } from '../../utils/Styles';
import { RFPercentage } from 'react-native-responsive-fontsize';

import PurposeSelectModal from '../modal/PurposeSelectModal';
import ProfSelectModal from '../modal/ProfSelectModal';

export default function RoomReservDetailScreen({route, navigation}){
  //const {dateData, classData, locaData, startTimeData, endTimeData} = route.params;
  const __name = '홍길동'
  const __phone = '010-1234-5678'
  //const __time = '1200 ~ 1400'
  //const __purpose = '선 택'
  //const __prof = '선 택'
  const __time = route.params.data.startTimeData + " ~ " + route.params.data.endTimeData;

  const state = {
    tableIndex: [
      ['신청자'],
      ['연락처'],
      ['시 간'],
      ['목 적'],
      ['담당교수'],
    ],
    widthArr: [
      '100%'
    ],
    tabledata: [
      [__name],
      [__phone],
      [__time],
      //[__purpose],
      //[__prof],
    ],
  }

  const [purposeSelectModal, setPurposeSelectModal] = React.useState(false);
  const [purposeData, setPurposeData] = React.useState('선 택');
  const [purposeStyle, setPurposeStyle] = React.useState(false);

  const [profSelectModal, setProfSelectModal] = React.useState(false);
  const [profData, setProfData] = React.useState('선 택');
  const [profStyle, setProfStyle] = React.useState(false);

  const togglePurposeSelectModal =  () => {
    setPurposeSelectModal(prev => (!prev));
  };
  const purposeHandler = (data) => {
    setPurposeData(data);
    togglePurposeSelectModal();
    purposeStyleChange();
  };
  const purposeStyleChange = () => {
    setPurposeStyle(true);
  };


  const toggleProfSelectModal =  () => {
    setProfSelectModal(prev => (!prev));
  };
  const profHandler = (data) => {
    setProfData(data);
    toggleProfSelectModal();
    profStyleChange();
  };
  const profStyleChange = () => {
    setProfStyle(true);
  };

  return (
    <View style={detailStyle.container}>
      <View style={detailStyle.Top}>
        <Text style={detailStyle.TitleText}>
          세부사항입력
        </Text>
      </View>
      <View style={detailStyle.Mid}>
        <View style={detailStyle.midContainer}>
          <View style={detailStyle.container1}>
            <Table>
              {
                state.tableIndex.map((rowData, index) => (
                  <Row
                    key={index}
                    data={rowData}
                    widthArr={state.widthArr}
                    style={[detailStyle.table1]}
                    textStyle={detailStyle.text1}
                  />
                ))
              }
            </Table>
          </View>
          <View style={detailStyle.line}></View>
          <View style={detailStyle.container2}>
            <Text style={detailStyle.text2}>{__name}</Text>
            <Text style={detailStyle.text2}>{__phone}</Text>
            <Text style={detailStyle.text2}>{__time}</Text>
            <TouchableOpacity
              onPress={()=>togglePurposeSelectModal()}
              >
              <Text style={
                purposeStyle ?
                detailStyle.selectedText3
                : detailStyle.text3
              }>{purposeData}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={()=>toggleProfSelectModal()}
            >
              <Text style={
                profStyle ?
                detailStyle.selectedText3
                : detailStyle.text3
              }>{profData}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={detailStyle.Bot}>
        <TouchableOpacity 
          disabled={!(purposeStyle && profStyle)}
          style={
            purposeStyle && profStyle ?
            detailStyle.ActivedNextButton
            : detailStyle.NextButton
          }
          onPress={() => navigation.navigate('Complete', {
            data: {
              /**
                데이터 더 안넘기고 여기서 저장 처리해주기 
                저장 처리 시에 alert로 저장 확인 한번 더 해주기 
               */
              dateData: route.params.data.dateData,
              classData: route.params.data.classData,
              //locaData: route.params.data.locaData,
              buildingData: route.params.data.buildingData,
              roomData: route.params.data.roomData,
              startTimeData: route.params.data.startTimeData,
              endTimeData: route.params.data.endTimeData,
              purposeData: purposeData,
              profData: profData,
            }
          })}
        >
          <Text style={detailStyle.NextText}>제출하기</Text>
        </TouchableOpacity>
      </View>
      {purposeSelectModal ? 
        <PurposeSelectModal 
          modalHandler={()=>togglePurposeSelectModal()}
          dataHandler={(data)=>purposeHandler(data)}
        /> 
        : <></>
      }
      {profSelectModal ? 
        <ProfSelectModal 
          modalHandler={()=>toggleProfSelectModal()}
          dataHandler={(data)=>profHandler(data)}
        /> 
        : <></>
      }
    </View>
  );
}

const detailStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  Top: {
    flex: 2,
    justifyContent: 'center',
  },
  Mid: {
    flex: 6,
  },
  Bot: {
    //flex: 2,
    height: 130,
    justifyContent: 'center',
  },
  TitleText: {
    alignSelf: 'center',
    fontSize: 48,
    fontWeight: 'bold',
  },
  midContainer: {
    height: 360,
    flexDirection: 'row',
    marginHorizontal: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.kuDarkGray,
  },
  container1: {
    flex: 3,
    marginRight: 15,
  },
  container2: {
    flex: 5,
    marginLeft: 15,
  },
  line: {
    width: 1,
    marginVertical: 20,
    backgroundColor: colors.kuDarkGray,
  },
  text1: {
    fontSize: RFPercentage(3.2),
    fontWeight: 'bold',
    alignSelf: 'flex-end',
    lineHeight: 70,
  },
  text2: {
    fontSize: RFPercentage(3),
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    lineHeight: 70,
  },
  text3: {
    color: colors.kuDarkGray,
    fontSize: RFPercentage(3),
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    textDecorationLine: 'underline',
    lineHeight: 70,
  },
  selectedText3: {
    color: colors.kuBlack,
    fontSize: RFPercentage(3),
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    textDecorationLine: 'underline',
    lineHeight: 70,
  },
  tableTouchBox: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    marginLeft: 20,
    backgroundColor: colors.kuBlue,
  },

  NextButton: {
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: colors.kuDarkGreen,
    width: '70%',
    //height: '60%',
    height: 50,
    opacity: 0.5,
    borderWidth: 1,
    borderRadius: 5,
  }, 
  ActivedNextButton: {
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: colors.kuDarkGreen,
    width: '70%',
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
  }, 
  NextText: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.kuWhite,
  },
});