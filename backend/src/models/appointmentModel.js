// Defines the schema for Appointment documents in MongoDB
const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  appointmentDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['requested', 'confirmed', 'canceled', 'completed', 'in-progress'],
    default: 'requested',
  },
  checkInTime: {
    type: Date,
  },
  checkOutTime: {
    type: Date,
  },
  notes: {
    type: String,
  },
});

module.exports = mongoose.model('Appointment', AppointmentSchema);