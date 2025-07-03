/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import MainContainer from '../../../components/MainContainer';
import Header2 from '../../../components/Header2';
import {images} from '../../../assets/images';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
  ROUTES,
} from '../../../utils';
import SVGXml from '../../../components/SVGXml';
import {colors} from '../../../assets/colors';
import svgIcons from '../../../assets/icons';
import Button from '../../../components/Button';
import {useNavigation} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';
import Toast from 'react-native-toast-message';
import DateTimePicker from './../../../../node_modules/@react-native-community/datetimepicker/src/datetimepicker';
import {createProfessionalProfile} from '../../../GlobalFunctions/auth';

const certificates = [
  {id: 1, certicateImg: images.certi1},
  {id: 2, certicateImg: images.certi2},
  {id: 3, certicateImg: images.certi3},
  {id: 4, certicateImg: images.certi4},
];

const days = [
  {id: 1, name: 'Mon', day: 'Monday', num: 1, isChecked: false},
  {id: 2, name: 'Tue', day: 'Tuesday', num: 2, isChecked: false},
  {id: 3, name: 'Wed', day: 'Wednesday', num: 3, isChecked: true},
  {id: 4, name: 'Thu', day: 'Thursday', num: 4, isChecked: false},
  {id: 5, name: 'Fri', day: 'Friday', num: 5, isChecked: false},
  {id: 6, name: 'Sat', day: 'Saturday', num: 6, isChecked: false},
  {id: 7, name: 'Sun', day: 'Sunday', num: 7, isChecked: false},
];

const formatTime = (date: Date) => {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};


