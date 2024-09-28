// API calls related to authentication (login, registration)
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

// Register new user
export const registerUser = (userData) => {
  return axios.post(`${API_URL}/register`, userData);
};

// Login user
export const loginUser = (credentials) => {
  return axios.post(`${API_URL}/login`, credentials);
};