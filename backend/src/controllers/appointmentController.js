// Handles appointment scheduling and management
const Appointment = require('../models/appointmentModel');
const { validationResult } = require('express-validator');

// Request a new appointment
const requestAppointment = async (req, res) => {
  // Validate request data
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { appointmentDate, notes } = req.body;
  try {
    const appointment = new Appointment({
      userId: req.user.userId,
      appointmentDate,
      notes,
      status: 'requested',
    });
    await appointment.save();
    res.status(201).json({ message: 'Appointment requested successfully', appointment });
  } catch (error) {
    console.error('Request Appointment Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// View user's appointments
const viewAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId: req.user.userId }).sort({ appointmentDate: -1 });
    res.json(appointments);
  } catch (error) {
    console.error('View Appointments Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Cancel an appointment
const cancelAppointment = async (req, res) => {
  const { id } = req.params;
  try {
    const appointment = await Appointment.findOneAndUpdate(
      { _id: id, userId: req.user.userId },
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
const checkIn = async (req, res) => {
  const { id } = req.params;
  try {
    const appointment = await Appointment.findOneAndUpdate(
      { _id: id, userId: req.user.userId },
      { checkInTime: new Date(), status: 'in-progress' },
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

// Check-out of an appointment
const checkOut = async (req, res) => {
  const { id } = req.params;
  try {
    const appointment = await Appointment.findOneAndUpdate(
      { _id: id, userId: req.user.userId },
      { checkOutTime: new Date(), status: 'completed' },
      { new: true }
    );
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.json({ message: 'Checked out successfully', appointment });
  } catch (error) {
    console.error('Check-Out Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  requestAppointment,
  viewAppointments,
  cancelAppointment,
  checkIn,
  checkOut,
};