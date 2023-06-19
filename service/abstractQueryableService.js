const { validateNumber } = require('../validator/validator');

class AbstractQueryableService {
  AUTHOR = 'author';

  constructor() {}

  getSortParams(params) {
    if (params.sort === this.AUTHOR) {
      return this.#getSortParamsForAuthor(params);
    }
    let key;
    let value;
    params.order ? (value = params.order) : (value = 'desc');
    params.sort ? (key = params.sort) : (key = 'created');
    return { sortBy: [{ [key]: value }] };
  }

  getSearchParams(params, nonSearchParams, textSearchParams) {
    let searchParams = {};
    Object.entries(params).forEach((entry) => {
      const [key, value] = entry;
      if (!nonSearchParams.includes(key)) {
        this.#enrichWithSearchParam(key, value, searchParams, textSearchParams);
      }
    });
    return searchParams;
  }

  getPageParams(params, count) {
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

  #getSortParamsForAuthor(params) {
    let value;
    params.order ? (value = params.order) : (value = 'desc');
    return {
      sortBy: [{ user: { firstName: value } }, { user: { lastName: value } }],
    };
  }

  #enrichWithSearchParam(key, value, searchParams, textSearchParams) {
    if (textSearchParams.includes(key)) {
      this.#enrichWithTextSearchParam(key, value, searchParams);
    } else if (!isNaN(value)) {
      searchParams[key] = Number(value);
    } else {
      searchParams[key] = value;
    }
  }

  #enrichWithTextSearchParam(key, value, searchParams) {
    const newValue = value.trim().split(" ").join(" & ")
    if (key === this.AUTHOR) {
      searchParams.OR = [{ user: { firstName: newValue } }, { user: { lastName: newValue } }];
    } else {
      searchParams[key] = { search: newValue };
    }
  }
}

module.exports = AbstractQueryableService;