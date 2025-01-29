const mongoose = require('mongoose');

const EmailVerificationSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  code: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 600 // 10 minutes
  },
  attempts: {
    type: Number,
    default: 0,
    max: 5
  }
});

module.exports = mongoose.model('EmailVerification', EmailVerificationSchema);