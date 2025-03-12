import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { loginFields, responsiveFontSize, responsiveHeight, responsiveWidth, ROUTES, validationSchema } from "../../utils";
import { colors } from "../../assets/colors";
import Container from "../../components/Container";
import AuthHeading from "../../components/AuthHeading";
import CustomInputForm from "../../components/InputField";
import CheckBoxText from "../../components/CheckBoxText";
import AuthenticationText from "../../components/AuthenticationText";
import { useNavigation } from "@react-navigation/native";
import { images } from "../../assets/images";

const Login = () => {
  const initialValues = {email: '', password: ''};
  const nav = useNavigation();

  const handleLogin = (values: string) => {};

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
          childrenStyle={{width: responsiveWidth(95)}}
          buttonStyle={{marginTop: responsiveHeight(3)}}
          validationSchema={validationSchema}>
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
          onPress={() => nav.navigate(ROUTES.SIGNUP)}
          text="Not"
          text2="Sign up"
        />
      </View>
    </Container>
  );
};

export default Login

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
  forgotPasswordContainer:{
    margin: responsiveHeight(0.3),
  },
  textStyle: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: responsiveFontSize(1.8),
  },
});
