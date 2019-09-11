const Joi = require('@hapi/joi');
exports = module.exports = {};

/**
 * Validates the name, email, and password provided by the user
 */
exports.registerValidation = data => {
  const schema = {
    name: Joi
      .string()
      .min(6)
      .required(),
    email: Joi
      .string()
      .min(6)
      .required()
      .email(),
    password: Joi
      .string()
      .min(6)
      .required()
  };

  return Joi.validate(data, schema);
};

/**
 * Validates the email and password provided by the user
 */
exports.loginValidation = data => {
  const schema = {
  email: Joi
    .string()
    .min(6)
    .required()
    .email(),
  password: Joi
    .string()
    .min(6)
    .required()
  };

  return Joi.validate(data, schema);
};