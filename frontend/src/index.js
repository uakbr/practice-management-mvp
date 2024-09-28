import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthProvider } from './state/authContext';
import { UserProvider } from './state/userContext';
import { AppointmentProvider } from './state/appointmentContext';
import { InvoiceProvider } from './state/invoiceContext';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1976d2', // Customize primary color
    },
    secondary: {
      main: '#dc004e', // Customize secondary color
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <UserProvider>
        <AppointmentProvider>
          <InvoiceProvider>
            <Router>
              <ThemeProvider theme={theme}>
                <App />
              </ThemeProvider>
            </Router>
          </InvoiceProvider>
        </AppointmentProvider>
      </UserProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);