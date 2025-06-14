const AuthService = require('../services/authService');
const ResponseHandler = require('../utils/response');

class AuthController {
  static async signIn(req, res, next) {
    try {
      const { user, token } = await AuthService.signIn(req.body);

      // Set token in HTTP-only cookie (optional)
      res.cookie('authToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Send over HTTPS in production
        maxAge: 24 * 60 * 60 * 1000 // 1 day
      });

      // Send response
      ResponseHandler.success(res, { user, token }, 'SignIn successful');
    } catch (error) {
      next(error);
    }
  }
  static async logOut(req, res, next) {
    try {
      // Clear the auth token cookie
      res.clearCookie('authToken');
      ResponseHandler.success(res, null, 'LogOut successful');
    } catch (error) {
      next(error);
    }
  }

  static async sendVerificationEmail(req, res, next) {
    try {
      const { email } = req.body;
      const result = await AuthService.sendVerificationEmail(email);
      ResponseHandler.success(res, result, 'Verification email sent successfully');
    } catch (error) {
      next(error);
    }
  }

  static async verifyEmail(req, res, next) {
    try {
      const { email, otp } = req.body;
      const result = await AuthService.verifyEmailOtp(email, otp);
      ResponseHandler.success(res, result, 'Email verified successfully');
    } catch (error) {
      next(error);
    }
  }

  static async registerCandidate(req, res, next) {
    try {
     const result = await AuthService.registerCandidate(req.body, req.files);
      ResponseHandler.created(res, result, 'Candidate registration request submitted');
    } catch (error) {
      next(error);
    }
  }

  static async registerEmployer(req, res, next) {
    try {
      const result = await AuthService.registerEmployer(req.body, req.file);
      ResponseHandler.created(res, result, 'Employer registration request submitted');
    } catch (error) {
      next(error);
    }
  }

  static async registerTrainingProvider(req, res, next) {
    try {
       const result = await AuthService.registerTrainingProvider(req.body, req.file);
      ResponseHandler.created(res, result, 'Training Provider registration request submitted');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;
