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

export const getProfessionalAllProjects = async ({token, status}: any) => {
  try {
    const data = await axios.get(
      `${baseUrl}${endPoints.getAllProfessionalProjects}?status=${status}`,
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

export const getProjectById = async ({projectId}: any) => {
  try {
    const data = await axios.get(
      `${baseUrl}${endPoints.getProjectById}?id=${projectId}`,
    );

    return data?.data;
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message || error.message,
    };
  }
};

export const getProposalsByProjectIdAndStatus = async ({
  projectId,
  projectStatus,
}: any) => {
  try {
    const data = await axios.get(
      `${baseUrl}${endPoints.getProposalByProjectIdOrStatus}?projectId=${projectId}&status=${projectStatus}`,
    );

    return data?.data;
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message || error.message,
    };
  }
};

export const updateProject = async ({
  id,
  email,
  phoneNumber,
  fullName,
  // category,
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
  apiImages,
}: any) => {
  try {
    let fields = new FormData();
    fields.append('id', id);
    fields.append('email', email);
    fields.append('phoneNumber', phoneNumber);
    fields.append('fullName', fullName);
    // fields.append('category', category);
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
    const allImages = [...image, ...apiImages]; // merge

    allImages.forEach(img => {
      if (typeof img === 'string') {
        // API image (filename string)
        fields.append('image', img);
      } else if (img?.uri) {
        // New image (file object)
        fields.append('images', {
          uri: img.uri,
          name: 'image.jpg',
          type: 'image/jpeg',
        });
      }
    });

    apiImages.forEach(imgName => {
      fields.append('images', imgName); // Or whatever key your API expects
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${baseUrl}/${endPoints.updateProject}`,
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

export const getProposalsByProposalId = async ({proposalId}: any) => {
  try {
    const data = await axios.get(
      `${baseUrl}${endPoints.getProposalByProposalId}?id=${proposalId}`,
    );

    return data?.data;
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message || error.message,
    };
  }
};

export const getProposalsByProIdAndProjectId = async ({
  projectId,
  proProfileId,
}: any) => {
  try {
    const data = await axios.get(
      `${baseUrl}${endPoints.getProposalByProjectIdOrStatus}?projectId=${projectId}?proProfileId=${proProfileId}`,
    );

    return data?.data;
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message || error.message,
    };
  }
};

export const updateProposalByProposalIdAndStatus = async ({
  proposalId,
  status,
}: any) => {
  try {
    const data = await axios.post(
      `${baseUrl}${endPoints.updateProposalStatus}`,
      {
        proposalId: proposalId?.toString(),
        status: status?.toString(),
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

export const updateProjectStatusById = async ({projectId, status}: any) => {
  try {
    const data = await axios.post(
      `${baseUrl}${endPoints.updateProjectStatusById}`,
      {
        id: projectId?.toString(),
        status: status?.toString(),
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

export const reportByIdAndReason = async ({
  userId,
  professionalId,
  reason,
}: any) => {
  try {
    const data = await axios.post(
      `${baseUrl}${endPoints.reportByIdAndReason}`,
      {
        reportedByUser: userId?.toString(),
        reportedPro: professionalId?.toString(),
        reason: reason?.toString(),
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

export const createReview = async ({
  userId,
  proProfileId,
  comment,
  rating,
}: any) => {
  try {
    const data = await axios.post(`${baseUrl}${endPoints.createReview}`, {
      userId: userId?.toString(),
      proProfileId: proProfileId?.toString(),
      comment: comment?.toString(),
      rating: rating?.toString(),
    });

    return data?.data;
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message || error.message,
    };
  }
};

export const getReviewByUserIdAndProId = async ({
  userId,
  proProfileId,
}: any) => {
  try {
    const data = await axios.get(
      `${baseUrl}${endPoints.getReviewByUserIdOrProId}?userId=${userId}&proId=${proProfileId}`,
    );

    return data?.data;
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message || error.message,
    };
  }
};

export const getUserProfileById = async ({token, userId, type}: any) => {
  try {
    const data = await axios.get(
      `${baseUrl}${endPoints.getProfile}?id=${userId}&type=${type}`,
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

export const updateProfile = async ({
  userId,
  firstName,
  lastName,
  phoneNumber,
  address,
  type,
}: any) => {
  try {
    const formData = new FormData();

    formData.append('id', userId);
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('address', address);
    formData.append('phoneNumber', phoneNumber);
    formData.append('type', type);

    const data = await axios.post(
      `${baseUrl}${endPoints.updateProfile}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
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

export const updateProfileImage = async ({userId, image, type}: any) => {
  try {
    const formData = new FormData();

    formData.append('id', userId);
    formData.append('image', {
      uri: image,
      name: 'image.jpg',
      type: 'image/jpeg',
    });
    formData.append('type', type);

    const data = await axios.post(
      `${baseUrl}${endPoints.updateProfile}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
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

export const createSupport = async ({
  fullName,
  email,
  phoneNumber,
  message,
}: any) => {
  try {
    const data = await axios.post(`${baseUrl}${endPoints.createSupport}`, {
      fullName: fullName?.toString(),
      email: email?.toString(),
      phoneNumber: phoneNumber?.toString(),
      message: message?.toString(),
    });

    return data?.data;
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message || error.message,
    };
  }
};

export const changePassword = async ({id, password, newPassword}: any) => {
  try {
    const data = await axios.post(`${baseUrl}${endPoints.changePassword}`, {
      id: id?.toString(),
      password: password?.toString(),
      newPassword: newPassword?.toString(),
    });

    return data?.data;
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message || error.message,
    };
  }
};

export const getAllProProfile = async ({token}: any) => {
  try {
    const data = await axios.get(`${baseUrl}${endPoints.getAllProProfile}`, {
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

export const searchProProfileByLocationAndCategory = async ({
  fullName,
}: any) => {
  try {
    const data = await axios.post(
      `${baseUrl}${endPoints.searchProProfileByLocationAndCategory}`,
      {
        fullName: fullName?.toString(),
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

export const updateProjectStatusToInDiscussion = async ({
  id,
  inDiscussionPro,
}: any) => {
  try {
    const data = await axios.post(
      `${baseUrl}${endPoints.updateProjectStatusToInDiscussion}`,
      {
        id: id?.toString(),
        inDiscussionPro: inDiscussionPro?.toString(),
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

export const createProposal = async ({
  projectId,
  proProfileId,
  price,
  proposal,
}: any) => {
  try {
    const data = await axios.post(`${baseUrl}${endPoints.createProposal}`, {
      projectId: projectId?.toString(),
      proProfileId: proProfileId?.toString(),
      price: price?.toString(),
      proposal: proposal?.toString(),
    });

    return data?.data;
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message || error.message,
    };
  }
};

export const updateProposal = async ({id, price, proposal}: any) => {
  try {
    const data = await axios.post(`${baseUrl}${endPoints.updateProposal}`, {
      id: id?.toString(),
      price: price?.toString(),
      proposal: proposal?.toString(),
    });

    return data?.data;
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message || error.message,
    };
  }
};

export const getProposalByProjectIdAndProfessionalId = async ({
  projectId,
  proProfileId,
}: any) => {
  try {
    const data = await axios.get(
      `${baseUrl}${endPoints.getProposalByProjectIdOrStatus}?projectId=${projectId}&proProfileId=${proProfileId}`,
    );

    return data?.data;
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message || error.message,
    };
  }
};

export const getAllNotifications = async ({token}: any) => {
  try {
    const data = await axios.get(`${baseUrl}${endPoints.getAllNotifications}`, {
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

export const getProjectByLocationAndCategory = async ({category}: any) => {
  try {
    const data = await axios.post(
      `${baseUrl}${endPoints.getProjectByLocationAndCategory}`,
      {
        category: category,
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
