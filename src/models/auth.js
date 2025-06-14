const mongoose = require('mongoose');

const AuthSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['L1_ADMIN', 'L2_ADMIN', 'EMPLOYER', 'AGENCY'],
    required: true,
  },
  trainingProviderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TrainingProvider',
  },
  employerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employer',
  },
  l1AdminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'L1Admin',
  }
});

const Auth = mongoose.model('Auth', AuthSchema);

module.exports = Auth;