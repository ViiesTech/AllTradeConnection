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
    return error?.message || error.response?.data?.message;
  }
};
