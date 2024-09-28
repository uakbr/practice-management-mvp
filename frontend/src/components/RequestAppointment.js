import React, { useState, useContext } from 'react';
import { requestAppointment } from '../services/appointmentService';
import { AuthContext } from '../state/authContext';
import { AppointmentContext } from '../state/appointmentContext';

const RequestAppointment = () => {
  const { getToken } = useContext(AuthContext);
  const { addAppointment } = useContext(AppointmentContext);
  const token = getToken();
  const [appointmentDate, setAppointmentDate] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await requestAppointment({ appointmentDate, notes }, token);
      addAppointment(response.data.appointment);
      alert('Appointment requested successfully');
    } catch (error) {
      console.error('Request Appointment Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Request Appointment</h2>
      <input
        type="datetime-local"
        value={appointmentDate}
        onChange={(e) => setAppointmentDate(e.target.value)}
        required
      />
      <textarea
        placeholder="Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <button type="submit">Request Appointment</button>
    </form>
  );
};

export default RequestAppointment;