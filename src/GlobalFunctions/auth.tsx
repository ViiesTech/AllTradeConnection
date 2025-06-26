import axios from 'axios';
import {baseUrl, endPoints} from '../utils/api_content';

export const signUp = async ({email, password, type}: any) => {
  try {
    const data = await axios.post(`${baseUrl}${endPoints.signUp}`, {
      email: email.toString(),
      password: password.toString(),
      type: type.toString(),
    });

    return data?.data;
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message || error.message,
    };
  }
};

export const verifyOtp = async ({email, otp, addSignUpToken, type}: any) => {
  try {
    const data = await axios.post(`${baseUrl}${endPoints.verifyOtp}`, {
      email: email.toString(),
      Otp: otp.toString(),
      addSignUpToken: addSignUpToken.toString(),
      type: type.toString(),
    });

    return data?.data;
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message || error.message,
    };
  }
};

export const resendOtp = async ({email}: any) => {
  try {
    const data = await axios.post(`${baseUrl}${endPoints.resendOtp}`, {
      email: email.toString(),
    });

    return data?.data;
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message || error.message,
    };
  }
};
