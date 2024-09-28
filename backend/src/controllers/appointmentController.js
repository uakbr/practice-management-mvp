// Handles appointment scheduling and management
const Appointment = require('../models/appointmentModel');

// Request a new appointment
const requestAppointment = async (req, res) => {
  const { appointmentDate, notes } = req.body;
  try {
    const appointment = new Appointment({
      userId: req.user.userId,
      appointmentDate,
      notes,
    });
    await appointment.save();
    res.status(201).json({ message: 'Appointment requested successfully', appointment });
  } catch (error) {
    console.error('Request Appointment Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user's appointments
const getUserAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId: req.user.userId });
    res.json(appointments);
  } catch (error) {
    console.error('Get Appointments Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Cancel an appointment
const cancelAppointment = async (req, res) => {
  const { appointmentId } = req.params;
  try {
    const appointment = await Appointment.findOneAndUpdate(
      { _id: appointmentId, userId: req.user.userId },
      { status: 'canceled' },
      { new: true }
    );
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.json({ message: 'Appointment canceled', appointment });
  } catch (error) {
    console.error('Cancel Appointment Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Check-in to an appointment
const checkInAppointment = async (req, res) => {
  const { appointmentId } = req.params;
  try {
    const appointment = await Appointment.findOneAndUpdate(
      { _id: appointmentId, userId: req.user.userId },
      { checkInTime: new Date(), status: 'completed' },
      { new: true }
    );
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.json({ message: 'Checked in successfully', appointment });
  } catch (error) {
    console.error('Check-In Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  requestAppointment,
  getUserAppointments,
  cancelAppointment,
  checkInAppointment,
};