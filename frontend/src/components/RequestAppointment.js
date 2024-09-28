import React, { useState, useContext } from 'react';
import { requestAppointment } from '../services/appointmentService';
import { AuthContext } from '../state/authContext';
import { AppointmentContext } from '../state/appointmentContext';
import {
  TextField,
  Button,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { DateTimePicker } from '@material-ui/pickers';

const useStyles = makeStyles(() => ({
  form: {
    maxWidth: 400,
    margin: '0 auto',
  },
  submitButton: {
    marginTop: 20,
  },
}));

const RequestAppointment = () => {
  const classes = useStyles();
  const { getToken } = useContext(AuthContext);
  const { addAppointment } = useContext(AppointmentContext);
  const token = getToken();
  const [appointmentDate, setAppointmentDate] = useState(new Date());
  const [notes, setNotes] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await requestAppointment({ appointmentDate, notes }, token);
      addAppointment(response.data.appointment);
      alert('Appointment requested successfully');
    } catch (error) {
      console.error('Error requesting appointment:', error);
    }
  };

  return (
    <div className={classes.form}>
      <Typography variant="h4">Request Appointment</Typography>
      <form onSubmit={handleSubmit}>
        <DateTimePicker
          label="Appointment Date and Time"
          value={appointmentDate}
          onChange={setAppointmentDate}
          required
          fullWidth
          disablePast
        />
        <TextField
          label="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          multiline
          rows={4}
          fullWidth
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submitButton}
        >
          Request Appointment
        </Button>
      </form>
    </div>
  );
};

export default RequestAppointment;