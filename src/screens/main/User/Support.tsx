import React, {useRef, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MainContainer from '../../../components/MainContainer';
import Header2 from '../../../components/Header2';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
  supportFields,
} from '../../../utils';
import {colors} from '../../../assets/colors';
import CustomInputForm from '../../../components/InputField';
import * as Yup from 'yup';
import Toast from 'react-native-toast-message';
import {createSupport} from '../../../GlobalFunctions/userMain';
import { FormikProps } from 'formik';

const validationSchema = Yup.object().shape({
  fullname: Yup.string()
    .min(2, 'Full name must be at least 2 characters')
    .max(50, 'Full name must not exceed 50 characters')
    .required('Full name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  number: Yup.string()
    .matches(/^\d+$/, 'Contact number must contain only digits')
    .min(10, 'Contact number must be at least 10 digits')
    .max(15, 'Contact number must not exceed 15 digits')
    .required('Phone number is required'),
  message: Yup.string()
    .max(200, 'Message must not exceed 200 characters')
    .required('Message is required'),
});

const Support = () => {
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<FormikProps<any>>(null); // ✅ Add Formik ref

  const handleSupport = async (values: string) => {
    if (isLoading) {
      return null;
    }

    setIsLoading(true);
    const res = await createSupport({
      firstName: values?.fullname,
      email: values?.email,
      phoneNumber: values?.number,
      message: values?.message,
    });

    if (res.success) {
      setIsLoading(false);
      formRef.current?.resetForm()
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Thank you! Your message has been sent to our support team.',
      });
    } else {
      Toast.show({
        type: 'error',
        text1: 'Failed to send',
        text2: res?.message,
      });
      setIsLoading(false);
    }
  };

  return (
    <MainContainer>
      <Header2 text="Support" hideCancel />
      <View style={styles.subContainer}>
        <Text style={styles.text}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries,
        </Text>
        <CustomInputForm
          inputContainerStyle={{paddingTop: responsiveHeight(4)}}
          buttonText={'Sign in'}
          onSubmit={values => handleSupport(values)}
          initialValues={{fullname: '', email: '', number: '', message: ''}}
          fields={supportFields}
          buttonText={'Submit'}
          ref={formRef}
          isLoading={isLoading}
          inputContainer={{width: responsiveWidth(90)}}
          // childrenStyle={{width: responsiveWidth(95)}}
          buttonStyle={{marginTop: responsiveHeight(3)}}
          validationSchema={validationSchema}
        />
      </View>
    </MainContainer>
  );
};

export default Support;

const styles = StyleSheet.create({
  subContainer: {
    padding: responsiveHeight(2.5),
    paddingTop: responsiveHeight(0.2),
  },
  text: {
    color: colors.textColor3,
    fontSize: responsiveFontSize(1.9),
  },
});
