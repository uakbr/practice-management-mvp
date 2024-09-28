// Context for managing appointment data
import React, { createContext, useState } from 'react';

export const AppointmentContext = createContext();

export const AppointmentProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);

  const addAppointment = (appointment) => {
    setAppointments([...appointments, appointment]);
  };

  const updateAppointment = (updatedAppointment) => {
    setAppointments(
      appointments.map((appt) =>
        appt._id === updatedAppointment._id ? updatedAppointment : appt
      )
    );
  };

  return (
    <AppointmentContext.Provider
      value={{ appointments, setAppointments, addAppointment, updateAppointment }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};