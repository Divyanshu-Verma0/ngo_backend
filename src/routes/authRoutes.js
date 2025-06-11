const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const { validate } = require('../middleware/validation');
const {
  signupSchema,
  loginSchema,
  candidateRegisterSchema,
  agencyRegisterSchema,
  employerRegisterSchema
} = require('../validators/authValidator');

// router.post('/signup', validate(signupSchema), AuthController.signUp);
router.post('/login', validate(loginSchema), AuthController.logIn);

router.post('/register/candidate', validate(candidateRegisterSchema), AuthController.registerCandidate);
router.post('/register/agency', validate(agencyRegisterSchema), AuthController.registerAgency);
router.post('/register/employer', validate(employerRegisterSchema), AuthController.registerEmployer);

module.exports = router;
