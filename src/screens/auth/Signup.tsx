import {Alert, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
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
import {useNavigation, useRoute} from '@react-navigation/native';
import {signUp} from '../../GlobalFunctions/auth';
import Toast from 'react-native-toast-message';

const Signup = () => {
  const initialValues = {
    email: '',
    phone: '',
    password: '',
    cPassword: '',
  };
  const nav = useNavigation();
  const type = useRoute()?.params?.type;
  const [isSecure, setIsSecure] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleSignup = async (values: string) => {
    if ( isChecked) {
      setIsLoading(true);
      const res = await signUp({
        email: values.email,
        password: values.password,
        type,
      });
      setIsLoading(false);
      if (res?.success) {
        console.log('response', res);
        nav.navigate(ROUTES.OTP, {
          type: 'signup',
          data: res?.data,
          accessToken: res?.data?.accessToken,
        });
        setIsLoading(false);
      } else {
        console.log(res?.data?.message);
        Toast.show({
          type: 'error',
          text1: 'Sign up failed',
          text2: res?.message,
        });
        setIsLoading(false);
      }
    }
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
          setIsSecure={setIsSecure}
          isSecure={isSecure}
          isLoading={isLoading}
        />
        <View
          style={{
            paddingTop: responsiveHeight(2),
            paddingHorizontal: responsiveWidth(8),
          }}>
          <CheckBoxText
            text="By continuing you accept our Privacy Policy and Term of Use"
            isChecked={isChecked}
            onPress={setIsChecked}
          />
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
