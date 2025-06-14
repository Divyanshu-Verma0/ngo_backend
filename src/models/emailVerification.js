const mongoose = require('mongoose');

const emailVerificationSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  otp: { type: String, required: true },
  status: { type: String, enum: ['PENDING', 'VERIFIED'], default: 'PENDING' },
  createdAt: { type: Date, default: Date.now, expires: 300 }, // OTP expires in 5 minutes
});

module.exports = mongoose.model('EmailVerification', emailVerificationSchema);
