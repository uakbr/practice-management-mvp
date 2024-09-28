const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
  getUserProfile,
  updateUserProfile,
  uploadInsurance,
} = require('../controllers/userController');

// Apply authentication middleware
router.use(authMiddleware);

// @route   GET /api/user/profile
// @desc    Get user profile
router.get('/profile', getUserProfile);

// @route   PUT /api/user/profile
// @desc    Update user profile
router.put('/profile', updateUserProfile);

// @route   POST /api/user/insurance
// @desc    Upload insurance document
router.post('/insurance', uploadInsurance);

module.exports = router;