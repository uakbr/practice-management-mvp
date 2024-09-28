// API calls related to invoice management
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/invoices';

// Get user's invoices
export const getInvoices = (token) => {
  return axios.get(`${API_URL}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Generate an invoice (Admin functionality - optional)
export const generateInvoice = (data, token) => {
  return axios.post(`${API_URL}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Process payment for an invoice
export const payInvoice = (invoiceId, paymentMethodId, token) => {
  return axios.post(
    `${API_URL}/pay`,
    { invoiceId, paymentMethodId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};