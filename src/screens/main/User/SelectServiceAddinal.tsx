import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import MainContainer from '../../../components/MainContainer';
import Header2 from '../../../components/Header2';
import * as Yup from 'yup';
import { responsiveHeight, responsiveWidth, ROUTES, selectServiceAddionalFields } from '../../../utils';
import CustomInputForm from '../../../components/InputField';
import StartAndEndtimeInput from '../../../components/StartAndEndtimeInput';
import CheckBoxText from '../../../components/CheckBoxText';
import Button from '../../../components/Button';

const validationSchema = Yup.object().shape({
  address: Yup.string()
  .required('Address is required'), 
  appartment: Yup.string().required('Appartment is required'),
  city: Yup.string().required('City is required'),
  zipCode: Yup.string().required('Zip Code is required'),
});

const SelectServiceAddinal = () => {
        const nav = useNavigation();
        const [isProfessional,setIsProfessional] = useState<Boolean>(false);
        const [isPrevProfessional,setIsPrevProfessional] = useState<Boolean>(false);

  return (
    <MainContainer >
      <Header2 headerText3='Select A Service' hideCancel text='Post A Job' subHeading={'Enter your details'} />

              <View style={{padding: responsiveHeight(2.5), paddingTop: 0}}>
                <View style={{alignItems: 'center'}}>
              <CustomInputForm hideTags={isProfessional || isPrevProfessional} inputContainer={{width: responsiveWidth(90)}}  buttonStyle={{width: responsiveWidth(90)}} inputStyle={{color: 'black'}} inputContainerStyle={{marginTop: responsiveHeight(0), alignItems: 'flex-start'}} onSubmit={(values) => nav.navigate(ROUTES.SElECT_SERVICE_ADDINAL)} hideButton={true} initialValues={{address: 'Now York',appartment: 'Apartment/Suite#', city: 'Now York', zipCode: '5245242432'}} validationSchema={validationSchema} fields={selectServiceAddionalFields} />
                </View>
              <StartAndEndtimeInput />

              <View style={{flexDirection: 'row', width: responsiveWidth(90), justifyContent: 'space-between'}}>
                <View style={{width: responsiveWidth(40)}}>
              <CheckBoxText isChecked={isProfessional} text={'New Professional'} onPress={() => setIsProfessional(!isProfessional)} />
                </View>
                <View style={{width: responsiveWidth(45)}}>
              <CheckBoxText isChecked={isPrevProfessional} text={'Previous Professional'} onPress={() => setIsPrevProfessional(!isPrevProfessional)} />
                </View>
              </View>

         {isProfessional || isPrevProfessional ? <Button  style={{marginTop: responsiveHeight(2), width: responsiveWidth(90)}} buttonText={'Next'} onPress={() => nav.navigate(ROUTES.CONGRATULATION)} /> : null}
      </View>
    </MainContainer>
  )
}

export default SelectServiceAddinal