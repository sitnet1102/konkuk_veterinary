import 'react-native-gesture-handler';
import * as React from 'react';

import {Text, View, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SliderBox} from 'react-native-image-slider-box';

import {colors} from '../../utils/Styles';
import {horizontalScale, verticalScale, moderateScale} from '../../utils/scailing';

import database from '@react-native-firebase/database';

import LocationSelectModal from '../modal/LocationSelectModal';

export default function RoomInfoDetailScreen({route}) {
  const [locationSelectModal, setLocationSelectModal] = React.useState(false);
  const [locationData, setLocationData] = React.useState('선 택');
  const [locationStyle, setLocationStyle] = React.useState(false);
  const [buildingData, setBuildingData] = React.useState('');
  const [roomData, setRoomData] = React.useState('');
  const [images, setImages] = React.useState([
    "https://firebasestorage.googleapis.com/v0/b/konkuk-vet-space.appspot.com/o/%E1%84%80%E1%85%A5%E1%86%AB%E1%84%80%E1%85%AE%E1%86%A8%E1%84%83%E1%85%A2%E1%84%92%E1%85%A1%E1%86%A8%E1%84%80%E1%85%AD%20%E1%84%85%E1%85%A9%E1%84%80%E1%85%A9.png?alt=media&token=94da33de-6cd7-4cbd-81d2-168ba9aaca72"
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
    d5: '* 전자칠판: ',
  };
  const [roomsort, setRoomsort] = React.useState(' ');
  const [opacity, setOpacity] = React.useState(' ');
  const [area, setArea] = React.useState(' ');

  const [equip1, setEquip1] = React.useState(' ');
  const [equip2, setEquip2] = React.useState(' ');
  const [equip3, setEquip3] = React.useState(' ');
  const [equip4, setEquip4] = React.useState(' ');
  const [equip5, setEquip5] = React.useState(' ');

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
        "https://firebasestorage.googleapis.com/v0/b/konkuk-vet-space.appspot.com/o/%E1%84%80%E1%85%A5%E1%86%AB%E1%84%80%E1%85%AE%E1%86%A8%E1%84%83%E1%85%A2%E1%84%92%E1%85%A1%E1%86%A8%E1%84%80%E1%85%AD%20%E1%84%85%E1%85%A9%E1%84%80%E1%85%A9.png?alt=media&token=94da33de-6cd7-4cbd-81d2-168ba9aaca72"
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
        setEquip5(' ');
      }else{
        setArea(snapshot.child('area').val());
        setRoomsort(snapshot.child('classification').val());
        setOpacity(snapshot.child('capacity').val());
        setEquip1(snapshot.child('equip1').val());
        setEquip2(snapshot.child('equip2').val());
        setEquip3(snapshot.child('equip3').val());
        setEquip4(snapshot.child('equip4').val());
        setEquip5(snapshot.child('equip5').val());
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
              roominfodetailStyle.InboxSelectedText
              : roominfodetailStyle.InboxText
            }>{locationData}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <SliderBox
          //ImageComponent={FastImage}
          images={images}
          sliderBoxHeight={verticalScale(260)}
          dotColor={colors.kuLightGreen}
          inactiveDotColor={colors.kuCoolGray}
          paginationBoxVerticalPadding={verticalScale(20)}
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
            paddingVertical: verticalScale(10)
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
            <View style={roominfodetailStyle.container3}>
              <Text style={roominfodetailStyle.text2}>{data2.d5}</Text>
              <Text style={roominfodetailStyle.text2}>{equip5+' 대'}</Text>
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
    marginBottom: verticalScale(20),
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
    fontSize: moderateScale(28),
    fontWeight: 'bold',
  },
  SelectBox: {
    justifyContent: 'center',
    height: verticalScale(40),
    width: horizontalScale(250),
    backgroundColor: colors.kuWhite,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.kuDarkGray,
  },
  InboxText: {
    alignSelf: 'center',
    fontSize: moderateScale(32),
    fontWeight: 'bold',
    color: colors.kuDarkGray,
  },
  InboxSelectedText: {
    alignSelf: 'center',
    fontSize: moderateScale(24),
    fontWeight: 'bold',
    color: colors.kuBlack,
  },
  bot: {
    height: verticalScale(400),
  },
  container1: {
    flex: 1,
    marginTop: verticalScale(20),
    marginBottom: verticalScale(50),
    marginHorizontal: horizontalScale(10),
    borderWidth: 1,
    borderColor: colors.kuDarkGray,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  container2: {
    marginVertical: verticalScale(20),
    marginHorizontal: horizontalScale(20),
  },
  container3: {
    marginTop: verticalScale(10),
    marginLeft: horizontalScale(10),
    flexDirection: 'row',
  },
  text1: {
    fontSize: moderateScale(32),
    fontWeight: 'bold',
    lineHeight: verticalScale(50),
  },
  text2: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    lineHeight: verticalScale(36),
  },
});