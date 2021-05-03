import 'react-native-gesture-handler';
import * as React from 'react';

import {Text, View, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { RFPercentage} from "react-native-responsive-fontsize";
import {SliderBox} from 'react-native-image-slider-box';

import {colors} from '../../utils/Styles';

import LocationSelectModal from '../modal/LocationSelectModal2';

export default function RoomInfoDetailScreen() {
  /**
    1. 이미지 선택시 오류가 생길 수도 있음 -> 추후 수정 
    2. 이미지 크기 고정이면 좋을것 같음 1024x768
    3. 강의실이 선택되지 않았을 때에 어떤식으로 할 것인지 고려해야함 
   */
  const [locationSelectModal, setLocationSelectModal] = React.useState(false);
  const [locationData, setLocationData] = React.useState('선 택');
  const [locationStyle, setLocationStyle] = React.useState(false);

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
/**
  <a href="https://ibb.co/Y7qC2wh">
  <img src="https://i.ibb.co/7J6fvLK/Kakao-Talk-Photo-2021-04-01-16-40-29.jpg" 
  alt="Kakao-Talk-Photo-2021-04-01-16-40-29" border="0"></a>
  <a href="https://ibb.co/s1PhGYq">
  <img src="https://i.ibb.co/GMJXLSR/Kakao-Talk-Photo-2021-04-01-16-40-42.jpg" 
  alt="Kakao-Talk-Photo-2021-04-01-16-40-42" border="0"></a>
 */
  const images = [
    //"https://source.unsplash.com/1024x768/?nature",
    //"https://source.unsplash.com/1024x768/?tree",
    //"https://source.unsplash.com/1024x768/?water",
    //"https://source.unsplash.com/1024x768/?girl",
    //"https://ifh.cc/g/vxZzuu.jpg",
    //"https://ifh.cc/g/iL9x8G.jpg",
    "https://i.ibb.co/7J6fvLK/Kakao-Talk-Photo-2021-04-01-16-40-29.jpg",
    "https://i.ibb.co/GMJXLSR/Kakao-Talk-Photo-2021-04-01-16-40-42.jpg",
  ];
  const data1 = {
    title: ['호실정보'],
    d1: ['* 분류: '],
    d2: ['* 수용인원: '],
    d3: ['* 전용면적: '],
    d1_roomsort: ['강의실'],
    d2_opacity: ['80명'],
    d3_area: ['120m^2'],
  };
  const data2 = {
    title: ['기자재 현황'],
    d1: ['* 빔프로젝터: '],
    d2: ['* 컴퓨터/전자교탁: '],
    d3: ['* 강의용 TV: '],
    d4: ['* 에어컨: '],
    d1_: ['1대'],
    d2_: ['1대'],
    d3_: ['4대'],
    d4_: ['천장형 2대'],
  };

  return(
    <View style={roominfodetailStyle.container}>
      <View style={roominfodetailStyle.top}>
        <View style={roominfodetailStyle.topContainer}>
          <View style={roominfodetailStyle.TextContainer}>
            <Text style={roominfodetailStyle.Text}>강의실 :</Text>
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
          //onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
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
              <Text style={roominfodetailStyle.text2}>{data1.d1_roomsort}</Text>
            </View>
            <View style={roominfodetailStyle.container3}>
              <Text style={roominfodetailStyle.text2}>{data1.d2}</Text>
              <Text style={roominfodetailStyle.text2}>{data1.d2_opacity}</Text>
            </View>
            <View style={roominfodetailStyle.container3}>
              <Text style={roominfodetailStyle.text2}>{data1.d3}</Text>
              <Text style={roominfodetailStyle.text2}>{data1.d3_area}</Text>
            </View>
          </View>
          <View style={roominfodetailStyle.container2}>
            <Text style={roominfodetailStyle.text1}>
              {data2.title}
            </Text>
            <View style={roominfodetailStyle.container3}>
              <Text style={roominfodetailStyle.text2}>{data2.d1}</Text>
              <Text style={roominfodetailStyle.text2}>{data2.d1_}</Text>
            </View>
            <View style={roominfodetailStyle.container3}>
              <Text style={roominfodetailStyle.text2}>{data2.d2}</Text>
              <Text style={roominfodetailStyle.text2}>{data2.d2_}</Text>
            </View>
            <View style={roominfodetailStyle.container3}>
              <Text style={roominfodetailStyle.text2}>{data2.d3}</Text>
              <Text style={roominfodetailStyle.text2}>{data2.d3_}</Text>
            </View>
            <View style={roominfodetailStyle.container3}>
              <Text style={roominfodetailStyle.text2}>{data2.d4}</Text>
              <Text style={roominfodetailStyle.text2}>{data2.d4_}</Text>
            </View>
          </View>
        </View>
      </View>
      {locationSelectModal ?
        <LocationSelectModal
          modalHandler={()=>toggleLocationSelectModal()}
          dataHandler={(data)=>locationHandler(data)}
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
    fontSize: 30,
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