import axios from 'axios';
import {baseUrl, endPoints} from '../utils/api_content';
import Toast from 'react-native-toast-message';

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
      addSignUpToken: addSignUpToken ? addSignUpToken?.toString() : null,
      type: type ? type?.toString() : null,
    });

    return data?.data;
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message || error.message,
    };
  }
};

export const verifyOtpForResetPassword = async ({email, otp}: any) => {
  try {
    const data = await axios.post(`${baseUrl}${endPoints.verifyOtp}`, {
      email: email.toString(),
      Otp: otp,
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
  proProfileId,
}: any) => {
  try {
    const data = await axios.post(`${baseUrl}${endPoints.createLocation}`, {
      userProfileId: userProfileId ? userProfileId.toString() : null,
      proProfileId: proProfileId ? proProfileId.toString() : null,
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
    //  alert(Array.isArray(data.data.data))
    return data?.data;
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message || error.message,
    };
  }
};

export const createProfessionalProfile = async ({
  professionalProfileId,
  firstName,
  lastName,
  phoneNumber,
  address,
  type,
  category,
  certificate,
  image,
  workingDays,
  bio,
}: any) => {
  try {
    let fields = new FormData();
    fields.append('id', professionalProfileId);
    fields.append('firstName', firstName);
    fields.append('lastName', lastName);
    fields.append('phoneNumber', phoneNumber);
    fields.append('bio', bio);
    fields.append('address', address);
    fields.append('category', JSON.stringify(category));
    fields.append('type', type);
    fields.append('workingDays', workingDays);
    fields.append('image', {
      uri: image,
      name: 'image.jpg',
      type: 'image/jpeg',
    });

    // console.log('hhhh',fields)
    certificate.forEach((img: any) => {
      fields.append('certificate', {
        uri: img?.uri,
        name: 'image.jpg',
        type: 'image/jpeg',
      });
    });

    // return console.log('gfields',typeof category)

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${baseUrl}${endPoints.createProfessionalProfile}`,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: fields,
    };

    const data = await axios.request(config);

    return data.data;
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message || error.message,
    };
  }
};

export const resetPassword = async ({email, newPassword}: any) => {
  try {
    const data = await axios.post(`${baseUrl}${endPoints.resetPassword}`, {
      email: email.toString(),
      newPassword: newPassword.toString(),
    });

    return data?.data;
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message || error.message,
    };
  }
};

export const login = async ({email, password}: any) => {
  try {
    const data = await axios.post(`${baseUrl}${endPoints.signIn}`, {
      email: email.toString(),
      password: password.toString(),
    });

    return data?.data;
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message || error.message,
    };
  }
};

export const ShowToast = (type: 'success' | 'error' | 'info', message: string) => {
  Toast.show({
    type: type,
    text1: type === 'success' ? 'Success' : type === 'error' ? 'Error' : 'Info',
    text2: message,
    position: 'top',
    visibilityTime: 3000,
    autoHide: true,
    topOffset: 50,
  });
};