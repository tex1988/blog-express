module.exports = function validateSchema(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const validationError = new Error(`Bad param: ${error.details[0].message}`);
      validationError.status = 400;
      throw validationError;
    } else {
      next();
    }
  };
}