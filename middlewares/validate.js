// Dependencies
const Joi = require("@hapi/joi");

//  Validation
const signUpValidation = Joi.object({
  username: Joi.string().min(4).required(),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
  media: Joi.object().required(),
});
const loginValidation = Joi.object({
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
});
const riderValidation = Joi.object({
  firstname: Joi.string().min(2).required(),
  surname: Joi.string().min(2).required(),
  email: Joi.string().min(6).required().email(),
  phone: Joi.number().min(10).required(),
  password: Joi.string().min(6).required(),
});

module.exports = {
  signUpValidation,
  loginValidation,
  riderValidation,
};
