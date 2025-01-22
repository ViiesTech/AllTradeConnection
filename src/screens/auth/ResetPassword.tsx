import { StyleSheet } from 'react-native'
import React from 'react'
import Container from '../../components/Container'
import { images } from '../../assets/images'
import AuthHeader from '../../components/AuthHeader'
import CustomInputForm from '../../components/InputField'
import { resetPasswordFields, ROUTES } from '../../utils'
import { useNavigation } from '@react-navigation/native'
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  cPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

const ResetPassword = () => {
  
  const nav = useNavigation()
  return (
    <Container>
      <AuthHeader desc='Please enter your new password to reset password' image={images.otp} text='Reset Password' />
      <CustomInputForm validationSchema={validationSchema} initialValues={{ password: '', cPassword: '' }} onSubmit={values => nav.navigate(ROUTES.LOGIN)} buttonText='Next' fields={resetPasswordFields} />
    </Container>
  )
}

export default ResetPassword

const styles = StyleSheet.create({})