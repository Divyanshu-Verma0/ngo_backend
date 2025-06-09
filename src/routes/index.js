const express = require('express');
const router = express.Router();

// Import route modules
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const trainingAgencyRoutes = require('./trainingAgencyRoutes');
const trainingCandidateRoutes = require('./trainingCandidateRoutes');

// Mount routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/agencies', trainingAgencyRoutes);
router.use('/candidates', trainingCandidateRoutes);

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'NGO Backend API'
  });
});

module.exports = router;