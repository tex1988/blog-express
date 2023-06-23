import { useNavigate, useSearchParams } from 'react-router-dom';
import { forEachObjectEntry } from '../utils/utils';
import { useEffect } from 'react';

export default function usePostListSearchParams(defaultSearchParams) {
  const [searchParams, setSearchParams] = useSearchParams(defaultSearchParams);
  const { page, sort, order, search } = getParams();
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`?${searchParams.toString()}`, { replace: true });
  }, []);

  function getParams() {
    const params = Object.fromEntries(searchParams);
    const { page, sort, order } = params;
    const search = getSearchParam(params);
    const defaultParams = { page: Number(page), sort, order };
    Object.assign(defaultParams, search ? { search } : { search: null });
    return defaultParams;
  }

  function getSearchParam(params) {
    const nonSearchParams = ['sort', 'order', 'page', 'size'];
    let searchParams = { ...params };
    nonSearchParams.forEach((param) => delete searchParams[param]);
    if (Object.keys(searchParams).length === 0) {
      searchParams = null;
    }
    return searchParams;
  }

  function setPage(page) {
    searchParams.set('page', page);
    setSearchParams(searchParams);
  }

  function setOrder(order) {
    searchParams.set('order', order);
    setSearchParams(searchParams);
  }

  function setSort(sort) {
    searchParams.set('sort', sort);
    setSearchParams(searchParams);
  }

  function setSearch(searchValue) {
    if (searchValue) {
      forEachObjectEntry(searchValue, (key, value) => searchParams.set(key, value));
    } else {
      forEachObjectEntry(search, (key) => searchParams.delete(key));
    }
    searchParams.set('page', '1');
    setSearchParams(searchParams);
  }

  return { page, setPage, sort, setSort, order, setOrder, search, setSearch };
}