const CreateProfessionalProfile = ({route}) => {
  const nav = useNavigation();
  const params = route?.params?.data;
  const [images, setImages] = useState([]);
  const [selectedDay, setSelectedDay] = useState([]);
  const [startTime, setStartTime] = useState(new Date());
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [endTime, setEndTime] = useState(new Date());
  const [endTimeshow, setEndTimeShow] = useState(false);

  const onChange = (event: any, selectedDate?: Date) => {
    setShow(Platform.OS === 'ios'); // keep open on iOS
    if (selectedDate) setStartTime(selectedDate);
  };


  const endTimeOnChange = (event: any, selectedDate?: Date) => {
    setEndTimeShow(Platform.OS === 'ios'); // keep open on iOS
    if (selectedDate) setEndTime(selectedDate);
  };

  const nextOnPress = async () => {
    // nav.navigate(ROUTES.MY_LOCATION)
    // console.log(params);
    setSelectedDay(prev =>
      prev.map(item => ({
        ...item,
        startTime: startTime?.toLocaleTimeString(),
        endTime: endTime?.toLocaleTimeString(),
      })),
    );
      setIsLoading(true);

    const res = await createProfessionalProfile({
      professionalProfileId: params?.professionalId,
      firstName: params?.profileData?.firstname,
      lastName: params?.profileData?.lastname,
      phoneNumber: params?.profileData?.number,
      address: params?.profileData?.address,
      type: params?.type,
      image: params?.professionalProfileImage?.uri,
      certificate: images,
      category: params?.services,
      workingDays: JSON.stringify(selectedDay),
      bio: params?.dataTwo?.bio,
    });

    if (res?.success) {
      nav.navigate(ROUTES.ADD_LOCATION, {professionalId: res?.data?._id});
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Profile Created Successfully',
      });
      setIsLoading(false);
    } else {
      Toast.show({
        type: 'error',
        text1: 'Create Profile failed',
        text2: res?.message,
      });
      setIsLoading(false);
    }
  };

  const times = [
    {id: 1, time: startTime?.toLocaleTimeString(), time2: 'AM'},
    {id: 2, time: endTime?.toLocaleTimeString(), time2: 'PM'},
  ];

  const pickImage = () => {
    launchImageLibrary({mediaType: 'photo', selectionLimit: 0}, response => {
      if (response.assets && response.assets.length > 0) {
        if (response?.assets.length <= 4) {
          setImages(response?.assets);
        } else {
          Toast.show({
            type: 'error',
            text1: 'Certificate Error',
            text2: 'You can select up to 4 certificates',
          });
        }
      }
    });
  };

    const toggleDay = (dayItem) => {
      setSelectedDay(prev => {
        const exists = prev.find(item => item.day === dayItem.day);
        if (exists) {
          return prev.filter(item => item.day !== dayItem.day);
        } else {
          return [...prev, { day: dayItem.day, isActive: true }];
        }
      });
    };

  // console.log(selectedDay)
  return (
    <MainContainer>
      <Header2
        headerText3=""
        hideCancel
        text={'Create Profile'}
        subHeading={'Enter your details to register yourself'}
      />

      <View style={{padding: responsiveHeight(2.5), paddingTop: 0}}>
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderStyle: 'dashed',
            borderColor: colors.gray,
            paddingVertical: responsiveHeight(4.5),
            alignItems: 'center',
            borderRadius: 10,
            justifyContent: 'center',
          }}
          onPress={() => pickImage()}>
          <SVGXml width={'35'} height={'35'} icon={svgIcons.upload2} />
          <Text
            style={{
              color: colors.gray,
              fontWeight: 'bold',
              fontSize: responsiveFontSize(2),
              marginTop: responsiveHeight(0.2),
            }}>
            Upload Certificates
          </Text>
        </TouchableOpacity>

        {!!images?.length && (
          <FlatList
            data={images}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{gap: 20, marginTop: responsiveHeight(2)}}
            renderItem={({item}) => {
              return (
                <View>
                  <Image
                    source={{uri: item?.uri}}
                    style={{
                      width: responsiveWidth(20),
                      height: responsiveHeight(8),
                      borderRadius: 10,
                    }}
                  />
                </View>
              );
            }}
          />
        )}

        <Text
          style={{
            color: colors.textColor2,
            marginTop: responsiveHeight(3),
            fontWeight: 'bold',
            fontSize: responsiveFontSize(2.5),
          }}>
          Operating Days & Hour
        </Text>

        <Text
          style={{
            color: colors.black,
            marginTop: responsiveHeight(2),
            fontSize: responsiveFontSize(2.3),
          }}>
          Including These Days
        </Text>

        <FlatList
          data={days}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            gap: 10,
            paddingVertical: responsiveWidth(2.5),
            paddingHorizontal: responsiveWidth(2),
            borderRadius: 10,
            borderWidth: 1,
            borderColor: colors.line_color,
            marginTop: responsiveHeight(2),
          }}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  borderRadius: 10,
                  paddingHorizontal: responsiveWidth(2.5),
                  paddingVertical: responsiveWidth(2.5),
                  backgroundColor: selectedDay.some(d => d.day === item.day)
                    ? colors.primary
                    : colors.secondary,
                }}
                onPress={() => toggleDay(item)}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(2),
                    color: selectedDay.some(d => d.day === item.day)
                      ? colors.secondary
                      : colors.gray,
                  }}>
                  {item.name}
                </Text>
                <Text
                  style={{
                    fontSize: responsiveFontSize(2),
                    color: selectedDay.some(d => d.day === item.day)
                      ? colors.secondary
                      : colors.black,
                  }}>
                  {item.num}
                </Text>
              </TouchableOpacity>
            );
          }}
        />

        <Text
          style={{
            color: colors.black,
            marginTop: responsiveHeight(2),
            fontSize: responsiveFontSize(2.3),
          }}>
          Time Range
        </Text>

        <FlatList
          data={times}
          contentContainerStyle={{
            marginTop: responsiveHeight(2),
            flex: 1,
            justifyContent: 'space-between',
          }}
          horizontal
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 10,
                  gap: 20,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: colors.line_color,
                }}
                onPress={() => {
                  if (item.id == 1) {
                    setShow(true);
                  } else {
                    setEndTimeShow(true);
                  }
                }}>
                <View
                  style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                  <SVGXml
                    width={'17'}
                    height={'17'}
                    icon={svgIcons.time_reverse}
                  />
                  <Text>{item.time}</Text>
                </View>
                <View
                  style={{flexDirection: 'row', alignItems: 'center', gap: 12}}>
                  <SVGXml
                    width={'14'}
                    height={'14'}
                    icon={svgIcons.fill_arrow_down}
                  />
                </View>
              </TouchableOpacity>
            );
          }}
        />

        {show && (
          <DateTimePicker
            value={startTime}
            mode="time"
            display="default"
            is24Hour={false}
            onChange={onChange}
          />
        )}

        {endTimeshow && (
          <DateTimePicker
            value={endTime}
            mode="time"
            display="default"
            is24Hour={false}
            onChange={endTimeOnChange}
          />
        )}

        <Button
          style={{marginTop: responsiveHeight(2), width: responsiveWidth(90)}}
          buttonText={'Next'}
          onPress={() => nextOnPress()}
          isLoading={isLoading}
        />
      </View>
    </MainContainer>
  );
};

export default CreateProfessionalProfile;
