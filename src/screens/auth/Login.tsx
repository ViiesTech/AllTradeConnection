/* eslint-disable react/react-in-jsx-scope */
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  loginFields,
  loginValidationSchema,
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
  ROUTES,
  validationSchema,
} from '../../utils';
import {colors} from '../../assets/colors';
import Container from '../../components/Container';
import AuthHeading from '../../components/AuthHeading';
import CustomInputForm from '../../components/InputField';
import CheckBoxText from '../../components/CheckBoxText';
import AuthenticationText from '../../components/AuthenticationText';
import {useNavigation, useRoute} from '@react-navigation/native';
import {images} from '../../assets/images';
import {useState} from 'react';
import Toast from 'react-native-toast-message';
import {login} from '../../GlobalFunctions/auth';
import {useDispatch} from 'react-redux';
import {setToken, setUserData} from '../../redux/Slices';

const Login = () => {
  const initialValues = {email: '', password: ''};
  const nav = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [isSecured, setIsSecured] = useState(true);
  const dispatch = useDispatch();

  const handleLogin = async (values: string) => {
    if (!isLoading) {
      setIsLoading(true);
      const res = await login({
        email: values.email,
        password: values.password,
      });
      if (res?.success) {
        dispatch(setToken(res?.token));
        dispatch(setUserData(res?.data));
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Successfully Login',
        });
        setIsLoading(false);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Failed to login',
          text2: res?.message,
        });
        setIsLoading(false);
      }
    }
  };

  return (
    <Container>
      <View style={styles.content}>
        <AuthHeading
          text="Sign in "
          image={images.logo}
          desc="Enter your account details to sign in"
        />
        <CustomInputForm
          inputContainerStyle={{paddingTop: responsiveHeight(4)}}
          buttonText={'Sign in'}
          onSubmit={values => handleLogin(values)}
          initialValues={initialValues}
          fields={loginFields}
          isLoading={isLoading}
          setIsSecure={setIsSecured}
          isSecure={isSecured}
          childrenStyle={{width: responsiveWidth(95)}}
          buttonStyle={{marginTop: responsiveHeight(3)}}
          validationSchema={loginValidationSchema}>
          <View style={styles.checkboxForgotContainer}>
            <CheckBoxText text="Remember me" />
            <TouchableOpacity
              onPress={() => nav.navigate(ROUTES.FORGOT_PASSWORD)}
              style={styles.forgotPasswordContainer}>
              <Text style={styles.textStyle}>Forgot Password</Text>
            </TouchableOpacity>
          </View>
        </CustomInputForm>
      </View>
      <View style={styles.authTextContainer}>
        <AuthenticationText
          onPress={() => nav.navigate(ROUTES.SELECT_EXPERIENCE)}
          text="Not"
          text2="Sign up"
        />
      </View>
    </Container>
  );
};

export default Login;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingBottom: responsiveHeight(15),
  },
  authTextContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: responsiveHeight(5),
  },
  checkboxForgotContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginTop: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(8),
  },
  forgotPasswordContainer: {
    margin: responsiveHeight(0.3),
  },
  textStyle: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: responsiveFontSize(1.8),
  },
});
