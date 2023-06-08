function validateNumber(number) {
  if (isNaN(number)) {
    const error = new Error(`${number} is not a number`);
    error.status = 400;
    throw error;
  }
}

function validateParams(params, allowedParams) {
  Object.keys(params).forEach((param) => {
    if (!allowedParams.includes(param)) {
      const error = new Error(`Unsupported param: ${param}`);
      error.status = 400;
      throw error;
    }
  });
}

module.exports = { validateNumber, validateParams };