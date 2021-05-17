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
    1. 이미지 선택시 오류가 생길 수도 있음 -> 추후 수정 
    2. 이미지 크기 고정이면 좋을것 같음 1024x768 -> 상관없음 
    3. 강의실이 선택되지 않았을 때에 어떤식으로 할 것인지 고려해야함 
   */
  const [locationSelectModal, setLocationSelectModal] = React.useState(false);
  const [locationData, setLocationData] = React.useState('선 택');
  const [locationStyle, setLocationStyle] = React.useState(false);
  const [buildingData, setBuildingData] = React.useState('');
  const [roomData, setRoomData] = React.useState('');
  const [images, setImages] = React.useState([
    "https://firebasestorage.googleapis.com/v0/b/konkuk-vet-space.appspot.com/o/%E1%84%80%E1%85%A5%E1%86%AB%E1%84%80%E1%85%AE%E1%86%A8%E1%84%83%E1%85%A2%E1%84%92%E1%85%A1%E1%86%A8%E1%84%80%E1%85%AD%20%E1%84%85%E1%85%A9%E1%84%80%E1%85%A9.png?alt=media&token=c376dfbf-5b5f-48db-866f-74e614c5a3b9",
  ]);

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
  };
  const locationStyleChange = () => {
    setLocationStyle(true);
  };

  let imageData = (room) => {
    database().ref('/Pic_link/'+route.params.data+'/'+room).on('value', snapshot => {
    if(snapshot.val() === null){
      setImages([
        "https://firebasestorage.googleapis.com/v0/b/konkuk-vet-space.appspot.com/o/%E1%84%80%E1%85%A5%E1%86%AB%E1%84%80%E1%85%AE%E1%86%A8%E1%84%83%E1%85%A2%E1%84%92%E1%85%A1%E1%86%A8%E1%84%80%E1%85%AD%20%E1%84%85%E1%85%A9%E1%84%80%E1%85%A9.png?alt=media&token=c376dfbf-5b5f-48db-866f-74e614c5a3b9",
      ])
    }else{
      setImages(snapshot.val());
      //console.log(snapshot.val());
    }
  })};

  React.useEffect(() => {
    return () => database().ref().off('value', imageData);
  }, []);

/**
  <a href="https://ibb.co/Y7qC2wh">
  <img src="https://i.ibb.co/7J6fvLK/Kakao-Talk-Photo-2021-04-01-16-40-29.jpg" 
  alt="Kakao-Talk-Photo-2021-04-01-16-40-29" border="0"></a>
  <a href="https://ibb.co/s1PhGYq">
  <img src="https://i.ibb.co/GMJXLSR/Kakao-Talk-Photo-2021-04-01-16-40-42.jpg" 
  alt="Kakao-Talk-Photo-2021-04-01-16-40-42" border="0"></a>
 */
  /*
  const images = [
    //"https://source.unsplash.com/1024x768/?nature",
    //"https://source.unsplash.com/1024x768/?tree",
    //"https://source.unsplash.com/1024x768/?water",
    //"https://source.unsplash.com/1024x768/?girl",
    //"https://ifh.cc/g/vxZzuu.jpg",
    //"https://ifh.cc/g/iL9x8G.jpg",
    //"https://i.ibb.co/7J6fvLK/Kakao-Talk-Photo-2021-04-01-16-40-29.jpg",
    //"https://i.ibb.co/GMJXLSR/Kakao-Talk-Photo-2021-04-01-16-40-42.jpg",
    "https://firebasestorage.googleapis.com/v0/b/konkuk-vet-space.appspot.com/o/place01.jpeg?alt=media&token=5c4022a1-590a-4d8a-acda-c4b5a00f2a09",
    "https://firebasestorage.googleapis.com/v0/b/konkuk-vet-space.appspot.com/o/place02.jpeg?alt=media&token=d2a772f1-4e9b-4865-86ef-bd0da5bd2484",
    "https://firebasestorage.googleapis.com/v0/b/konkuk-vet-space.appspot.com/o/%E1%84%80%E1%85%A1%E1%86%BC%E1%84%8B%E1%85%B4%E1%84%89%E1%85%B5%E1%86%AF%20207%E1%84%92%E1%85%A9%20(1).jpg?alt=media&token=3d8ce242-588c-4d31-8882-fc5af2f3c58d",
    //"https://firebasestorage.googleapis.com/v0/b/konkuk-vet-space.appspot.com/o/%E1%84%80%E1%85%A1%E1%86%BC%E1%84%8B%E1%85%B4%E1%84%89%E1%85%B5%E1%86%AF%20207%E1%84%92%E1%85%A9%20(1).jpg?alt=media&token=3d8ce242-588c-4d31-8882-fc5af2f3c58d",
    "https://firebasestorage.googleapis.com/v0/b/konkuk-vet-space.appspot.com/o/%E1%84%80%E1%85%A1%E1%86%BC%E1%84%8B%E1%85%B4%E1%84%89%E1%85%B5%E1%86%AF%20207%E1%84%92%E1%85%A9%20(2).jpg?alt=media&token=3382e933-177b-4c4c-822d-7b110ff385ef",
    "https://firebasestorage.googleapis.com/v0/b/konkuk-vet-space.appspot.com/o/%E1%84%80%E1%85%A1%E1%86%BC%E1%84%8B%E1%85%B4%E1%84%89%E1%85%B5%E1%86%AF%20207%E1%84%92%E1%85%A9%20(3).jpg?alt=media&token=53fcc659-274c-421c-bc8c-630007961424",
    "https://firebasestorage.googleapis.com/v0/b/konkuk-vet-space.appspot.com/o/%E1%84%80%E1%85%A1%E1%86%BC%E1%84%8B%E1%85%B4%E1%84%89%E1%85%B5%E1%86%AF%20207%E1%84%92%E1%85%A9%20(4).jpg?alt=media&token=9ab0b35c-d1f7-4737-b48e-ed856a045769",
    "https://firebasestorage.googleapis.com/v0/b/konkuk-vet-space.appspot.com/o/dfsoeul_20160617_192932.jpeg?alt=media&token=bdbc893e-75fe-48c3-992f-25c5e44287f1",
    "https://firebasestorage.googleapis.com/v0/b/konkuk-vet-space.appspot.com/o/%E1%84%80%E1%85%A5%E1%86%AB%E1%84%80%E1%85%AE%E1%86%A8%E1%84%83%E1%85%A2%E1%84%92%E1%85%A1%E1%86%A8%E1%84%80%E1%85%AD%20%E1%84%85%E1%85%A9%E1%84%80%E1%85%A9.png?alt=media&token=c376dfbf-5b5f-48db-866f-74e614c5a3b9",

  ];
  */
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