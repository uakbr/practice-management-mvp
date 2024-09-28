const { validationResult } = require('express-validator');

const validateAppointment = (req, res, next) => {
  // Check for validation errors from express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  const appointmentDate = new Date(req.body.appointmentDate);
  
  if (appointmentDate <= new Date()) {
    return res.status(400).json({ errors: [{ msg: 'Appointment date must be in the future' }] });
  }
  
  next();
};

module.exports = validateAppointment;