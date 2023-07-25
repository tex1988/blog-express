const joi = require('joi')

const postUser = joi.object({
  username: joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),

  firstName: joi.string()
    .empty('')
    .pattern(new RegExp('^[a-zA-Z]'))
    .min(1)
    .max(50),

  lastName: joi.string()
    .empty('')
    .pattern(new RegExp('^[a-zA-Z]'))
    .min(1)
    .max(50),

  email: joi.string()
    .email()
    .required()
    .max(100),

  password: joi.string()
    .alphanum()
    .min(4)
    .max(100)
});

const putUser = joi.object({
  firstName: joi.string()
    .pattern(new RegExp('^[a-zA-Z]'))
    .min(1)
    .max(50),

  lastName: joi.string()
    .pattern(new RegExp('^[a-zA-Z]'))
    .min(1)
    .max(50),

  password: joi.string()
    .alphanum()
    .min(4)
    .max(100)
});

module.exports = { postUser, putUser };