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

export const createProfile = async ({
  id,
  firstName,
  lastName,
  phoneNumber,
  address,
  type,
  image,
}: any) => {
  try {
    let fields = new FormData();
    fields.append('id', id);
    fields.append('firstName', firstName);
    fields.append('lastName', lastName);
    fields.append('phoneNumber', phoneNumber);
    fields.append('address', address);
    fields.append('type', type);
    fields.append('image', {
      uri: image,
      name: 'image.jpg',
      type: 'image/jpeg',
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://predemo.site/Alltradeconnection/api/user/updateProfile',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: fields,
    };

    const data = await axios.request(config);

    return data?.data;
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message || error.message,
    };
  }
};

export const createLocation = async ({
  userProfileId,
  locationName,
  address,
  longitude,
  latitude,
  state,
  zipCode,
  city,
}: any) => {
  try {
    const data = await axios.post(`${baseUrl}${endPoints.createLocation}`, {
      userProfileId: userProfileId.toString(),
      locationName: locationName.toString(),
      address: address.toString(),
      longitude: longitude.toString(),
      latitude: latitude.toString(),
      state: state.toString(),
      zipCode: zipCode.toString(),
      city: city.toString(),
    });

    return data?.data;
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message || error.message,
    };
  }
};

export const getAllServices = async () => {
  try {
    const data = await axios.get(`${baseUrl}${endPoints.getAllServices}`);

    return data?.data;
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message || error.message,
    };
  }
};