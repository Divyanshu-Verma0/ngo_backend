const express = require('express');
const router = express.Router();
const L1AdminController = require('../controllers/l1AdminController');
const { authenticate } = require('../middleware/auth');
const { validate } = require('../middleware/validation');
// const {
//     updateStatusSchema,
//     adminFilterSchema,
// } = require('../validators/l1AdminValidator');

// Apply authentication middleware to all L1Admin routes
router.use(authenticate);

// Fetch assigned states and cities for admin
router.get('/assigned-regions', L1AdminController.getAssignedRegions);

// Get all candidates, training providers, and employers
router.get('/candidates', L1AdminController.getAllCandidates);
router.get('/training-providers', L1AdminController.getAllTrainingProviders);
router.get('/employers', L1AdminController.getAllEmployers);

// Get single record (by ID)
router.get('/candidates/:id', L1AdminController.getCandidateById);
router.get('/training-providers/:id', L1AdminController.getTrainingProviderById);
router.get('/employers/:id', L1AdminController.getEmployerById);

// Update status
router.put('/update-status/:role/:id', L1AdminController.updateStatus);

module.exports = router;
