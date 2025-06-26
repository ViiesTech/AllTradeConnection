import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import Container from '../../components/Container';
import AuthHeader from '../../components/AuthHeader';
import CodeInput from '../../components/CodeInput';
import {responsiveFontSize, responsiveHeight, ROUTES} from '../../utils';
import {colors} from '../../assets/colors';
import Button from '../../components/Button';
import {useNavigation} from '@react-navigation/native';
import {images} from '../../assets/images';
import Toast from 'react-native-toast-message';
import {resendOtp, signUp, verifyOtp} from '../../GlobalFunctions/auth';

const RESEND_TIME = 60;

const OTP = ({route}) => {
  const [OTPCode, setOTPCode] = useState<string>('');
  const screenType = route?.params?.type;
  const data = route?.params?.data;
  const password = route?.params?.password;
  const accessToken = route?.params?.accessToken;
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const [timer, setTimer] = useState(RESEND_TIME);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timer]);

  const onVerifyOTP = async () => {
    if (screenType === 'signup') {
      // navigation.navigate(ROUTES.SELECT_EXPERIENCE);
      if (OTPCode && !isLoading) {
        setIsLoading(true);
        const res = await verifyOtp({
          email: data.email,
          otp: data.otp,
          addSignUpToken: accessToken,
          type: data.type,
        });
        if (res?.success) {
          navigation.navigate(ROUTES.CREATE_PROFILE);
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
    } else {
      navigation.navigate(ROUTES.RESET_PASSWORD);
    }
  };

  const handleResendOtp = async () => {
    if (!loading && !timer) {
      setLoading(true);
      setTimer(RESEND_TIME); // restart timer
      const res = await signUp({
        email: data.email,
        password: password,
        type: data.type,
      });
      if (res?.success) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: res?.message,
        });
        setLoading(false);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Failed to resend OTP',
          text2: res?.message,
        });
        setLoading(false);
      }
    }
  };

  return (
    <Container>
      <AuthHeader
        image={images.otp}
        text={'Enter OTP'}
        desc={
          'We have sent you an email containing 6 digits verification code. Please enter the code to verify your identity'
        }
      />
      <CodeInput value={OTPCode} setValue={setOTPCode} />
      {loading ? (
        <ActivityIndicator size={'small'} color={'#000'} />
      ) : (
        <TouchableOpacity
          style={styles.resendCodeWrapper}
          onPress={() => handleResendOtp()}>
          <Text style={styles.resendText}>Resend Code {timer ? `(${timer}s)` : null}</Text>
        </TouchableOpacity>
      )}
      <Button
        onPress={() => onVerifyOTP()}
        buttonText="Verify"
        style={{marginTop: responsiveHeight(2.8)}}
        isLoading={isLoading}
      />
    </Container>
  );
};

export default OTP;

const styles = StyleSheet.create({
  resendCodeWrapper: {
    alignItems: 'center',
    paddingTop: responsiveHeight(0.5),
  },
  resendText: {
    color: colors.dark_purple,
    fontSize: responsiveFontSize(1.5),
  },
});
