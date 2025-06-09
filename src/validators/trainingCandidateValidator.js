const Joi = require('joi');

const createCandidateSchema = Joi.object({
  first_name: Joi.string().required().messages({
    'any.required': 'First name is required'
  }),
  middle_name: Joi.string().allow(''),
  last_name: Joi.string().required().messages({
    'any.required': 'Last name is required'
  }),
  qualification: Joi.object().required().messages({
    'any.required': 'Qualification is required'
  }),
  state: Joi.object().required().messages({
    'any.required': 'State is required'
  }),
  city: Joi.object().required().messages({
    'any.required': 'City is required'
  }),
  family_income: Joi.object().required().messages({
    'any.required': 'Family income is required'
  }),
  course: Joi.object().required().messages({
    'any.required': 'Course is required'
  }),
  mobile: Joi.number().required().messages({
    'any.required': 'Mobile number is required',
    'number.base': 'Mobile number must be numeric'
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email address',
    'any.required': 'Email is required'
  })
});

module.exports = {
  createCandidateSchema
};