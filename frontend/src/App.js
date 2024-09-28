import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './components/Login';
import Register from './components/Register';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import UploadInsurance from './components/UploadInsurance';
import AppointmentList from './components/AppointmentList';
import RequestAppointment from './components/RequestAppointment';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <PrivateRoute path="/dashboard" component={Dashboard} />
      <PrivateRoute path="/profile" component={Profile} />
      <PrivateRoute path="/upload-insurance" component={UploadInsurance} />
      <PrivateRoute path="/appointments" component={AppointmentList} />
      <PrivateRoute path="/request-appointment" component={RequestAppointment} />
      {/* ... other routes ... */}
    </Switch>
  );
}

export default App;