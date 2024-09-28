import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
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
    <div>
      <nav>
        <Link to="/">Home</Link> |{' '}
        <Link to="/appointments">Appointments</Link> |{' '}
        <Link to="/request-appointment">Request Appointment</Link> |{' '}
        <Link to="/profile">Profile</Link>
      </nav>
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
    </div>
  );
}

export default App;