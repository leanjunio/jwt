const Joi = require('@hapi/joi');
exports = module.exports = {};

/**
 * Checks if minimum requirements are provided on Registration
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
 * Checks if minimum requirements are provided on Login
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