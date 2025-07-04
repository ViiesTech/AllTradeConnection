import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../../components/Container';
import AuthHeader from '../../components/AuthHeader';
import CustomInputForm from '../../components/InputField';
import * as Yup from 'yup';
import {
  locationBottomFields,
  locationData,
  locationField,
  responsiveHeight,
  responsiveWidth,
  ROUTES,
} from '../../utils';
import {images} from '../../assets/images';
import {colors} from '../../assets/colors';
import SVGXml from '../../components/SVGXml';
import svgIcons from '../../assets/icons';
import LocationCard from '../../components/LocationCard';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {createLocation} from '../../GlobalFunctions/auth';
import { useDispatch } from 'react-redux';
import { clearToken } from '../../redux/Slices';

const locationValidationSchema = Yup.object().shape({
  location: Yup.string()
    .required('Location is required')
    .min(2, 'Location must be at least 2 characters long')
    .max(100, 'Location must not exceed 100 characters')
    .matches(
      /^[a-zA-Z0-9\s,.'-]+$/,
      "Location can only contain letters, numbers, and special characters (,.'-)",
    ),
});

const locationBottomFieldsSchema = Yup.object().shape({
  locationname: Yup.string().required('Location is required'),
  address: Yup.string().required('Location is required'),
  zipcode: Yup.string().required('Location is required'),
  city: Yup.string().required('Location is required'),
  state: Yup.string().required('Location is required'),
});

const AddLocation = ({route}) => {
  const userId = route?.params?.userId;
  const professionalId = route?.params?.professionalId;
  const nav = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const onSaveLocation = async (values: string) => {
    // nav.navigate(ROUTES.AUTH_INTRO)
    if (!isLoading) {
      setIsLoading(true);
      const res = await createLocation({
        userProfileId: userId || null,
        proProfileId: professionalId || null,
        locationName: values?.locationname,
        address: values?.address,
        longitude: 17.4065,
        latitude: 78.477,
        state: values?.state,
        zipCode: values?.zipcode,
        city: values?.city,
      });
      
      if (res?.success) {
        nav.navigate(ROUTES.AUTH_INTRO);
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Location Added Successfully',
        });
        setIsLoading(false);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Failed to add location',
          text2: res?.message,
        });
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    dispatch(clearToken());
  }, []);

  return (
    <Container style={{paddingBottom: responsiveHeight(2.5)}}>
      <AuthHeader contentStyle={{paddingTop: 0}} />
      <CustomInputForm
        inputContainerStyle={{padding: 0}}
        childrenStyle={{marginBottom: responsiveHeight(3)}}
        // onSubmit={values => onSaveLocation(values)}
        buttonText="Add Now"
        hideButton={true}
        fields={locationField}
        validationSchema={locationValidationSchema}
        initialValues={{location: 'Search Locations'}}>
        <View>
          <Image source={images.map} style={styles.mapStyle} />
          <TouchableOpacity style={styles.locationCard}>
            <SVGXml icon={svgIcons.gps} />
          </TouchableOpacity>
        </View>
        {/* {locationData.map(item => (
          <LocationCard
            cardStyle={{
              marginTop: responsiveHeight(2),
              marginBottom: responsiveHeight(2),
            }}
            text={item.text}
            heading={item.heading}
          />
        ))} */}

        <CustomInputForm
          inputContainerStyle={{padding: 0, marginTop: responsiveHeight(2)}}
          childrenStyle={{marginBottom: responsiveHeight(3)}}
          onSubmit={values => onSaveLocation(values)}
          buttonText="Add Now"
          fields={locationBottomFields}
          isLoading={isLoading}
          validationSchema={locationBottomFieldsSchema}
          initialValues={{
            locationname: '',
            address: '',
            zipcode: '',
            state: '',
            city: '',
          }}
        />
      </CustomInputForm>
    </Container>
  );
};

export default AddLocation;

const styles = StyleSheet.create({
  mapStyle: {
    height: responsiveHeight(40),
    borderRadius: 10,
    width: responsiveWidth(80),
  },
  locationCard: {
    backgroundColor: colors.primary,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 15,
    right: 15,
    height: responsiveHeight(5),
    width: responsiveHeight(5),
    borderRadius: 5,
  },
});
