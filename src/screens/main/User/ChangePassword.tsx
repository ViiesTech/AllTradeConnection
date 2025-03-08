import React from 'react';
import { View, Text } from 'react-native';
import MainContainer from '../../../components/MainContainer';
import Header2 from '../../../components/Header2';
import { myLocationFields, responsiveHeight, responsiveWidth, validationSchema } from '../../../utils';
import CustomInputForm from '../../../components/InputField';
import { useNavigation } from '@react-navigation/native';

const ChangePassword = () => {
    const nav = useNavigation();
    
  return (
    <MainContainer>
    <Header2 headerText3='' hideCancel text={'Change Password'} subHeading={'Please change password'} />

        <View style={{padding: responsiveHeight(2), paddingTop: 0}}>
        <CustomInputForm inputContainer={{width: responsiveWidth(90)}} buttonStyle={{width: responsiveWidth(90)}} inputStyle={{color: 'black'}} inputContainerStyle={{marginTop: responsiveHeight(0)}} onSubmit={(values) => nav.navigate(ROUTES.SElECT_SERVICE_ADDINAL)} initialValues={{oldpassword: 'Now York',appartment: 'Apartment/Suite#', city: 'Now York', zipCode: '5245242432'}} validationSchema={validationSchema} buttonText='Save' fields={myLocationFields} />
        </View>
    </MainContainer>
  )
}

export default ChangePassword