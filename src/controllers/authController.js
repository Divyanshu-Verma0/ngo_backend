const AuthService = require('../services/authService');
const ResponseHandler = require('../utils/response');

class AuthController {
  static async signUp(req, res, next) {
    try {
      const result = await AuthService.signUp(req.body);
      ResponseHandler.created(res, result, 'User registered successfully');
    } catch (error) {
      next(error);
    }
  }

  static async signIn(req, res, next) {
    try {
      const { email, password } = req.body;
      const result = await AuthService.signIn(email, password);
      ResponseHandler.success(res, result, 'Login successful');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;
