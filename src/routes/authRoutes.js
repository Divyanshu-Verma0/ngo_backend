const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const { validate } = require('../middleware/validation');
const {
  candidateRegisterSchema,
  employerRegisterSchema,
  trainingProviderRegisterSchema,
} = require('../validators/authValidator');

//login
router.post('/login', AuthController.signIn);
//logOut
router.post('/logout', AuthController.logOut);

// Candidate Registration
router.post('/candidate/register', validate(candidateRegisterSchema), AuthController.registerCandidate);

// Employer Registration
router.post('/employer/register', validate(employerRegisterSchema), AuthController.registerEmployer);

// Training Provider Registration
router.post('/training-provider/register', validate(trainingProviderRegisterSchema), AuthController.registerTrainingProvider);

// Email Verification
router.post('/verify-email', AuthController.verifyEmail);

module.exports = router;
