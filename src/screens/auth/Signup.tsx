import {StyleSheet, View} from 'react-native';
import React from 'react';
import Container from '../../components/Container';
import AuthHeading from '../../components/AuthHeading';
import {images} from '../../assets/images';
import CustomInputForm from '../../components/InputField';
import {
  responsiveHeight,
  responsiveWidth,
  ROUTES,
  signupFields,
  validationSchema,
} from '../../utils';
import CheckBoxText from '../../components/CheckBoxText';
import AuthenticationText from '../../components/AuthenticationText';
import {useNavigation} from '@react-navigation/native';

const Signup = () => {
  const initialValues = {
    email: 'example@gmail.com',
    phone: '4242424244',
    password: '12345678',
    cPassword: '12345678',
  };
  const nav = useNavigation();

  const handleSignup = (values: string) => {
    nav.navigate(ROUTES.OTP,{type: 'signup'});
  };

  return (
    <Container style={styles.container}>
      <View style={styles.content}>
        <AuthHeading
          text="Signup"
          image={images.logo}
          desc="Enter your details to register yourself"
        />
        <CustomInputForm
          inputContainerStyle={{paddingTop: responsiveHeight(4)}}
          buttonText={'Sign Up'}
          onSubmit={values => handleSignup(values)}
          initialValues={initialValues}
          fields={signupFields}
          validationSchema={validationSchema}
        />
        <View style={{paddingTop: responsiveHeight(2), paddingHorizontal: responsiveWidth(8),
        }}>
          <CheckBoxText text="By continuing you accept our Privacy Policy and Term of Use" />
        </View>
      </View>
      <View style={styles.authTextContainer}>
        <AuthenticationText
          onPress={() => nav.navigate(ROUTES.LOGIN)}
          text="Already"
          text2="Sign in"
        />
      </View>
    </Container>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingBottom: responsiveHeight(15),
  },
  authTextContainer: {
    justifyContent: 'flex-end',
    paddingBottom: responsiveHeight(4),
  },
});
