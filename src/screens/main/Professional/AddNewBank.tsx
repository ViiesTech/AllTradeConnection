import React from 'react';
import { View, Text } from 'react-native';
import MainContainer from '../../../components/MainContainer';
import Header2 from '../../../components/Header2';
import { AddNewBankFields, createProfileYourSelfProfileFields, responsiveHeight, responsiveWidth, ROUTES } from '../../../utils';
import Button from '../../../components/Button';
import CustomInputForm from '../../../components/InputField';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';

export const validationSchema = Yup.object().shape({
  bankname: Yup.string(),
  actittle: Yup.string(),
  accountnumber: Yup.string(),
});

const AddNewBank = () => {
    const nav = useNavigation();
  return (
    <MainContainer>
      <Header2 headerText3='' hideCancel text={'Add New Bank'} subHeading={''} />

    <View style={{padding: responsiveHeight(2.5), paddingTop: 0,}}>
    <CustomInputForm inputContainer={{width: responsiveWidth(90)}} buttonStyle={{width: responsiveWidth(90)}} inputStyle={{color: 'black'}} hideButton={true} inputContainerStyle={{marginTop: responsiveHeight(0)}} initialValues={{bankname: '1213213123',actittle: 'Plumbing',accountnumber: 'bio'}} validationSchema={validationSchema} buttonText='' fields={AddNewBankFields} />
    </View>

    <View style={{flex: 1, justifyContent: 'flex-end', paddingBottom: responsiveHeight(2)}}>
        <Button style={{ marginTop: responsiveHeight(3.5), width: responsiveWidth(90) }} onPress={() => nav.navigate(ROUTES.CONGRATULATION, {addNow: 'add_now'})} buttonText='Add Now' />}
    </View>
    </MainContainer>
  );
};

export default AddNewBank;