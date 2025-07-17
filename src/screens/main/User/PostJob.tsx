/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MainContainer from '../../../components/MainContainer';
import Header2 from '../../../components/Header2';
import {
  postJobFields,
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
  ROUTES,
} from '../../../utils';
import {colors} from '../../../assets/colors';
import SVGXml from '../../../components/SVGXml';
import svgIcons from '../../../assets/icons';
import CustomInputForm from '../../../components/InputField';
import * as Yup from 'yup';
import {useNavigation} from '@react-navigation/native';
import StartAndEndtimeInput from '../../../components/StartAndEndtimeInput';
import Button from '../../../components/Button';
import {launchImageLibrary} from 'react-native-image-picker';
import {useFormikContext} from 'formik';
import Toast from 'react-native-toast-message';
import {getProjectById, getUserAllProjects, updateProject} from '../../../GlobalFunctions/userMain';
import moment from 'moment';
import {baseUrl} from '../../../utils/api_content';
import DateTimePicker from '@react-native-community/datetimepicker/src/datetimepicker';
import {useSelector} from 'react-redux';

const validationSchema = Yup.object().shape({
  fullname: Yup.string()
    .min(2, 'Full name must be at least 2 characters')
    .max(50, 'Full name must not exceed 50 characters')
    .required('Full name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  number: Yup.string()
    .matches(/^\d+$/, 'Contact number must contain only digits')
    .min(10, 'Contact number must be at least 10 digits')
    .max(15, 'Contact number must not exceed 15 digits')
    .required('Phone number is required'),
});

const EditValidationSchema = Yup.object().shape({
  fullname: Yup.string()
    .min(2, 'Full name must be at least 2 characters')
    .max(50, 'Full name must not exceed 50 characters')
    .required('Full name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  number: Yup.string()
    .matches(/^\d+$/, 'Contact number must contain only digits')
    .min(10, 'Contact number must be at least 10 digits')
    .max(15, 'Contact number must not exceed 15 digits')
    .required('Phone number is required'),
});

const PostJob = ({route}: any) => {
  const nav = useNavigation();
  const screen = route?.params?.screen;
  const projectId = route?.params?.projectId;
  const [profImg, setProfImg] = useState([]);
  const [apiImages, setApiImages] = useState([]);
  const [getProjectDetails, setGetProjectDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [date, setDate] = useState<any>(new Date());
  const [startTime, setStartTime] = useState<any>(new Date());
  const [getStartTime, setGetStartTime] = useState<any>(new Date());
  const [endTime, setEndTime] = useState<any>(new Date());
  const [getEndTime, setGetEndTime] = useState<any>(new Date());
  const [openStartTimePicker, setOpenStartTimePicker] = useState(false);
  const [openEndTimePicker, setOpenEndTimePicker] = useState(false);
  const [additional, setAdditional] = useState('');
  const userDetail = useSelector((state: RootState) => state.user);

  const openDate = useCallback(() => setOpenDatePicker(true), []);
  const formik = useFormikContext();

  const editProjectFields = useMemo(
    () => [
      {
        name: 'fullname',
        placeholder: 'Name',
        line: true,
      },
      {
        name: 'email',
        placeholder: 'Email',
        keyboardType: 'email-address',
        line: true,
      },
      {
        name: 'number',
        placeholder: 'Phone Number',
        keyboardType: 'numeric',
        line: true,
      },
      {
        name: 'address',
        placeholder: 'Street no 120 lorem ispum',
        line: true,
      },
      {
        name: 'apartment',
        placeholder: 'Apartment/Suite#',
        keyboardType: 'default',
        line: true,
      },
      {
        name: 'city',
        placeholder: 'New York',
        line: true,
      },
      // {
      //   name: 'state',
      //   placeholder: 'California',
      //   keyboardType: 'default',
      //   line: true,
      // },
      {
        name: 'zipcode',
        placeholder: '12242354235',
        line: true,
      },
      {
        name: 'price',
        placeholder: 'price',
        keyboardType: 'numeric',
        line: true,
      },
      {
        name: 'date',
        placeholder: 'date',
        keyboardType: 'time',
        line: true,
        dropdownIcon: true,
        dropdownOnPress: openDate,
      },
    ],
    [openDate],
  );

  const pickImage = () => {
    launchImageLibrary({mediaType: 'photo', selectionLimit: 0}, response => {
      if (response.assets && response.assets.length > 0) {
        if (response.assets && response.assets.length > 0) {
          setProfImg(prev => [...prev, ...response.assets]);
        }
      }
    });
  };

  const updateOnPressHandler = async values => {
    setIsUpdating(true);
    const res = await updateProject({
      id: projectId,
      email: values?.email,
      phoneNumber: values?.number,
      fullName: values?.fullname,
      selectDate: moment(date).format('YYYY-MM-DD'),
      image: profImg,
      startTime: moment(startTime).format('hh:mm A'),
      endTime: moment(endTime).format('hh:mm A'),
      price: values?.price,
      address: values?.address,
      appartmentNo: values?.apartment,
      locationName: 'Alaska, United States',
      longitude: -153.369141,
      latitude: 66.160507,
      // state:null,
      additionalNote: additional,
      city: values?.city,
      zipCode: values?.zipcode,
      apiImages: apiImages,
    });


    if (res?.success) {
      nav.navigate(ROUTES.MAIN_STACK);
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Project Updated Successfully',
      });
      setIsUpdating(false);
      getUserAllProjects({token: userDetail?.token})
    } else {
      Toast.show({
        type: 'error',
        text1: 'Update Project failed',
        text2: res?.message,
      });
      setIsUpdating(false);
    }
  };

  const startTimeOnChange = (event: any, selectedDate?: Date) => {
    if (event.type === 'set' && selectedDate) {
      setGetStartTime('');
      setStartTime(selectedDate);
      setOpenStartTimePicker(false);
    }
    setOpenStartTimePicker(false);
  };

  const endTimeOnChange = (event: any, selectedDate?: Date) => {
    if (event.type === 'set' && selectedDate) {
      setGetEndTime('');
      setEndTime(selectedDate);
      setOpenEndTimePicker(false);
    }
    setOpenEndTimePicker(false);
  };

  const nextOnPressHandler = values => {
    const data = {
      values,
      images: profImg,
    };
    nav.navigate(ROUTES.POST_LOCATION_JOB, {data});
  };

  const dateOnChange = (event: any, selectedDate?: Date) => {
    if (event.type === 'set' && selectedDate) {
      setDate(selectedDate);
      setOpenDatePicker(false);
    }
    setOpenDatePicker(false);
  };

  const getProject = async projectId => {
    setIsLoading(true);
    const res = await getProjectById({projectId: projectId});
    if (res?.success) {
      setGetProjectDetails(res.data);
      setIsLoading(false);
    } else {
      Toast.show({
        type: 'error',
        text1: 'Failed to fetch values',
        text2: res?.message,
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (screen === 'Edit Project') {
      getProject(projectId);
    }
  }, [projectId, screen]);

  useEffect(() => {
    if (getProjectDetails) {
      setApiImages(getProjectDetails?.images || []);
      setAdditional(getProjectDetails?.additionalNote);
      if (getProjectDetails?.startTime) {
        const parsedStart = moment(getProjectDetails.startTime, [
          'hh:mm A',
          'HH:mm',
        ]).toDate();
        setStartTime(parsedStart);
      } else {
        setStartTime(new Date());
      }

      // Check and parse end time
      if (getProjectDetails?.endTime) {
        const parsedEnd = moment(getProjectDetails.endTime, [
          'hh:mm A',
          'HH:mm',
        ]).toDate();
        setEndTime(parsedEnd);
      } else {
        setEndTime(new Date());
      }
    }
  }, [getProjectDetails]);

  return (
    <>
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={'large'} color={colors.primary} />
        </View>
      ) : (
        <MainContainer>
          <Header2
            headerText3="Who Are You"
            hideCancel
            text={screen === 'Edit Project' ? screen : 'Post A Job'}
            subHeading={'Enter Your Details'}
          />
          <View style={styles.subContainer}>
            <ScrollView
              horizontal
              style={{flex: 1}}
              contentContainerStyle={{
                flexDirection: 'row',
                gap: 20,
              }}>
              {[...apiImages, ...profImg].map(item => (
                <View>
                  <Image
                    // resizeMode="contain"
                    style={styles.imageStyle}
                    source={
                      item?.uri ? {uri: item?.uri} : {uri: `${baseUrl}/${item}`}
                    }
                  />
                  <TouchableOpacity
                    style={styles.crossView}
                    onPress={() => {
                      typeof item === 'string'
                        ? setApiImages(prev => prev.filter(i => i !== item))
                        : setProfImg(prev =>
                            prev.filter(i => i.uri !== item.uri),
                          );
                    }}>
                    <SVGXml width={'40'} height={'40'} icon={svgIcons.cross} />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={styles.uploadView}
              onPress={() => pickImage()}>
              <SVGXml width={'35'} height={'35'} icon={svgIcons.upload2} />
              <Text style={styles.uploadText}>Upload Your File</Text>
            </TouchableOpacity>

            {screen === 'Edit Project' ? null : (
              <CustomInputForm
                onSubmit={values => nextOnPressHandler(values)}
                inputContainer={{width: responsiveWidth(90)}}
                buttonStyle={{width: responsiveWidth(90)}}
                inputContainerStyle={{marginTop: responsiveHeight(3)}}
                initialValues={{
                  fullname: 'Name',
                  email: 'loremipsum@gmail.com',
                  number: '02302402910',
                }}
                validationSchema={validationSchema}
                buttonText="Next"
                fields={postJobFields}
              />
            )}

            {screen === 'Edit Project' && (
              <View style={{height: responsiveHeight(2)}} />
            )}

            {openDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                is24Hour={false}
                onChange={dateOnChange}
              />
            )}

            {screen === 'Edit Project' ? (
              <View>
                <Text
                  style={{
                    fontSize: responsiveFontSize(3),
                    color: colors.dark_purple,
                    fontWeight: 'bold',
                  }}>
                  Your Home
                </Text>
                <CustomInputForm
                  inputContainer={{width: responsiveWidth(90)}}
                  buttonStyle={{width: responsiveWidth(90)}}
                  inputContainerStyle={{marginTop: responsiveHeight(3)}}
                  isLoading={isUpdating}
                  onSubmit={values => updateOnPressHandler(values)}
                  initialValues={{
                    fullname: getProjectDetails?.fullName,
                    email: getProjectDetails?.email,
                    number: JSON.stringify(getProjectDetails?.phoneNumber),
                    address: getProjectDetails?.address,
                    apartment: getProjectDetails?.appartmentNo,
                    city: getProjectDetails?.city,
                    zipcode: getProjectDetails?.zipCode,
                    price: JSON.stringify(getProjectDetails?.price),
                    date: moment(getProjectDetails?.selectDate).format(
                      'YYYY-MM-DD',
                    ),
                  }}
                  childrenStyle={{flex: 1}}
                  buttonText="Update"
                  validationSchema={EditValidationSchema}
                  fields={editProjectFields}>
                  <StartAndEndtimeInput
                    startTime={startTime}
                    endTime={endTime}
                    openStartTimePicker={openStartTimePicker}
                    setOpenStartTimePicker={setOpenStartTimePicker}
                    openEndTimePicker={openEndTimePicker}
                    setOpenEndTimePicker={setOpenEndTimePicker}
                    startTimeOnChange={startTimeOnChange}
                    endTimeOnChange={endTimeOnChange}
                    additional={additional}
                    setAdditional={setAdditional}
                    getProjectDetails={getProjectDetails}
                    getStartTime={getStartTime}
                    getEndTime={getEndTime}
                  />
                </CustomInputForm>
              </View>
            ) : null}
          </View>
        </MainContainer>
      )}
    </>
  );
};

export default PostJob;

const styles = StyleSheet.create({
  subContainer: {
    padding: responsiveHeight(2.5),
  },
  imageStyle: {
    height: responsiveHeight(16),
    borderRadius: 10,
    width: responsiveWidth(42),
  },
  uploadView: {
    borderWidth: 1,
    borderStyle: 'dashed',
    marginTop: responsiveHeight(3),
    borderColor: colors.black,
    paddingVertical: responsiveHeight(4.5),
    alignItems: 'center',
    borderRadius: 10,
    justifyContent: 'center',
  },
  uploadText: {
    color: colors.black,
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2),
    marginTop: responsiveHeight(0.2),
  },
  crossView: {
    backgroundColor: colors.primary,
    height: responsiveHeight(4),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: responsiveHeight(14.5),
    top: 10,
    width: responsiveHeight(4),
    borderRadius: 100,
  },
});
