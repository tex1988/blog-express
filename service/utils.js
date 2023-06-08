const { validateNumber } = require('../validator/validator');

function getPageParams(params, count) {
  let page;
  let size;
  if (params?.page && params.size) {
    validateNumber(params.page);
    validateNumber(params.size);
    page = Number(params.page);
    size = Number(params.size);
  } else {
    page = 1;
    size = Number(count);
  }
  const skip = (page - 1) * size;
  return { skip, take: size };
}

module.exports = { getPageParams };