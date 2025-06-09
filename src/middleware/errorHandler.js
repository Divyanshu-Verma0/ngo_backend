const { AppError } = require('../utils/errorHandler');
const ResponseHandler = require('../utils/response');
const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
  // If it's already an AppError, handle it directly
  if (err instanceof AppError) {
    return ResponseHandler.error(res, err);
  }

  // Handle Supabase errors
  if (err.code) {
    const supabaseError = handleSupabaseError(err);
    return ResponseHandler.error(res, supabaseError);
  }

  // Handle unexpected errors
  logger.error({
    message: 'Unexpected error occurred',
    error: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method
  });

  const unexpectedError = new AppError(
    'INTERNAL_SERVER_ERROR',
    'An unexpected error occurred'
  );

  return ResponseHandler.error(res, unexpectedError);
};

const handleSupabaseError = (err) => {
  // Map common Supabase errors to our error types
  if (err.code === 'PGRST116') {
    return new AppError('NOT_FOUND_ERROR', 'Resource not found');
  }
  
  if (err.code === '23505') {
    return new AppError('DUPLICATE_ERROR', 'Resource already exists');
  }

  return new AppError('DATABASE_ERROR', err.message || 'Database operation failed');
};

module.exports = errorHandler;