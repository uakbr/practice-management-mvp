const mongoose = require('mongoose');

const InsuranceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  providerName: String,
  policyNumber: String,
  scannedDocuments: [String],
  verificationStatus: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending',
  },
});

module.exports = mongoose.model('Insurance', InsuranceSchema);