const AuthService = require('../services/authService');
const ResponseHandler = require('../utils/response');

class AuthController {
  // static async signUp(req, res, next) {
  //   try {
  //     const result = await AuthService.signUp(req.body);
  //     ResponseHandler.created(res, result, 'User registered successfully');
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  static async logIn(req, res, next) {
    try {
      const { email, password } = req.body;
      const result = await AuthService.logIn(email, password);
      ResponseHandler.success(res, result, 'Login successful');
    } catch (error) {
      next(error);
    }
  }

  static async registerCandidate(req, res, next) {
    try {
      const result = await AuthService.registerCandidate(req.body);
      ResponseHandler.created(res, result, 'Candidate registered successfully');
    } catch (error) {
      next(error);
    }
  }

  static async registerAgency(req, res, next) {
    try {
      const result = await AuthService.registerAgency(req.body);
      ResponseHandler.created(res, result, 'Agency registered successfully');
    } catch (error) {
      next(error);
    }
  }

  static async registerEmployer(req, res, next) {
    try {
      const result = await AuthService.registerEmployer(req.body);
      ResponseHandler.created(res, result, 'Employer registered successfully');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;
