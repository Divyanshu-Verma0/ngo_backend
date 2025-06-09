const Joi = require('joi');

const createAgencySchema = Joi.object({
  agency_name: Joi.string().required().messages({
    'any.required': 'Agency name is required'
  }),
  courses: Joi.array().required().messages({
    'any.required': 'Courses are required'
  }),
  branches: Joi.array().required().messages({
    'any.required': 'Branches are required'
  }),
  mobile: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
    'string.pattern.base': 'Mobile number must be 10 digits',
    'any.required': 'Mobile number is required'
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email address',
    'any.required': 'Email is required'
  }),
  alternate_email: Joi.string().email().allow('').messages({
    'string.email': 'Please provide a valid alternate email address'
  }),
  landline: Joi.string().allow(''),
  primary_contact_person: Joi.string().required().messages({
    'any.required': 'Primary contact person is required'
  }),
  secondary_contact_person: Joi.string().allow(''),
  address: Joi.string().required().messages({
    'any.required': 'Address is required'
  }),
  certifications: Joi.array().allow(null)
});

module.exports = {
  createAgencySchema
};