// Routes for appointment-related operations
const express = require('express');
const router = express.Router();
const {
  requestAppointment,
  getUserAppointments,
  cancelAppointment,
  checkInAppointment,
} = require('../controllers/appointmentController');
const authMiddleware = require('../middleware/authMiddleware');

// Apply authentication middleware to all routes
router.use(authMiddleware);

// @route   POST /api/appointments
// @desc    Request a new appointment
router.post('/', requestAppointment);

// @route   GET /api/appointments
// @desc    Get user's appointments
router.get('/', getUserAppointments);

// @route   PUT /api/appointments/:appointmentId/cancel
// @desc    Cancel an appointment
router.put('/:appointmentId/cancel', cancelAppointment);

// @route   PUT /api/appointments/:appointmentId/check-in
// @desc    Check-in to an appointment
router.put('/:appointmentId/check-in', checkInAppointment);

module.exports = router;