import axios from 'axios';
import {baseUrl, endPoints} from '../utils/api_content';

export const getUserAllProjects = async ({token}: any) => {
  try {
    const data = await axios.get(`${baseUrl}${endPoints.getAllProjects}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Typical format
      },
    });

    return data?.data;
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message || error.message,
    };
  }
};

export const getAllLocations = async ({token}: any) => {
  try {
    const data = await axios.get(
      `${baseUrl}${endPoints.getAllProjectLocations}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Typical format
        },
      },
    );

    return data?.data;
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message || error.message,
    };
  }
};

export const createProject = async ({
  userProfileId,
  email,
  phoneNumber,
  fullName,
  category,
  selectDate,
  image,
  startTime,
  endTime,
  price,
  address,
  appartmentNo,
  professionalType,
  locationName,
  longitude,
  latitude,
  state,
  additionalNote,
  city,
  zipCode,
}: any) => {
  try {
    let fields = new FormData();
    fields.append('userProfileId', userProfileId);
    fields.append('email', email);
    fields.append('phoneNumber', phoneNumber);
    fields.append('fullName', fullName);
    fields.append('category', category);
    fields.append('selectDate', selectDate);
    fields.append('startTime', startTime);
    fields.append('endTime', endTime);
    fields.append('price', price);
    fields.append('address', address);
    fields.append('appartmentNo', appartmentNo);
    fields.append('professionalType', professionalType);
    fields.append('locationName', locationName);
    fields.append('longitude', longitude);
    fields.append('latitude', latitude);
    // fields.append('state', state);
    fields.append('additionalNote', additionalNote);
    fields.append('city', city);
    fields.append('zipCode', zipCode);
    image.forEach((img: any) => {
      fields.append('images', {
        uri: img?.uri,
        name: 'image.jpg',
        type: 'image/jpeg',
      });
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${baseUrl}/${endPoints.createProject}`,
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
