import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Container from '../../components/Container';
import AuthHeader from '../../components/AuthHeader';
import CodeInput from '../../components/CodeInput';
import { responsiveFontSize, responsiveHeight, ROUTES } from '../../utils';
import { colors } from '../../assets/colors';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { images } from '../../assets/images';

const OTP = ({route}) => {
  const [OTPCode, setOTPCode] = useState<string>('');
  const screenType = route?.params?.type;

  const navigation = useNavigation()

  const onVerifyOTP = () => {
    if(screenType === 'signup')  {
      navigation.navigate(ROUTES.SELECT_EXPERIENCE)
    } else {
      navigation.navigate(ROUTES.RESET_PASSWORD)
    }
  }

  return (
    <Container>
      <AuthHeader image={images.otp} text={'Enter OTP'} desc={'We have sent you an email containing 6 digits verification code. Please enter the code to verify your identity'} />
      <CodeInput value={OTPCode} setValue={setOTPCode} />
      <TouchableOpacity style={styles.resendCodeWrapper}>
        <Text style={styles.resendText}>Resend Code (00:16)</Text>
      </TouchableOpacity>
      <Button onPress={() => onVerifyOTP()} buttonText='Verify' style={{ marginTop: responsiveHeight(2.8) }} />
    </Container>
  );
};

export default OTP;

const styles = StyleSheet.create({
  resendCodeWrapper: {
    alignItems: 'center',
    paddingTop: responsiveHeight(0.5)
  },
  resendText: {
    color: colors.dark_purple,
    fontSize: responsiveFontSize(1.5)
  }
});
