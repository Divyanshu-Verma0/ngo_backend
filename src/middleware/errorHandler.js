const { AppError } = require('../utils/errorHandler');
const ResponseHandler = require('../utils/response');
const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
    if (err instanceof AppError) {
        return ResponseHandler.error(res, err);
    }

    // Handle JWT errors
    if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
        const jwtError = new AppError(
            'AUTHENTICATION_ERROR',
            'Invalid or expired token'
        );
        return ResponseHandler.error(res, jwtError);
    }

    // Handle Mongoose validation errors
    if (err.name === 'ValidationError') {
        const validationError = new AppError(
            'VALIDATION_ERROR',
            err.message || 'Validation failed'
        );
        return ResponseHandler.error(res, validationError);
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

module.exports = errorHandler;
