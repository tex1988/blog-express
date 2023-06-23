import { useNavigate, useSearchParams } from 'react-router-dom';
import { forEachObjectEntry } from '../utils/utils';
import { useEffect } from 'react';

const defaultSearchParams = {
  page: '1',
  sort: 'created',
  order: 'desc',
};

export default function useDefaultSearchParams(nonSearchParams) {
  const [searchParams, setSearchParams] = useSearchParams(defaultSearchParams);
  const { page, sort, order, searchQuery } = getParams();
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`?${searchParams.toString()}`, { replace: true });
  }, []);

  function getParams() {
    const params = Object.fromEntries(searchParams);
    const { page, sort, order } = params;
    const searchQuery = getSearchParam(params);
    const defaultParams = { page: Number(page), sort, order };
    Object.assign(defaultParams, searchQuery ? { searchQuery } : { search: null });
    return defaultParams;
  }

  function getSearchParam(params) {
    let searchParams = { ...params };
    nonSearchParams.forEach((param) => delete searchParams[param]);
    if (Object.keys(searchParams).length === 0) {
      searchParams = null;
    }
    return searchParams;
  }

  function setPage(value) {
    searchParams.set('page', value);
    setSearchParams(searchParams);
  }

  function setOrder(value) {
    searchParams.set('order', value);
    setSearchParams(searchParams);
  }

  function setSort(value) {
    searchParams.set('sort', value);
    setSearchParams(searchParams);
  }

  function setSearchQuery(searchQueryValue) {
    if (searchQueryValue) {
      forEachObjectEntry(searchQueryValue, (key, value) => searchParams.set(key, value));
    } else {
      forEachObjectEntry(searchQuery, (key) => searchParams.delete(key));
    }
    searchParams.set('page', '1');
    setSearchParams(searchParams);
  }

  return { page, setPage, sort, setSort, order, setOrder, searchQuery, setSearchQuery: setSearchQuery };
}