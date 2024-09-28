// Manages user-related operations (profile, insurance info, etc.)
const User = require('../models/userModel');
const Insurance = require('../models/insuranceModel');
const ocrService = require('../services/ocrService');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: './uploads/', // Make sure this directory exists
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Get user profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).populate('insurance');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      address: user.address,
      phoneNumber: user.phoneNumber,
      insurance: user.insurance,
    });
  } catch (error) {
    console.error('Get User Profile Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user profile
const updateUserProfile = async (req, res) => {
  try {
    const updateFields = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      address: req.body.address,
      phoneNumber: req.body.phoneNumber,
    };
    const user = await User.findByIdAndUpdate(req.user.userId, updateFields, { new: true });
    res.json({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      address: user.address,
      phoneNumber: user.phoneNumber,
    });
  } catch (error) {
    console.error('Update User Profile Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Upload insurance document and extract data via OCR
const uploadInsurance = [
  upload.single('file'), // Middleware to handle file upload
  async (req, res) => {
    try {
      const filePath = path.join(__dirname, '../../', req.file.path);
      // Extract data using OCR service
      const extractedData = await ocrService.extractInsuranceData(filePath);

      // Create or update insurance record
      let insurance = await Insurance.findOne({ userId: req.user.userId });
      if (insurance) {
        // Update existing insurance
        insurance.providerName = extractedData.providerName || insurance.providerName;
        insurance.policyNumber = extractedData.policyNumber || insurance.policyNumber;
        insurance.scannedDocuments.push(req.file.path);
        await insurance.save();
      } else {
        // Create new insurance
        insurance = new Insurance({
          userId: req.user.userId,
          providerName: extractedData.providerName,
          policyNumber: extractedData.policyNumber,
          scannedDocuments: [req.file.path],
        });
        await insurance.save();
        // Update user's insurance reference
        await User.findByIdAndUpdate(req.user.userId, { insurance: insurance._id });
      }

      res.json({ message: 'Insurance uploaded successfully', insurance });
    } catch (error) {
      console.error('Upload Insurance Error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },
];

module.exports = {
  getUserProfile,
  updateUserProfile,
  uploadInsurance,
};