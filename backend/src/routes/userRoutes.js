const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile, uploadInsurance, upload } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/profile', getUserProfile);
router.put('/profile', updateUserProfile);
router.post('/insurance', upload, uploadInsurance);

module.exports = router;