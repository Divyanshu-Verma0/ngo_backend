const { handleError } = require('../utils/errorHandler');
const { ERROR_TYPES } = require('../config/constants');

const validate = (schema) => {
  return (req, res, next) => {
    try {
      const { error } = schema.validate(req.body, { abortEarly: false });
      
      if (error) {
        const errorMessage = error.details.map(detail => detail.message).join(', ');
        throw handleError(ERROR_TYPES.VALIDATION_ERROR, errorMessage);
      }
      
      next();
    } catch (err) {
      next(err);
    }
  };
};

module.exports = { validate };