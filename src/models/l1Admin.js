const mongoose = require('mongoose');

const L1AdminSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  assignedStates: {
    type: [String], // Array of state names
    required: true,
  },
  assignedCities: {
    type: [String], // Array of city names
    required: true,
  },
  temporaryPassword: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    required: true,
  },
});

module.exports = mongoose.model('L1Admin', L1AdminSchema);
