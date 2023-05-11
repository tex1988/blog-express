function isNumber(number) {
  if (isNaN(number)) {
    const error = new Error(`${number} is not a number`);
    error.status = 400;
    throw error;
  }
}

module.exports = { isNumber };