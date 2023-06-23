import useDefaultSearchParams from './useDefaultSearchParams';
import { useSearchParams } from 'react-router-dom';

export default function useCommentListSearchParams(nonSearchParams)  {
  const [searchParams, setSearchParams] = useSearchParams();
  const { page, setPage, sort, setSort, order, setOrder, searchQuery, setSearchQuery } = useDefaultSearchParams(nonSearchParams);
  const { search, commentsSearchParam } = getAdditionalParams();

  function getAdditionalParams() {
    const params = Object.fromEntries(searchParams);
    const { search, comments } = params;
    const additionalParams = {};
    Object.assign(
      additionalParams,
      search === 'true' || search === 'false' 
        ? { search }
        : { search: false },
      comments === 'true' || comments === 'false'
        ? { commentsSearchParam: comments }
        : { commentsSearchParam: false },
    );
    return additionalParams;
  }

  function setCommentsSearchParam(value) {
    if (value && value === true) {
      searchParams.set('comments', value);
      setSearchParams(searchParams);
    } else {
      searchParams.delete('comments');
      setSearchParams(searchParams);
    }
  }

  function setSearch(value) {
    if (value && value === true) {
      searchParams.set('search', value);
      setSearchParams(searchParams);
    } else {
      searchParams.delete('search');
      setSearchParams(searchParams);
    }
  }

  return {
    page,
    setPage,
    sort,
    setSort,
    order,
    setOrder,
    searchQuery,
    setSearchQuery,
    commentsSearchParam,
    setCommentsSearchParam,
    search,
    setSearch
  };
}