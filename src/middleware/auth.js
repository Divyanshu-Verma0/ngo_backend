const { supabaseAuth } = require('../config/database');
const { handleError } = require('../utils/errorHandler');
const { ERROR_TYPES } = require('../config/constants');

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw handleError(ERROR_TYPES.AUTHENTICATION_ERROR, 'No valid token provided');
    }

    const token = authHeader.split('Bearer ')[1];
    
    const { data, error } = await supabaseAuth.auth.getUser(token);
    
    if (error || !data.user) {
      throw handleError(ERROR_TYPES.AUTHENTICATION_ERROR, 'Invalid or expired token');
    }

    req.user = data.user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { authenticate };