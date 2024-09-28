// Routes for appointment-related operations
const express = require('express');
const router = express.Router();
const {
  requestAppointment,
  viewAppointments,
  cancelAppointment,
  checkIn,
  checkOut,
} = require('../controllers/appointmentController');
const authMiddleware = require('../middleware/authMiddleware');
const { check } = require('express-validator');
const validateAppointment = require('../middleware/validateAppointment');

// Apply authentication middleware to all routes
router.use(authMiddleware);

// @route   POST /api/appointments
// @desc    Request a new appointment
router.post(
  '/',
  [
    check('appointmentDate', 'Valid appointment date is required').isISO8601(),
    validateAppointment,
  ],
  requestAppointment
);

// @route   GET /api/appointments
// @desc    View user's appointments
router.get('/', viewAppointments);

// @route   PUT /api/appointments/:id/cancel
// @desc    Cancel an appointment
router.put('/:id/cancel', cancelAppointment);

// @route   PUT /api/appointments/:id/check-in
// @desc    Check-in to an appointment
router.put('/:id/check-in', checkIn);

// @route   PUT /api/appointments/:id/check-out
// @desc    Check-out of an appointment
router.put('/:id/check-out', checkOut);

module.exports = router;