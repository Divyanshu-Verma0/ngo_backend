const express = require('express');
const router = express.Router();
const TrainingCandidateController = require('../controllers/trainingCandidateController');
const { authenticate } = require('../middleware/auth');
const { validate } = require('../middleware/validation');
const { createCandidateSchema } = require('../validators/trainingCandidateValidator');

// Create a training candidate
router.post('/', authenticate, validate(createCandidateSchema), TrainingCandidateController.createCandidate);

// Get all training candidates
router.get('/', authenticate, TrainingCandidateController.getAllCandidates);

// Get training candidate by ID
router.get('/:id', authenticate, TrainingCandidateController.getCandidateById);

module.exports = router;