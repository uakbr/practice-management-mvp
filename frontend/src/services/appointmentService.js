// API calls related to appointments
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/appointments';

export const requestAppointment = (data, token) => {
  return axios.post(API_URL, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getUserAppointments = (token) => {
  return axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const cancelAppointment = (appointmentId, token) => {
  return axios.put(`${API_URL}/${appointmentId}/cancel`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const checkInAppointment = (appointmentId, token) => {
  return axios.put(`${API_URL}/${appointmentId}/check-in`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};