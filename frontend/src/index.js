import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './state/authContext';
import { AppointmentProvider } from './state/appointmentContext';

ReactDOM.render(
  <AuthProvider>
    <AppointmentProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppointmentProvider>
  </AuthProvider>,
  document.getElementById('root')
);