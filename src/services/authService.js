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
const { candidateDataFormat, employerDataFormat, trainingProviderDataFormat } = require('../helpers/dataformat');
const CloudinaryService = require('../utils/cloudinary');

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

  static async registerCandidate(candidateData, files) {
    try {
      const { email } = candidateData;

      // Check if email is verified
      const verification = await EmailVerification.findOne({ email });
      if (!verification || verification.status !== 'VERIFIED') {
        throw handleError(ERROR_TYPES.AUTH_ERROR, 'Email not verified');
      }

      // Format candidate data
      const formattedData = candidateDataFormat(candidateData);

      // Create candidate first to get ID
      const candidate = new Candidate(formattedData);
      const savedCandidate = await candidate.save();

      // Upload files to Cloudinary
      let fileUrls = {};
      try {
        if (files) {
          fileUrls = await CloudinaryService.uploadCandidateFiles(files, savedCandidate._id.toString());
        }

        // Update candidate with file URLs
        if (fileUrls.aadharFile) {
          savedCandidate.aadharFile = fileUrls.aadharFile;
        }
        if (fileUrls.paymentReference) {
          savedCandidate.paymentReference = fileUrls.paymentReference;
        }

        await savedCandidate.save();
      } catch (fileError) {
        // Log file upload error but don't fail registration
        console.error('File upload error:', fileError.message);
        // You might want to set a flag or status indicating file upload failed
      }

      logSuccess('Candidate registration request created', { email });

      return {
        message: 'Candidate registration request submitted',
        candidateId: savedCandidate._id,
        filesUploaded: Object.keys(fileUrls).length > 0
      };
    } catch (error) {
      throw error;
    }
  }

  static async registerEmployer(employerData, file) {
    try {
      const { email } = employerData;

      // Check if email is verified
      const verification = await EmailVerification.findOne({ email });
      if (!verification || verification.status !== 'VERIFIED') {
        throw handleError(ERROR_TYPES.AUTH_ERROR, 'Email not verified');
      }

      // Format employer data
      const formattedData = employerDataFormat(employerData);

      // Create employer record
      const employer = new Employer(formattedData);
      const savedEmployer = await employer.save();

      // Upload file to Cloudinary
      try {
        if (file) {
          const fileUrl = await CloudinaryService.uploadEmployerDocument(file, savedEmployer._id.toString());
          if (fileUrl) {
            savedEmployer.companyDocFile = fileUrl;
            await savedEmployer.save();
          }
        }
      } catch (fileError) {
        // Log file upload error but don't fail registration
        console.error('File upload error:', fileError.message);
      }

      logSuccess('Employer registration request created', { email });

      return {
        message: 'Employer registration request submitted',
        employerId: savedEmployer._id,
        fileUploaded: !!savedEmployer.companyDocFile
      };
    } catch (error) {
      throw error;
    }
  }

  static async registerTrainingProvider(trainingProviderData, file) {
    try {
      const { email } = trainingProviderData;

      // Check if email is verified
      const verification = await EmailVerification.findOne({ email });
      if (!verification || verification.status !== 'VERIFIED') {
        throw handleError(ERROR_TYPES.AUTH_ERROR, 'Email not verified');
      }

      // Format training provider data
      const formattedData = trainingProviderDataFormat(trainingProviderData);

      // Create training provider record
      const trainingProvider = new TrainingProvider(formattedData);
      const savedProvider = await trainingProvider.save();

      // Upload file to Cloudinary
      try {
        if (file) {
          const fileUrl = await CloudinaryService.uploadTrainingProviderDocument(file, savedProvider._id.toString());
          if (fileUrl) {
            savedProvider.agencyDocFile = fileUrl;
            await savedProvider.save();
          }
        }
      } catch (fileError) {
        // Log file upload error but don't fail registration
        console.error('File upload error:', fileError.message);
      }

      logSuccess('Training Provider registration request created', { email });

      return {
        message: 'Training Provider registration request submitted',
        providerId: savedProvider._id,
        fileUploaded: !!savedProvider.agencyDocFile
      };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AuthService;
