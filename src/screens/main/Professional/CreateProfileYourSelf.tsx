import React from 'react';
import { View, Text } from 'react-native';
import MainContainer from '../../../components/MainContainer';
import Header2 from '../../../components/Header2';
import CustomInputForm from '../../../components/InputField';
import { createProfileYourSelfProfileFields, responsiveHeight, responsiveWidth, ROUTES } from '../../../utils';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  selectservice: Yup.string(),
  postalcode: Yup.string(),
  bio: Yup.string(),
});

const CreateProfileYourSelf = () => {
    const nav = useNavigation()
  return (
    <MainContainer>
      <Header2 headerText3='' hideCancel text={'Create Profile'} subHeading={'Enter your details to register yourself'} />

    <View>
    <CustomInputForm inputContainer={{width: responsiveWidth(90)}} buttonStyle={{width: responsiveWidth(90)}} inputStyle={{color: 'black'}} inputContainerStyle={{marginTop: responsiveHeight(0)}} onSubmit={(values) => nav.navigate(ROUTES.SELECT_GENDER)} initialValues={{postalcode: '1213213123',selectservice: 'Plumbing',bio: 'bio'}} validationSchema={validationSchema} buttonText='Next' fields={createProfileYourSelfProfileFields} />
    </View>
    </MainContainer>
  )
}

export default CreateProfileYourSelf;