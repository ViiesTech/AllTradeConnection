import {StyleSheet} from 'react-native';
import React, {useState} from 'react';
import Container from '../../components/Container';
import {images} from '../../assets/images';
import AuthHeader from '../../components/AuthHeader';
import CustomInputForm from '../../components/InputField';
import {resetPasswordFields, ROUTES} from '../../utils';
import {useNavigation} from '@react-navigation/native';
import * as Yup from 'yup';
import Toast from 'react-native-toast-message';
import {resetPassword} from '../../GlobalFunctions/auth';

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  cPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

const ResetPassword = ({route}) => {
  const nav = useNavigation();
  const data = route?.params?.data;
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async values => {
    if (!isLoading) {
      setIsLoading(true);
      const res = await resetPassword({
        email: data.email,
        newPassword: values.password,
      });
      if (res?.success) {
        nav.navigate(ROUTES.LOGIN);
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
        desc="Please enter your new password to reset password"
        image={images.otp}
        text="Reset Password"
      />
      <CustomInputForm
        validationSchema={validationSchema}
        initialValues={{password: '', cPassword: ''}}
        onSubmit={values => handleResetPassword(values)}
        buttonText="Next"
        isLoading={isLoading}
        fields={resetPasswordFields}
      />
    </Container>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({});
