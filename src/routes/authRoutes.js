const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const { validate } = require('../middleware/validation');
const { uploadCandidateFiles, uploadEmployerFile, 
  uploadTrainingProviderFile, handleMulterError } = require('../middleware/upload');
// const { candidateRegisterSchema, employerRegisterSchema, trainingProviderRegisterSchema } = require('../validators/authValidator');

// Apply multer error handling middleware
router.use(handleMulterError);

//login
router.post('/login', AuthController.signIn);
//logOut
router.post('/logout', AuthController.logOut);

// Email Verification
router.post('/send-verification-email', AuthController.sendVerificationEmail);
router.post('/verify-email', AuthController.verifyEmail);

// Candidate Registration (with file uploads)
router.post('/candidate/register', uploadCandidateFiles, AuthController.registerCandidate);

// Employer Registration (with file upload)
router.post('/employer/register', uploadEmployerFile, AuthController.registerEmployer);

// Training Provider Registration (with file upload)
router.post('/training-provider/register', uploadTrainingProviderFile, AuthController.registerTrainingProvider);

module.exports = router;