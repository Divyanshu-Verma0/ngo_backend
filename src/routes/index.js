const express = require('express');
const router = express.Router();

// Import route modules
const authRoutes = require('./authRoutes');
// const userRoutes = require('./userRoutes');
const trainingProviderRoutes = require('./trainingProviderRoutes');
const employerRoutes = require('./JobProviderRoutes');
const l1adminRoutes = require('./l1adminRoutes');

// Mount routes
router.use('/auth', authRoutes);
router.use('/providers', trainingProviderRoutes);
router.use('/employers', employerRoutes);
router.use('/l1admin', l1adminRoutes);
// router.use('/users', userRoutes);
// Health check endpoint
router.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'NGO Backend API'
  });
});

module.exports = router;
