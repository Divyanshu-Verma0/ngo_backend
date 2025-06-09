const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const { validate } = require('../middleware/validation');
const { signupSchema, loginSchema } = require('../validators/authValidator');

router.post('/signup', validate(signupSchema), AuthController.signUp);
router.post('/login', validate(loginSchema), AuthController.signIn);

module.exports = router;