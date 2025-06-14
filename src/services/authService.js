const EmailVerification = require('../models/emailVerification');
const Candidate = require('../models/candidate');
const { Employer } = require('../models/employer');
const TrainingProvider = require('../models/trainingProvider');
const nodemailer = require('nodemailer');
const { handleError, logSuccess } = require('../utils/errorHandler');
const { ERROR_TYPES } = require('../config/constants');
const Auth = require('../models/auth');
const JWT_SECRET = process.env.JWT_SECRET;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class AuthService {
    //signIn
  static async signIn(userData) {
    try {
      const { email, password } = userData;

      const user = await Auth.findOne({ email });
      if (!user) {
        throw handleError(ERROR_TYPES.AUTHENTICATION_ERROR, 'Invalid credentials');
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw handleError(ERROR_TYPES.AUTHENTICATION_ERROR, 'Invalid credentials');
      }

      // Generate JWT token
      const token = jwt.sign(
        { id: user._id, role: user.role },
        JWT_SECRET,
        { expiresIn: '1d' } // Token valid for 1 day
      );

      return { user, token };
    } catch (error) {
      throw error;
    }
  }
  // Email verification service
  static async sendVerificationEmail(email) {
    try {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      // Save OTP to the EmailVerification collection
      await EmailVerification.findOneAndUpdate(
        { email },
        { otp, status: 'PENDING' },
        { upsert: true, new: true }
      );

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Email Verification OTP',
        text: `Your OTP is: ${otp}`,
      });

      logSuccess('Verification email sent successfully', { email });

      return { message: 'OTP sent successfully', email };
    } catch (error) {
      throw handleError(ERROR_TYPES.INTERNAL_ERROR, error.message);
    }
  }

  // Verify OTP
  static async verifyEmailOtp(email, otp) {
    try {
      const verification = await EmailVerification.findOne({ email });

      if (!verification || verification.otp !== otp) {
        throw handleError(ERROR_TYPES.VALIDATION_ERROR, 'Invalid OTP');
      }

      verification.status = 'VERIFIED';
      await verification.save();

      logSuccess('Email verified successfully', { email });

      return { message: 'Email verified successfully' };
    } catch (error) {
      throw error;
    }
  }

  static async registerCandidate(candidateData) {
    try {
      const { email } = candidateData;

      // Check if email is verified
      const verification = await EmailVerification.findOne({ email });
      if (!verification || verification.status !== 'VERIFIED') {
        throw handleError(ERROR_TYPES.AUTH_ERROR, 'Email not verified');
      }

      // Create Candidate record (status PENDING)
      const candidate = new Candidate({
        ...candidateData,
        status: 'PENDING',
      });

      await candidate.save();

      logSuccess('Candidate registration request created', { email });

      return { message: 'Candidate registration request submitted' };
    } catch (error) {
      throw error;
    }
  }

  static async registerEmployer(employerData) {
    try {
      const { email } = employerData;

      // Check if email is verified
      const verification = await EmailVerification.findOne({ email });
      if (!verification || verification.status !== 'VERIFIED') {
        throw handleError(ERROR_TYPES.AUTH_ERROR, 'Email not verified');
      }

      // Create Employer record (status PENDING)
      const employer = new Employer({
        ...employerData,
        status: 'PENDING',
      });

      await employer.save();

      logSuccess('Employer registration request created', { email });

      return { message: 'Employer registration request submitted' };
    } catch (error) {
      throw error;
    }
  }

  static async registerTrainingProvider(trainingProviderData) {
    try {
      const { email } = trainingProviderData;

      // Check if email is verified
      const verification = await EmailVerification.findOne({ email });
      if (!verification || verification.status !== 'VERIFIED') {
        throw handleError(ERROR_TYPES.AUTH_ERROR, 'Email not verified');
      }

      // Create Training Provider record (status PENDING)
      const trainingProvider = new TrainingProvider({
        ...trainingProviderData,
        status: 'PENDING',
      });

      await trainingProvider.save();

      logSuccess('Training Provider registration request created', { email });

      return { message: 'Training Provider registration request submitted' };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AuthService;
