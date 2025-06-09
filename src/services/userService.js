const { supabaseAdmin } = require('../config/database');
const { handleError, logSuccess } = require('../utils/errorHandler');
const { ERROR_TYPES } = require('../config/constants');

class UserService {
  static async getAllUsers() {
    try {
      const { data, error } = await supabaseAdmin
        .from('users')
        .select('*');

      if (error) {
        throw handleError(ERROR_TYPES.DATABASE_ERROR, error.message);
      }

      logSuccess('Users retrieved successfully', { count: data.length });
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async getUserById(userId) {
    try {
      const { data, error } = await supabaseAdmin
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
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