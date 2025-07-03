import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Container from '../../components/Container';
import AuthHeader from '../../components/AuthHeader';
import {images} from '../../assets/images';
import {
  createProfileFields,
  responsiveHeight,
  responsiveWidth,
  ROUTES,
} from '../../utils';
import {colors} from '../../assets/colors';
import SVGXml from '../../components/SVGXml';
import svgIcons from '../../assets/icons';
import CustomInputForm from '../../components/InputField';
import * as Yup from 'yup';
import {useNavigation} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';
import {createProfile} from '../../GlobalFunctions/auth';
import Toast from 'react-native-toast-message';

const validationSchema = Yup.object().shape({
  firstname: Yup.string()
    .min(2, 'Full name must be at least 2 characters')
    .max(50, 'Full name must not exceed 50 characters')
    .required(),
  lastname: Yup.string()
    .min(2, 'Full name must be at least 2 characters')
    .max(50, 'Full name must not exceed 50 characters')
    .required(),
  number: Yup.string()
    .matches(/^\d+$/, 'Contact number must contain only digits')
    .min(10, 'Contact number must be at least 10 digits')
    .max(15, 'Contact number must not exceed 15 digits')
    .required(),
  address: Yup.string()
    .max(200, 'Address must not exceed 200 characters')
    .required(),
});

const CreateProfile = ({route}) => {
  const nav = useNavigation();
  const id = route?.params?.userId;
  const type = route?.params?.type;
  const [profImg, setProfImg] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateProfile = async values => {
    if (!isLoading && profImg) {
      setIsLoading(true);
      const res = await createProfile({
        id: id,
        firstName: values?.lastname,
        lastName: values?.lastname,
        phoneNumber: values?.number,
        address: values?.address,
        type: type,
        image: profImg?.uri,
      });
      if (res?.success) {
        nav.navigate(ROUTES.ADD_LOCATION, {userId: res?.data?._id});
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
    }
  };

  const handleCreateProfessionalProfile = values => {
    if (profImg) {
      nav.navigate(ROUTES.CREATE_PROFILE_YOURSELF, {
        profileData: values,
        professionalId: id,
        type: type,
        image: profImg,
      });
    } else {
      Toast.show({
        type: 'error',
        text1: 'Profile not submitted.',
        text2: 'Please upload a profile image.',
      });
    }
  };

  const pickImage = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.assets && response.assets.length > 0) {
        setProfImg({
          uri: response.assets?.[0]?.uri,
          name: response.assets?.[0]?.fileName,
          type: response.assets?.[0]?.type || 'image/jpeg',
        });
      }
    });
  };

  return (
    <Container>
      <AuthHeader text="Create Profile" desc="Please enter your details" />
      <View style={styles.imageWrapper}>
        <View>
          <Image
            source={profImg ? {uri: profImg?.uri} : images.exp1}
            style={styles.imageStyle}
          />
          <TouchableOpacity
            style={styles.uploadView}
            onPress={() => pickImage()}>
            <SVGXml icon={svgIcons.upload} width={'11'} />
          </TouchableOpacity>
        </View>
      </View>
      <CustomInputForm
        inputContainerStyle={{marginTop: responsiveHeight(3)}}
        onSubmit={values => {
          if (type === 'User') {
            handleCreateProfile(values);
          } else {
            handleCreateProfessionalProfile(values);
          }
        }}
        initialValues={{firstname: '', lastname: '', number: '', address: ''}}
        validationSchema={validationSchema}
        buttonText="Continue"
        isLoading={isLoading}
        fields={createProfileFields}
      />
    </Container>
  );
};

export default CreateProfile;

const styles = StyleSheet.create({
  imageWrapper: {
    alignItems: 'center',
    paddingTop: responsiveHeight(3),
  },
  imageStyle: {
    height: responsiveWidth(30),
    width: responsiveWidth(30),
    borderRadius: 100,
  },
  uploadView: {
    borderWidth: 1,
    height: responsiveHeight(4),
    width: responsiveHeight(4),
    position: 'absolute',
    backgroundColor: colors.secondary,
    bottom: responsiveHeight(-1),
    left: responsiveHeight(10),
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.dark_purple,
  },
});
