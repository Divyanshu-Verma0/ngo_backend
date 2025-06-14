const Auth = require('../models/auth');
const { handleError, logSuccess } = require('../utils/errorHandler');
const { ERROR_TYPES } = require('../config/constants');

class UserService {

  static async getAllUsers() {
    try {
      const users = await Auth.find();

      if (users.length === 0) {
        throw handleError(ERROR_TYPES.NOT_FOUND_ERROR, 'Users not found');
      }

      logSuccess('Users retrieved successfully');
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async getUserById(userId) {
    try {
      const user = await Auth.findById(userId);

      if (!user) {
        throw handleError(ERROR_TYPES.NOT_FOUND_ERROR, 'User not found');
      }

      logSuccess('User retrieved successfully', { userId });
      return data;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserService;