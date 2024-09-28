import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthProvider } from './state/authContext';
import { UserProvider } from './state/userContext';
import { AppointmentProvider } from './state/appointmentContext';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <UserProvider>
        <AppointmentProvider>
          <Router>
            <App />
          </Router>
        </AppointmentProvider>
      </UserProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);