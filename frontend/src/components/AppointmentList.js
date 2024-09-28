// Displays a list of upcoming and past appointments
import React, { useEffect, useContext } from 'react';
import { getUserAppointments } from '../services/appointmentService';
import { AuthContext } from '../state/authContext';
import { AppointmentContext } from '../state/appointmentContext';

const AppointmentList = () => {
  const { getToken } = useContext(AuthContext);
  const { appointments, setAppointments } = useContext(AppointmentContext);
  const token = getToken();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await getUserAppointments(token);
        setAppointments(response.data);
      } catch (error) {
        console.error('Fetch Appointments Error:', error);
      }
    };

    fetchAppointments();
  }, [token, setAppointments]);

  const handleCancel = async (appointmentId) => {
    try {
      await cancelAppointment(appointmentId, token);
      setAppointments(appointments.filter((appt) => appt._id !== appointmentId));
      alert('Appointment canceled');
    } catch (error) {
      console.error('Cancel Appointment Error:', error);
    }
  };

  return (
    <div>
      <h2>Your Appointments</h2>
      <ul>
        {appointments.map((appt) => (
          <li key={appt._id}>
            {new Date(appt.appointmentDate).toLocaleString()} - {appt.status}
            {appt.status === 'scheduled' && (
              <button onClick={() => handleCancel(appt._id)}>Cancel</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppointmentList;