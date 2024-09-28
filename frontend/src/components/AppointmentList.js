// Displays a list of upcoming and past appointments
import React, { useEffect, useContext } from 'react';
import {
  getAppointments,
  cancelAppointment,
  checkInAppointment,
  checkOutAppointment,
} from '../services/appointmentService';
import { AuthContext } from '../state/authContext';
import { AppointmentContext } from '../state/appointmentContext';
import {
  List,
  ListItem,
  ListItemText,
  Button,
  Typography,
} from '@material-ui/core';

const AppointmentList = () => {
  const { appointments, setAppointments, updateAppointment } = useContext(AppointmentContext);
  const { getToken } = useContext(AuthContext);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = getToken();
        const response = await getAppointments(token);
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };
    fetchAppointments();
  }, [getToken, setAppointments]);

  const handleCancel = async (appointmentId) => {
    try {
      const token = getToken();
      const response = await cancelAppointment(appointmentId, token);
      updateAppointment(response.data.appointment);
    } catch (error) {
      console.error('Error canceling appointment:', error);
    }
  };

  const handleCheckIn = async (appointmentId) => {
    try {
      const token = getToken();
      const response = await checkInAppointment(appointmentId, token);
      updateAppointment(response.data.appointment);
    } catch (error) {
      console.error('Error checking in:', error);
    }
  };

  const handleCheckOut = async (appointmentId) => {
    try {
      const token = getToken();
      const response = await checkOutAppointment(appointmentId, token);
      updateAppointment(response.data.appointment);
    } catch (error) {
      console.error('Error checking out:', error);
    }
  };

  return (
    <div>
      <Typography variant="h4">My Appointments</Typography>
      <List>
        {appointments.map((appt) => (
          <ListItem key={appt._id}>
            <ListItemText
              primary={new Date(appt.appointmentDate).toLocaleString()}
              secondary={`Status: ${appt.status}`}
            />
            {appt.status === 'scheduled' && (
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleCancel(appt._id)}
              >
                Cancel
              </Button>
            )}
            {appt.status === 'scheduled' && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleCheckIn(appt._id)}
              >
                Check-In
              </Button>
            )}
            {appt.status === 'in-progress' && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleCheckOut(appt._id)}
              >
                Check-Out
              </Button>
            )}
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default AppointmentList;