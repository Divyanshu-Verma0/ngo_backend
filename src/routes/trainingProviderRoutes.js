const express = require('express');
const router = express.Router();
const TrainingProviderController = require('../controllers/trainingProviderController');
const { authenticate } = require('../middleware/auth');

// Apply authentication middleware
router.use(authenticate);

// Routes for managing candidates and skills
router.put('/skills', TrainingProviderController.editSkills);
router.get('/candidates', TrainingProviderController.getAllAssignedCandidates);
router.get('/candidates/:id', TrainingProviderController.getSingleCandidate);
router.put('/candidates/:id/status', TrainingProviderController.updateCandidateStatus);

module.exports = router;
