const mongoose = require('mongoose');

const InsuranceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  providerName: {
    type: String,
  },
  policyNumber: {
    type: String,
  },
  scannedDocuments: [
    {
      type: String, // URLs or file paths to the scanned documents
    },
  ],
  verificationStatus: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending',
  },
});

module.exports = mongoose.model('Insurance', InsuranceSchema);