import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './state/authContext';
import { UserProvider } from './state/userContext';
import { AppointmentProvider } from './state/appointmentContext';

ReactDOM.render(
  <AuthProvider>
    <UserProvider>
      <AppointmentProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AppointmentProvider>
    </UserProvider>
  </AuthProvider>,
  document.getElementById('root')
);