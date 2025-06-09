const express = require('express');
const router = express.Router();
const TrainingAgencyController = require('../controllers/trainingAgencyController');
const { authenticate } = require('../middleware/auth');
const { validate } = require('../middleware/validation');
const { createAgencySchema } = require('../validators/trainingAgencyValidator');

// Create a training agency
router.post('/', authenticate, validate(createAgencySchema), TrainingAgencyController.createAgency);

// Get all training agencies
router.get('/', authenticate, TrainingAgencyController.getAllAgencies);

// Get training agency by ID
router.get('/:id', authenticate, TrainingAgencyController.getAgencyById);

module.exports = router;