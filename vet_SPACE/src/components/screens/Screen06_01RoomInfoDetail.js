import 'react-native-gesture-handler';
import * as React from 'react';

import {Text, View, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { RFPercentage} from "react-native-responsive-fontsize";
import {SliderBox} from 'react-native-image-slider-box';

import {colors} from '../../utils/Styles';

import database from '@react-native-firebase/database';

import LocationSelectModal from '../modal/LocationSelectModal';

export default function RoomInfoDetailScreen({route}) {
  /**
    //1. 이미지 선택시 오류가 생길 수도 있음 -> 추후 수정 
    //2. 이미지 크기 고정이면 좋을것 같음 1024x768 -> 상관없음 
    //3. 강의실이 선택되지 않았을 때에 어떤식으로 할 것인지 고려해야함 
   */
  const [locationSelectModal, setLocationSelectModal] = React.useState(false);
  const [locationData, setLocationData] = React.useState('선 택');
  const [locationStyle, setLocationStyle] = React.useState(false);
  const [buildingData, setBuildingData] = React.useState('');
  const [roomData, setRoomData] = React.useState('');
  const [images, setImages] = React.useState([
    "http://drive.google.com/uc?export=view&id=1fyr8wFS-UQNVT_tOCv_SoF7gDDYbdtue"
  ]);
  const data1 = {
    title: '호실정보',
    d1: '* 분류: ',
    d2: '* 수용인원: ',
    d3: '* 전용면적: ',
  };
  const data2 = {
    title: '기자재 현황',
    d1: '* 빔프로젝터: ',
    d2: '* 컴퓨터/전자교탁: ',
    d3: '* 강의용 TV: ',
    d4: '* 에어컨: ',
  };
  const [roomsort, setRoomsort] = React.useState(' ');
  const [opacity, setOpacity] = React.useState(' ');
  const [area, setArea] = React.useState(' ');

  const [equip1, setEquip1] = React.useState(' ');
  const [equip2, setEquip2] = React.useState(' ');
  const [equip3, setEquip3] = React.useState(' ');
  const [equip4, setEquip4] = React.useState(' ');

  const toggleLocationSelectModal = () => {
    setLocationSelectModal(prev => (!prev));
  };
  const locationHandler = (building, room) => {
    setLocationData(building + '/' + room);
    setBuildingData(building);
    setRoomData(room);
    toggleLocationSelectModal();
    locationStyleChange();
    imageData(room);
    detailData(building, room);
  };
  const locationStyleChange = () => {
    setLocationStyle(true);
  };

  let imageData = (room) => {
    database().ref('/Pic_link/'+route.params.data+'/'+room).on('value', snapshot => {
    if(snapshot.val() === null){
      setImages([
        "http://drive.google.com/uc?export=view&id=1fyr8wFS-UQNVT_tOCv_SoF7gDDYbdtue"
      ])
    }else{
      setImages(snapshot.val());
    }
  })};

  let detailData = (building, room) => {
    database().ref('/Room_info/Detail/'+route.params.data+'/'+building+'/'+room).on('value', snapshot => {
      if(snapshot.val() === null){
        setArea(' ');
        setRoomsort(' ');
        setOpacity(' ');
        setEquip1(' ');
        setEquip2(' ');
        setEquip3(' ');
        setEquip4(' ');
      }else{
        setArea(snapshot.child('area').val());
        setRoomsort(snapshot.child('classification').val());
        setOpacity(snapshot.child('capacity').val());
        setEquip1(snapshot.child('equip1').val());
        setEquip2(snapshot.child('equip2').val());
        setEquip3(snapshot.child('equip3').val());
        setEquip4(snapshot.child('equip4').val());
      }
    })
  };

  React.useEffect(() => {
    return () => database().ref().off('value', imageData);
  }, []);

  

  return(
    <View style={roominfodetailStyle.container}>
      <View style={roominfodetailStyle.top}>
        <View style={roominfodetailStyle.topContainer}>
          <View style={roominfodetailStyle.TextContainer}>
            <Text style={roominfodetailStyle.Text}>{route.params.data + " : "}</Text>
          </View>
          <TouchableOpacity 
            style={roominfodetailStyle.SelectBox}
            onPress={()=>toggleLocationSelectModal()}
          >
            <Text style={
              locationStyle ? 
              roominfodetailStyle.InboxSelectedText3
              : roominfodetailStyle.InboxText
            }>{locationData}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={roominfodetailStyle.mid}>
        <SliderBox
          //ImageComponent={FastImage}
          images={images}
          sliderBoxHeight={RFPercentage(30)}
          dotColor={colors.kuLightGreen}
          inactiveDotColor={colors.kuCoolGray}
          paginationBoxVerticalPadding={20}
          //autoplay
          circleLoop
          resizeMethod={'resize'}
          resizeMode={'cover'}
          paginationBoxStyle={{
            position: "absolute",
            bottom: 0,
            padding: 0,
            alignItems: "center",
            alignSelf: "center",
            justifyContent: "center",
            paddingVertical: 10
          }}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 0,
            padding: 0,
            margin: 0,
            backgroundColor: "rgba(128, 128, 128, 0.92)"
          }}
          ImageComponentStyle={{borderRadius: 15, width: '97%', marginTop: 5}}
          imageLoadingColor={colors.kuDarkGreen}
        />
      </View>
      <View style={roominfodetailStyle.bot}>
        <View style={roominfodetailStyle.container1}>
          <View style={roominfodetailStyle.container2}>
            <Text style={roominfodetailStyle.text1}>
              {data1.title}
            </Text>
            <View style={roominfodetailStyle.container3}>
              <Text style={roominfodetailStyle.text2}>{data1.d1}</Text>
              <Text style={roominfodetailStyle.text2}>{roomsort}</Text>
            </View>
            <View style={roominfodetailStyle.container3}>
              <Text style={roominfodetailStyle.text2}>{data1.d2}</Text>
              <Text style={roominfodetailStyle.text2}>{opacity+' 명'}</Text>
            </View>
            <View style={roominfodetailStyle.container3}>
              <Text style={roominfodetailStyle.text2}>{data1.d3}</Text>
              <Text style={roominfodetailStyle.text2}>{area+' ㎡'}</Text>
            </View>
          </View>
          <View style={roominfodetailStyle.container2}>
            <Text style={roominfodetailStyle.text1}>
              {data2.title}
            </Text>
            <View style={roominfodetailStyle.container3}>
              <Text style={roominfodetailStyle.text2}>{data2.d1}</Text>
              <Text style={roominfodetailStyle.text2}>{equip1+' 대'}</Text>
            </View>
            <View style={roominfodetailStyle.container3}>
              <Text style={roominfodetailStyle.text2}>{data2.d2}</Text>
              <Text style={roominfodetailStyle.text2}>{equip2+' 대'}</Text>
            </View>
            <View style={roominfodetailStyle.container3}>
              <Text style={roominfodetailStyle.text2}>{data2.d3}</Text>
              <Text style={roominfodetailStyle.text2}>{equip3+' 대'}</Text>
            </View>
            <View style={roominfodetailStyle.container3}>
              <Text style={roominfodetailStyle.text2}>{data2.d4}</Text>
              <Text style={roominfodetailStyle.text2}>{equip4+' 대'}</Text>
            </View>
          </View>
        </View>
      </View>
      {locationSelectModal ?
        <LocationSelectModal
          modalHandler={()=>toggleLocationSelectModal()}
          dataHandler={(building, room)=>locationHandler(building, room)}
          classificationdata={route.params.data}
        /> 
        : <></>
      }
    </View>
  );
}

const roominfodetailStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    height: RFPercentage(12),
  },
  mid: {
  },
  bot: {
    height: RFPercentage(50),
  },
  topContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginLeft: '2%',
    marginTop: '7%',
  },
  TextContainer: {
    width: '30%',
  },
  Text: {
    //fontSize: RFPercentage(3.5),
    fontSize: 28,
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
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.kuDarkGray,
  },
  InboxSelectedText3: {
    alignSelf: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.kuBlack,
  },
  container1: {
    flex: 1,
    marginTop: 20,
    marginBottom: 50,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: colors.kuDarkGray,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  container2: {
    marginVertical: 20,
    marginHorizontal: 20,
  },
  text1: {
    fontSize: RFPercentage(4),
    fontWeight: 'bold',
    lineHeight: 40,
  },
  text2: {
    fontSize: RFPercentage(2),
    fontWeight: 'bold',
    lineHeight: 30,
  },
  container3: {
    marginTop: 15,
    marginLeft: 10,
    flexDirection: 'row',
  },
});