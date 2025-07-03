import {StyleSheet} from 'react-native';
import React, {useState} from 'react';
import Container from '../../components/Container';
import AuthHeader from '../../components/AuthHeader';
import {images} from '../../assets/images';
import CustomInputForm from '../../components/InputField';
import {forgotFields, ROUTES} from '../../utils';
import {useNavigation} from '@react-navigation/native';
import * as Yup from 'yup';
import {resendOtp} from '../../GlobalFunctions/auth';
import Toast from 'react-native-toast-message';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
});

const ForgotPassword = () => {
  const nav = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const onSendEmail = async (values: string) => {
    if (!isLoading) {
      setIsLoading(true);
      const res = await resendOtp({
        email: values.email,
      });
      if (res?.success) {
        nav.navigate(ROUTES.OTP, {component: 'reset', data: res?.data});
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: res?.message,
        });
        setIsLoading(false);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Otp verification failed',
          text2: res?.message,
        });
        setIsLoading(false);
      }
    }
  };

  return (
    <Container>
      <AuthHeader
        image={images.forgot}
        text={'Forgot Password'}
        desc={'Please enter your email to reset password'}
      />
      <CustomInputForm
        onSubmit={onSendEmail}
        buttonText="Next"
        initialValues={{email: ''}}
        fields={forgotFields}
        validationSchema={validationSchema}
        isLoading={isLoading}
      />
    </Container>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({});
