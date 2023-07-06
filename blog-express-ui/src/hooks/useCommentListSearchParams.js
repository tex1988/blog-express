import useDefaultSearchParams from './useDefaultSearchParams';

export default function useCommentListSearchParams(nonSearchParams)  {
  const {
    page,
    setPage,
    sort,
    setSort,
    order,
    setOrder,
    searchQuery,
    setSearchQuery,
    searchParams,
    setSearchParams,
  } = useDefaultSearchParams(nonSearchParams);
  const { search, commentsSearchParam } = getAdditionalParams();

  function getAdditionalParams() {
    const params = Object.fromEntries(searchParams);
    const { search, comments } = params;
    const additionalParams = {};
    Object.assign(
      additionalParams,
      search === 'true' || search === 'false' ? { search } : { search: false },
      comments === 'true' || comments === 'false'
        ? { commentsSearchParam: comments }
        : { commentsSearchParam: false },
    );
    return additionalParams;
  }

  function setCommentsSearchParam(value) {
    if (value && value === true) {
      searchParams.set('comments', value);
      setSearchParams(Object.fromEntries(searchParams));
    } else {
      searchParams.delete('comments');
      setSearchParams(Object.fromEntries(searchParams));
    }
  }

  function setSearch(value) {
    if (value && value === true) {
      searchParams.set('search', value);
      setSearchParams(Object.fromEntries(searchParams));
    } else {
      searchParams.delete('search');
      setSearchParams(Object.fromEntries(searchParams));
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
    setSearch,
  };
}