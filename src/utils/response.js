const { logSuccess } = require('./errorHandler');

class ResponseHandler {
  static success(res, data, message = 'Operation successful', statusCode = 200) {
    const response = {
      success: true,
      message,
      data,
      timestamp: new Date().toISOString()
    };
    
    logSuccess(message, { statusCode, dataLength: Array.isArray(data) ? data.length : 1 });
    return res.status(statusCode).json(response);
  }

  static error(res, error) {
    const response = {
      success: false,
      error: {
        type: error.type,
        message: error.message
      },
      timestamp: new Date().toISOString()
    };

    return res.status(error.statusCode).json(response);
  }

  static created(res, data, message = 'Resource created successfully') {
    return this.success(res, data, message, 201);
  }
}

module.exports = ResponseHandler;