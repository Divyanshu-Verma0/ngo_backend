const express = require('express');
const router = express.Router();
const JobProviderController = require('../controllers/jobProviderController');
const { authenticate } = require('../middleware/auth');

// Apply authentication middleware
router.use(authenticate);

// Routes for job management
router.post('/jobs', JobProviderController.createJob);
router.put('/jobs/:id', JobProviderController.editJob);
router.delete('/jobs/:id', JobProviderController.deleteJob);

// Routes for assigned candidates
router.get('/candidates', JobProviderController.getAllAssignedCandidates);
router.get('/candidates/:id', JobProviderController.getSingleCandidate);

module.exports = router;
