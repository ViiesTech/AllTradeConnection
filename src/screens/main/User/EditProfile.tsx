import React from 'react';
import { View, Text } from 'react-native';
import MainContainer from '../../../components/MainContainer';
import Header2 from '../../../components/Header2';
import { editProfileFields, myLocationFields, responsiveHeight, responsiveWidth, ROUTES } from '../../../utils';
import CustomInputForm from '../../../components/InputField';
import { useNavigation } from '@react-navigation/native';

const EditProfile = () => {
    const nav = useNavigation();
  return (
    <MainContainer>
        <Header2 headerText3='' hideCancel text={'Edit Profile'} subHeading={'Enter Your Details'} />

        <View style={{padding: responsiveHeight(2), paddingTop: 0}}>
        <CustomInputForm inputContainer={{width: responsiveWidth(90)}} buttonStyle={{width: responsiveWidth(90)}} inputStyle={{color: 'black'}} inputContainerStyle={{marginTop: responsiveHeight(0)}} onSubmit={(values) => nav.navigate(ROUTES.PROFILE)} initialValues={{fullname: 'Now York',phonenumber: 'Apartment/Suite#', bio: 'Now York',}} validationSchema={{}} buttonText='Save' fields={editProfileFields} />
        </View>
    </MainContainer>
  );
};

export default EditProfile;