import axios from 'axios';

const API_URL = 'http://localhost:5000/api/user';

// Get user profile
export const getUserProfile = (token) => {
  return axios.get(`${API_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Update user profile
export const updateUserProfile = (data, token) => {
  return axios.put(`${API_URL}/profile`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Upload insurance document
export const uploadInsurance = (formData, token) => {
  return axios.post(`${API_URL}/insurance`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
};