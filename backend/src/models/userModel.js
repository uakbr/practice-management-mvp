const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  roles: {
    type: [String],
    default: ['patient'],
  },
  
  // Added fields for profile management
  address: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  insurance: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Insurance',
  },
});

module.exports = mongoose.model('User', UserSchema);