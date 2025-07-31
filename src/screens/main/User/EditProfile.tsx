/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Platform,
} from 'react-native';
import MainContainer from '../../../components/MainContainer';
import Header2 from '../../../components/Header2';
import {
  // editProfessionalProfileFields,
  editProfileFields,
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
  ROUTES,
} from '../../../utils';
import CustomInputForm from '../../../components/InputField';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {images} from '../../../assets/images';
import svgIcons from '../../../assets/icons';
import SVGXml from '../../../components/SVGXml';
import {colors} from '../../../assets/colors';
import Button from '../../../components/Button';
import {useSelector} from 'react-redux';
import {
  getUserProfileById,
  updateProfile,
} from '../../../GlobalFunctions/userMain';
import Toast from 'react-native-toast-message';
import * as Yup from 'yup';
import {baseUrl} from '../../../utils/api_content';
import {launchImageLibrary} from 'react-native-image-picker';
import ShowServicesModal from '../../../components/ShowServicesModal';
import {getAllServices} from '../../../GlobalFunctions/auth';
import DateTimePicker from '@react-native-community/datetimepicker';

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

interface editProfessionalProfileTypes {
  name: string;
  placeholder: string;
  keyboardType?: string;
  line: boolean;
  height?: number;
  multiline?: boolean;
  textAlign?: string;
  tags?: {id: number; title: string}[];
  dropdownIcon?: boolean;
  editable?: boolean;
  dropdownOnPress?: () => void;
}

const editValidationSchema = Yup.object().shape({
  fistname: Yup.string(),
  lastname: Yup.string(),
  number: Yup.number(),
  address: Yup.string(),
  bio: Yup.string(),
  state: Yup.string(),
  zipcode: Yup.number(),
});

const validationSchema = Yup.object().shape({
  fistname: Yup.string(),
  lastname: Yup.string(),
  number: Yup.number(),
  address: Yup.string(),
});

