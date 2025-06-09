const logger = require('./logger');
const { ERROR_TYPES, HTTP_STATUS, ERROR_MESSAGES } = require('../config/constants');

class AppError extends Error {
  constructor(type, message, statusCode = null) {
    super(message);
    this.type = type;
    this.statusCode = statusCode || this.getStatusCodeFromType(type);
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }

  getStatusCodeFromType(type) {
    const statusCodeMap = {
      [ERROR_TYPES.VALIDATION_ERROR]: HTTP_STATUS.BAD_REQUEST,
      [ERROR_TYPES.AUTHENTICATION_ERROR]: HTTP_STATUS.UNAUTHORIZED,
      [ERROR_TYPES.AUTHORIZATION_ERROR]: HTTP_STATUS.FORBIDDEN,
      [ERROR_TYPES.NOT_FOUND_ERROR]: HTTP_STATUS.NOT_FOUND,
      [ERROR_TYPES.DUPLICATE_ERROR]: HTTP_STATUS.CONFLICT,
      [ERROR_TYPES.DATABASE_ERROR]: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      [ERROR_TYPES.BAD_REQUEST_ERROR]: HTTP_STATUS.BAD_REQUEST,
      [ERROR_TYPES.INTERNAL_SERVER_ERROR]: HTTP_STATUS.INTERNAL_SERVER_ERROR
    };
    return statusCodeMap[type] || HTTP_STATUS.INTERNAL_SERVER_ERROR;
  }
}

// Smart error handler function
const handleError = (type, message, context = {}) => {
  const error = new AppError(type, message);
  
  // Log error with context
  logger.error({
    type: error.type,
    message: error.message,
    statusCode: error.statusCode,
    context,
    stack: error.stack
  });

  return error;
};

// Success logger
const logSuccess = (message, context = {}) => {
  logger.info({
    message,
    context,
    timestamp: new Date().toISOString()
  });
};

module.exports = {
  AppError,
  handleError,
  logSuccess
};
