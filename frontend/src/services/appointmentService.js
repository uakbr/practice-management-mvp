// API calls related to appointments
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/appointments';

// Request a new appointment
export const requestAppointment = (data, token) => {
  return axios.post(`${API_URL}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Get user's appointments
export const getAppointments = (token) => {
  return axios.get(`${API_URL}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Cancel an appointment
export const cancelAppointment = (appointmentId, token) => {
  return axios.put(`${API_URL}/${appointmentId}/cancel`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Check-in to an appointment
export const checkInAppointment = (appointmentId, token) => {
  return axios.put(`${API_URL}/${appointmentId}/check-in`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Check-out of an appointment
export const checkOutAppointment = (appointmentId, token) => {
  return axios.put(`${API_URL}/${appointmentId}/check-out`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};