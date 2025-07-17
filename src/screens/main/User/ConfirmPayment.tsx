/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text} from 'react-native';
import MainContainer from '../../../components/MainContainer';
import Header2 from '../../../components/Header2';
import {
  confirmPaymentFields,
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
  ROUTES,
} from '../../../utils';
import {colors} from '../../../assets/colors';
import CustomInputForm from '../../../components/InputField';
import {useNavigation} from '@react-navigation/native';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  paymenttype: Yup.string(),
  phonenumber: Yup.string(),
  nameaccount: Yup.string(),
  account: Yup.string(),
  fee: Yup.string(),
});

const ConfirmPayment = () => {
  const nav = useNavigation();

  return (
    <MainContainer>
      <Header2
        headerText3=""
        hideCancel
        text={'Confirm Payment'}
        subHeading={
          'Please check carefully the validation of your payment before sending'
        }
      />

      <View style={{padding: responsiveHeight(3)}}>
        <View
          style={{
            gap: 10,
            marginBottom: responsiveHeight(2),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: responsiveFontSize(1.8), color: colors.gray}}>
            Total Payment
          </Text>
          <Text
            style={{
              fontSize: responsiveFontSize(3),
              color: colors.black,
              fontWeight: 'bold',
            }}>
            $ 1,000,000
          </Text>
        </View>

        <CustomInputForm
          inputContainer={{width: responsiveWidth(80)}}
          buttonStyle={{width: responsiveWidth(80)}}
          inputStyle={{color: 'black'}}
          inputContainerStyle={{marginTop: responsiveHeight(0)}}
          onSubmit={values => nav.navigate(ROUTES.TRANSACTION)}
          initialValues={{
            paymenttype: 'plumbing',
            phonenumber: '043223423423',
            nameaccount: 'John',
            amount: '$250.00',
            fee: '$120.00',
          }}
          validationSchema={validationSchema}
          buttonText="Pay Now"
          fields={confirmPaymentFields}
        />
      </View>
    </MainContainer>
  );
};

export default ConfirmPayment;
