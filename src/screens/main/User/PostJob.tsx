import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import MainContainer from '../../../components/MainContainer';
import Header2 from '../../../components/Header2';
import {
  editProjectCityFields,
  editProjectFields,
  editProjectSerivceSecFields,
  editProjectZipCodFields,
  postJobFields,
  PostJobImages,
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

const PostJob = ({route}: any) => {
  const nav = useNavigation();
  const screen = route?.params?.screen;
  const [profImg, setProfImg] = useState([]);

  const pickImage = () => {
    launchImageLibrary({mediaType: 'photo', selectionLimit: 0}, response => {
      if (response.assets && response.assets.length > 0) {
        setProfImg(response.assets);
      }
    });
  };

  console.log(profImg);
  return (
    <MainContainer>
      <Header2
        headerText3="Who Are You"
        hideCancel
        text={screen === 'Edit Project' ? screen : 'Post A Job'}
        subHeading={'Enter Your Details'}
      />
      <View style={styles.subContainer}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          {!!profImg.length &&
            profImg.map(item => (
              <View>
                <Image
                  resizeMode="contain"
                  style={styles.imageStyle}
                  source={{uri: item?.uri}}
                />
                <TouchableOpacity style={styles.crossView}>
                  <SVGXml width={'40'} height={'40'} icon={svgIcons.cross} />
                </TouchableOpacity>
              </View>
            ))}
        </View>
        <TouchableOpacity style={styles.uploadView} onPress={() => pickImage()}>
          <SVGXml width={'35'} height={'35'} icon={svgIcons.upload2} />
          <Text style={styles.uploadText}>Upload Your File</Text>
        </TouchableOpacity>

        <CustomInputForm
          hideButton={screen === 'Edit Project' ? true : false}
          onSubmit={values => nav.navigate(ROUTES.POST_LOCATION_JOB)}
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
              hideButton={true}
              inputContainer={{width: responsiveWidth(90)}}
              buttonStyle={{width: responsiveWidth(90)}}
              inputContainerStyle={{marginTop: responsiveHeight(3)}}
              initialValues={{
                address: 'Street no 120 lorem ispum',
                apartment: 'Apartment/Suite#',
              }}
              validationSchema={validationSchema}
              fields={editProjectFields}
            />
            <View style={{marginTop: responsiveHeight(-4)}}>
              <CustomInputForm
                dropdownIcon={true}
                hideButton={true}
                inputContainer={{width: responsiveWidth(90)}}
                buttonStyle={{width: responsiveWidth(90)}}
                inputContainerStyle={{marginTop: responsiveHeight(3)}}
                initialValues={{city: 'Now York', state: 'California'}}
                validationSchema={validationSchema}
                fields={editProjectCityFields}
              />
            </View>

            <View style={{marginTop: responsiveHeight(-4)}}>
              <CustomInputForm
                hideButton={true}
                inputContainer={{width: responsiveWidth(90)}}
                buttonStyle={{width: responsiveWidth(90)}}
                inputContainerStyle={{marginTop: responsiveHeight(3)}}
                initialValues={{zipCode: '12432432'}}
                validationSchema={validationSchema}
                fields={editProjectZipCodFields}
              />
            </View>

            <Text
              style={{
                fontSize: responsiveFontSize(3),
                marginBottom: responsiveHeight(4),
                color: colors.dark_purple,
                fontWeight: 'bold',
              }}>
              Select A Service
            </Text>
            <View style={{marginTop: responsiveHeight(-4)}}>
              <CustomInputForm
                hideButton={true}
                inputContainer={{width: responsiveWidth(90)}}
                buttonStyle={{width: responsiveWidth(90)}}
                inputContainerStyle={{marginTop: responsiveHeight(3)}}
                initialValues={{zipCode: '12432432'}}
                validationSchema={validationSchema}
                fields={editProjectSerivceSecFields}
              />
            </View>

            <StartAndEndtimeInput />

            <Button
              style={{
                marginTop: responsiveHeight(2),
                width: responsiveWidth(90),
              }}
              buttonText={'Update'}
              onPress={() => nav.navigate(ROUTES.MY_LOCATION)}
            />
          </View>
        ) : null}
      </View>
    </MainContainer>
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
