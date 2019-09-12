const Joi = require('@hapi/joi');
exports = module.exports = {};

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