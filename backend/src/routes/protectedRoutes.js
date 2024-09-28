const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// @route   GET /api/protected
// @desc    Test protected route
router.get('/', authMiddleware, (req, res) => {
  res.json({ message: `Welcome, ${req.user.userId}` });
});

module.exports = router;