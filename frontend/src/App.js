import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './components/Login';
import Register from './components/Register';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './components/Dashboard';
import AppointmentList from './components/AppointmentList';
import RequestAppointment from './components/RequestAppointment';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <PrivateRoute path="/dashboard" component={Dashboard} />
      <PrivateRoute path="/appointments" component={AppointmentList} />
      <PrivateRoute path="/request-appointment" component={RequestAppointment} />
    </Switch>
  );
}

export default App;