const EditProfile = ({route}) => {
  const nav = useNavigation();
  const userDetail = useSelector((state: RootState) => state.user);
  const [userProfile, setUserProfile] = useState({});
  const [profImg, setProfImg] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [allServices, setAllServices] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const openModal = useCallback(() => setModalVisible(true), []);
  const [selectedDay, setSelectedDay] = useState([]);
  const [show, setShow] = useState(false);
  const [startTime, setStartTime] = useState(new Date());
  const [getStartTimeAndEndTime, setGetStartTimeAndEndTime] = useState({startTime: '', endTime: ''});

  const [endTime, setEndTime] = useState(new Date());
  const [endTimeshow, setEndTimeShow] = useState(false);

  const editProfessionalProfileFields = useMemo<editProfessionalProfileTypes[]>(
    () => [
      {
        name: 'firstname',
        placeholder: 'john',
        line: true,
      },
      {
        name: 'lastname',
        placeholder: 'smith',
        line: true,
      },
      {
        name: 'number',
        placeholder: '03234234234',
        keyboardType: 'numeric',
        line: true,
      },
      {
        name: 'state',
        placeholder: 'California',
        keyboardType: 'text',
        line: true,
        dropdownIcon: false,
      },
      {
        name: 'zipcode',
        placeholder: '03234234234',
        keyboardType: 'numeric',
        line: true,
      },
      {
        name: 'select service',
        placeholder: 'service',
        keyboardType: 'text',
        line: true,
        dropdownIcon: true,
        editable: false,
        tags: [
          {id: 1, title: 'Plumbing'},
          {id: 2, title: 'Flooring'},
        ],
        dropdownOnPress: openModal,
      },
      {
        name: 'address',
        placeholder: 'Street No 4567892 Lorem ispum',
        keyboardType: 'text',
        line: true,
      },
      {
        name: 'bio',
        placeholder: 'Bio...',
        line: true,
        keyboardType: 'text',
        multiline: true,
        textAlign: 'top',
        height: responsiveHeight(15),
      },
    ],
    [openModal],
  );

  const onChange = (event: any, selectedDate?: Date) => {
    setShow(Platform.OS === 'ios'); // keep open on iOS
    if (selectedDate){
      setStartTime(selectedDate);
      setGetStartTimeAndEndTime(prev => ({...prev, startTime: ''}));
    }
  };

  const endTimeOnChange = (event: any, selectedDate?: Date) => {
    setEndTimeShow(Platform.OS === 'ios'); // keep open on iOS
    if (selectedDate){
      setEndTime(selectedDate);
      setGetStartTimeAndEndTime(prev => ({...prev, endTime: ''}));
    }
  };

  const times = [
    {id: 1, time: getStartTimeAndEndTime?.startTime ? getStartTimeAndEndTime?.startTime : startTime?.toLocaleTimeString(), time2: 'AM'},
    {id: 2, time: getStartTimeAndEndTime?.endTime ? getStartTimeAndEndTime?.endTime : endTime?.toLocaleTimeString(), time2: 'PM'},
  ];

  const getUserProfile = async () => {
    setIsLoading(true);
    const res = await getUserProfileById({
      token: userDetail?.token,
      userId: userDetail?.userData?._id,
      type: 'User',
    });

    if (res.success) {
      setUserProfile(res?.data);
      setIsLoading(false);
    } else {
      Toast.show({
        type: 'error',
        text1: 'Failed to fetch profile',
        text2: res?.message,
      });
      setIsLoading(false);
    }
  };

  const getProProfile = async () => {
    setIsLoading(true);
    const res = await getUserProfileById({
      token: userDetail?.token,
      userId: userDetail?.userData?._id,
      type: 'User',
    });

    if (res.success) {
      setUserProfile(res?.data);
      setIsLoading(false);
    } else {
      Toast.show({
        type: 'error',
        text1: 'Failed to fetch profile',
        text2: res?.message,
      });
      setIsLoading(false);
    }
  };

  const onSubmitHandler = async values => {
    // nav.navigate(ROUTES.PROFILE)
    if (
      userProfile.firstName === values.firstname &&
      userProfile.lastName === values.lastname &&
      userProfile.address === values.address &&
      userProfile.phoneNumber === values.number
    ) {
      return Toast.show({
        type: 'error',
        text1: 'Failed to update profile',
        text2: 'No changes detected',
      });
    }

    setIsUpdating(true);
    const res = await updateProfile({
      userId: userDetail?.userData?._id,
      firstName: values?.firstname,
      lastName: values?.lastname,
      address: values?.address,
      phoneNumber: values?.number,
      type: 'User',
    });

    if (res.success) {
      setUserProfile(res?.data);
      setIsUpdating(false);
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Profile Successfully Updated',
      });
    } else {
      Toast.show({
        type: 'error',
        text1: 'Failed to update profile',
        text2: res?.message,
      });
      setIsUpdating(false);
    }
  };

  const pickImage = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.assets && response.assets.length > 0) {
        if (response.assets && response.assets.length > 0) {
          setProfImg(response?.assets[0]);
        }
      }
    });
  };

  const toggleSelection = useCallback((id: number) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id],
    );
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (userDetail?.userData?.type === 'User') {
        getUserProfile();
      }

      if (userDetail?.userData?.type === 'Professional') {
        getProProfile();
        getServices();
      }
    }, [userDetail]),
  );

  const getServices = async () => {
    const res = await getAllServices();
    if (res?.success) {
      // console.log(typeof res)
      setAllServices(res.data);
    } else {
      Toast.show({
        type: 'error',
        text1: 'Failed to fetch services',
        text2: res?.message,
      });
    }
  };

  const toggleDay = dayItem => {
    setSelectedDay(prev => {
      const exists = prev.find(item => item.day === dayItem.day);
      if (exists) {
        return prev.filter(item => item.day !== dayItem.day);
      } else {
        return [...prev, {day: dayItem.day, isActive: true}];
      }
    });
  };

  const pickCertificates = () => {
    launchImageLibrary({mediaType: 'photo', selectionLimit: 0}, response => {
      if (response.assets && response.assets.length > 0) {
        if (response?.assets.length <= 4) {
          setNewImages(response?.assets);
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

  useEffect(() => {
    const id = userProfile?.category?.map(item => item._id);
    setGetStartTimeAndEndTime({startTime: userProfile?.startTime, endTime: userProfile?.endTime})
    setSelectedIds(id);
  }, [userProfile]);

  return (
    <MainContainer>
      <Header2
        headerText3=""
        hideCancel
        text={'Edit Profile'}
        subHeading={'Enter Your Details'}
      />

      <ShowServicesModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        data={allServices}
        toggleSelection={id => toggleSelection(id)}
        selectedIds={selectedIds}
      />

      <View style={{padding: responsiveHeight(2), paddingTop: 0}}>
        {userDetail?.userData?.type === 'User' &&
          (isLoading ? (
            <ActivityIndicator size={'large'} color={colors.primary} />
          ) : (
            <CustomInputForm
              inputContainer={{width: responsiveWidth(90)}}
              buttonStyle={{width: responsiveWidth(90)}}
              inputStyle={{color: 'black'}}
              inputContainerStyle={{marginTop: responsiveHeight(0)}}
              onSubmit={values => onSubmitHandler(values)}
              initialValues={{
                firstname: userProfile?.firstName,
                lastname: userProfile?.lastName,
                number: JSON.stringify(userProfile?.phoneNumber),
                address: userProfile?.address,
              }}
              validationSchema={validationSchema}
              isLoading={isUpdating}
              buttonText="Save"
              fields={editProfileFields}
            />
          ))}

        {userDetail?.userData?.type === 'Professional' &&
          (false ? (
            <ActivityIndicator size={'large'} color={colors.primary} />
          ) : (
            <View>
              <View style={styles.imageWrapper}>
                <View>
                  <Image
                    source={{
                      uri: profImg?.uri
                        ? profImg?.uri
                        : `${baseUrl}/${userProfile?.image}`,
                    }}
                    style={styles.imageStyle}
                  />
                  <TouchableOpacity
                    style={styles.uploadView}
                    onPress={() => pickImage()}>
                    <SVGXml icon={svgIcons.upload} width={'11'} />
                  </TouchableOpacity>
                </View>

                <View style={{marginTop: responsiveHeight(2)}}>
                  <CustomInputForm
                    hideButton={false}
                    childrenStyle={{flex: 1}}
                    inputContainer={{width: responsiveWidth(90)}}
                    buttonStyle={{width: responsiveWidth(90)}}
                    inputStyle={{color: 'black'}}
                    inputContainerStyle={{marginTop: responsiveHeight(3)}}
                    onSubmit={values => nav.navigate(ROUTES.PROFILE)}
                    initialValues={{
                      firstname: userProfile?.firstName,
                      lastname: userProfile?.lastName,
                      number: JSON.stringify(userProfile?.phoneNumber),
                      state: userProfile?.state,
                      zipcode: JSON.stringify(userProfile?.zipCode),
                      address: userProfile?.address,
                      bio: userProfile?.bio,
                    }}
                    validationSchema={editValidationSchema}
                    buttonText="Update"
                    fields={editProfessionalProfileFields}>
                    <View
                      style={{padding: responsiveHeight(0.7), paddingTop: 0}}>
                      <TouchableOpacity
                        onPress={() => pickCertificates()}
                        style={{
                          borderWidth: 1,
                          borderStyle: 'dashed',
                          borderColor: colors.gray,
                          paddingVertical: responsiveHeight(4.5),
                          alignItems: 'center',
                          borderRadius: 10,
                          justifyContent: 'center',
                        }}>
                        <SVGXml
                          width={'35'}
                          height={'35'}
                          icon={svgIcons.upload2}
                        />
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

                      <View>
                        <FlatList
                          data={newImages}
                          horizontal
                          showsHorizontalScrollIndicator={false}
                          contentContainerStyle={{
                            gap: 20,
                            marginTop: responsiveHeight(2),
                          }}
                          renderItem={({item}) => {
                            return (
                              <View>
                                <Image
                                  source={{uri: item?.uri}}
                                  style={{
                                    width: responsiveWidth(20),
                                    height: responsiveHeight(8),
                                  }}
                                />
                              </View>
                            );
                          }}
                        />
                      </View>

                      <Text
                        style={{
                          color: colors.black,
                          marginTop: responsiveHeight(2),
                          fontSize: responsiveFontSize(2.3),
                        }}>
                        Including These Days
                      </Text>

                      <View>
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
                                onPress={() => toggleDay(item)}
                                style={{
                                  alignItems: 'center',
                                  borderRadius: 10,
                                  paddingHorizontal: responsiveWidth(2.5),
                                  paddingVertical: responsiveWidth(2.5),
                                  backgroundColor: selectedDay.some(
                                    d => d.day === item.day,
                                  )
                                    ? colors.primary
                                    : colors.secondary,
                                }}>
                                <Text
                                  style={{
                                    fontSize: responsiveFontSize(2),
                                    color: selectedDay.some(
                                      d => d.day === item.day,
                                    )
                                      ? colors.secondary
                                      : colors.gray,
                                  }}>
                                  {item.name}
                                </Text>
                                <Text
                                  style={{
                                    fontSize: responsiveFontSize(2),
                                    color: selectedDay.some(
                                      d => d.day === item.day,
                                    )
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
                      </View>

                      <View>
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
                                onPress={() => {
                                  if (item.id == 1) {
                                    setShow(true);
                                  } else {
                                    setEndTimeShow(true);
                                  }
                                }}
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  padding: 10,
                                  gap: 20,
                                  borderRadius: 10,
                                  borderWidth: 1,
                                  borderColor: colors.line_color,
                                }}>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap: 10,
                                  }}>
                                  <SVGXml
                                    width={'17'}
                                    height={'17'}
                                    icon={svgIcons.time_reverse}
                                  />
                                  <Text>{item.time}</Text>
                                </View>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap: 12,
                                  }}>
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
                      </View>

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
                    </View>
                  </CustomInputForm>
                </View>
              </View>
            </View>
          ))}
      </View>
    </MainContainer>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  imageWrapper: {
    alignItems: 'center',
  },
  imageStyle: {
    height: responsiveHeight(15),
    width: responsiveWidth(30),
    borderRadius: 10,
  },
  uploadView: {
    borderWidth: 1,
    height: responsiveHeight(4),
    width: responsiveHeight(4),
    position: 'absolute',
    backgroundColor: colors.secondary,
    bottom: responsiveHeight(-1),
    right: 0,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.dark_purple,
  },
});
