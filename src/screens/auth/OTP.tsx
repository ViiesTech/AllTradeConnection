import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import Container from '../../components/Container';
import AuthHeader from '../../components/AuthHeader';
import CodeInput from '../../components/CodeInput';

const OTP = () => {
  const [OTPCode, setOTPCode] = useState<string>('');

  return (
    <Container>
      <AuthHeader />
      <CodeInput value={OTPCode} setValue={setOTPCode} />
    </Container>
  );
};

export default OTP;

const styles = StyleSheet.create({});
