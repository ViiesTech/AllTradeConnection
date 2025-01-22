import { StyleSheet } from 'react-native'
import React from 'react'
import Container from '../../components/Container'
import AuthHeader from '../../components/AuthHeader'
import { images } from '../../assets/images'
import CustomInputForm from '../../components/InputField'
import { forgotFields, ROUTES } from '../../utils'
import { useNavigation } from '@react-navigation/native'
import * as Yup from 'yup'; 

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
});

const ForgotPassword = () => {
 
  const nav = useNavigation();

  const onSendEmail = (values: string) => {
    nav.navigate(ROUTES.OTP,{type: 'reset'});
  }

  return (
    <Container>
        <AuthHeader image={images.forgot} text={'Forgot Password'} desc={'Please enter your email to reset password'} />
        <CustomInputForm onSubmit={onSendEmail} buttonText='Next' initialValues={{email: 'example@mail.com'}} fields={forgotFields} validationSchema={validationSchema} />
    </Container>
  )
}

export default ForgotPassword

const styles = StyleSheet.create({})