import React from 'react';
import { View, Text } from 'react-native';
import MainContainer from '../../../components/MainContainer';
import Header2 from '../../../components/Header2';
import { myLocationFields, responsiveHeight, responsiveWidth, ROUTES } from '../../../utils';
import MapCom from '../../../components/MapCom';
import Button from '../../../components/Button';
import CustomInputForm from '../../../components/InputField';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  address: Yup.string()
  .required('Address is required'), 
  appartment: Yup.string().required('Appartment is required'),
  city: Yup.string().required('City is required'),
  zipCode: Yup.string().required('Zip Code is required'),
});

const MyLocation = () => {
      const nav = useNavigation();
  return (
    <MainContainer>
      <Header2 headerText3='' hideCancel text='My Location' subHeading={''} />

        <View style={{padding: responsiveHeight(2.5), paddingTop: 0}}>
            <MapCom isShowDirection={true} />
        <CustomInputForm inputContainer={{width: responsiveWidth(90)}} buttonStyle={{width: responsiveWidth(90)}} inputStyle={{color: 'black'}} inputContainerStyle={{marginTop: responsiveHeight(0)}} onSubmit={(values) => nav.navigate(ROUTES.POST_LOCATION_JOB)} initialValues={{address: 'Now York',appartment: 'Apartment/Suite#', city: 'Now York', zipCode: '5245242432'}} validationSchema={validationSchema} buttonText='Next' fields={myLocationFields} />

          {/* <Button  style={{marginTop: responsiveHeight(2), width: responsiveWidth(90)}} buttonText={'Next'} onPress={() => {}} /> */}
        </View>
    </MainContainer>
  )
}

export default MyLocation