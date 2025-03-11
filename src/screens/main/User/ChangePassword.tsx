import React from 'react';
import { View, Text } from 'react-native';
import MainContainer from '../../../components/MainContainer';
import Header2 from '../../../components/Header2';
import { changePasswordFields, myLocationFields, responsiveHeight, responsiveWidth, ROUTES } from '../../../utils';
import CustomInputForm from '../../../components/InputField';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  oldpassword: Yup.string(), 
  newpassword: Yup.string(),
  confirmpassword: Yup.string(),
});

const ChangePassword = () => {
    const nav = useNavigation();
    
  return (
    <MainContainer>
    <Header2 headerText3='' hideCancel text={'Change Password'} subHeading={'Please change password'} />

        <View style={{padding: responsiveHeight(2), paddingTop: 0}}>
        <CustomInputForm inputContainer={{width: responsiveWidth(90)}} buttonStyle={{width: responsiveWidth(90)}} inputStyle={{color: 'black'}} inputContainerStyle={{marginTop: responsiveHeight(0)}} onSubmit={(values) => nav.navigate(ROUTES.CONGRATULATION, {changePassword: 'Change_pasword_success'})} initialValues={{oldpassword: 'Now York',newpassword: 'Apartment/Suite#', confirmpassword: 'Now York',}} validationSchema={validationSchema} buttonText='Save' fields={changePasswordFields} />
        </View>
    </MainContainer>
  )
}

export default ChangePassword