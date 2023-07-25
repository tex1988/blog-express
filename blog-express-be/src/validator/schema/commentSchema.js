const joi = require('joi')

const postComment = joi.object({
  content: joi.string()
    .min(2)
    .required(),

  userId: joi.number()
    .integer()
    .positive()
    .min(1)
    .max(9223372036854775807)
    .required(),

  postId: joi.number()
    .integer()
    .positive()
    .min(1)
    .max(9223372036854775807)
    .required(),
});

const putComment = joi.object({
  content: joi.string()
    .min(2)
    .required()
});

module.exports = { postComment, putComment };