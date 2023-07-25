const joi = require('joi')

const postPutPost = joi.object({
  title: joi.string()
    .min(1)
    .max(100)
    .required(),

  content: joi.string()
    .min(50)
    .required(),

  userId: joi.number()
    .integer()
    .positive()
    .min(1)
    .max(9223372036854775807)
});

module.exports = { postPutPost };