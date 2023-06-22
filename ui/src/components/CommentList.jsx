import { useContext, useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import Comment from './Comment';
import { UserContext } from '../App';
import { isPageExists, isTheSameUser } from '../../utils/utils';
import Editor from './Editor';
import styled from 'styled-components';
import Pagination from './Pagination';
import Search from './Search';
import useCommentListQuery from '../hooks/useCommentListQuery';

const CommentList = (props) => {
  const PAGE_SIZE = 5;
  const { user } = useContext(UserContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const { showComments, showCommentsSearch, commentCount, setCommentCount, setShowComments } = props;
  const { defaultPage, defaultSort, defaultOrder, defaultSearch } = getDefaultParams();
  const { userId, postId } = useParams();
  const [page, setPage] = useState(defaultPage);
  const [order, setOrder] = useState(defaultOrder);
  const [sort, setSort] = useState(defaultSort);
  const [search, setSearch] = useState(defaultSearch);
  const fetchParams = getFetchParams(page);
  const isCanLeftAComment = user && !isTheSameUser(user, userId);
  const {
    isSuccess,
    isLoading,
    comments,
    pageCount,
    saveComment,
    editComment,
    deleteComment,
  } = useCommentListQuery({ postId, fetchParams, showComments, afterDelete, afterSave });

  useEffect(() => {
    setSearchParams(new URLSearchParams(getSearchParams()));
  }, [page, order, sort, search]);

  function getSearchParams() {
    const { comments, search } = Object.fromEntries(searchParams);
    const newSearchParams = { ...fetchParams };
    Object.assign(
      newSearchParams,
      comments === 'true' || comments === 'false'
        ? { comments: JSON.parse(comments.toLocaleLowerCase()) }
        : { comments: false },
      search === 'true' || search === 'false'
        ? { search: JSON.parse(search.toLocaleLowerCase()) }
        : { search: false },
    );
    return new URLSearchParams(newSearchParams);
  }

  function getFetchParams(page) {
    const params = { order, sort, size: PAGE_SIZE, page };
    search && enrichWithSearch(params);
    return params;
  }

  function enrichWithSearch(params) {
    Object.entries(search).forEach((entry) => {
      const [key, value] = entry;
      params[key] = value;
    });
  }

  function getDefaultParams() {
    const params = Object.fromEntries(searchParams);
    const { page, sort, order, comments, search } = params;
    const defaultSearch = getSearchParam(params);
    const defaultParams = {};
    Object.assign(
      defaultParams,
      (comments === 'true' || comments === 'false')
        ? { defaultShowComments: JSON.parse(comments.toLocaleLowerCase()) }
        : { defaultShowComments: false },
      (search === 'true' || search === 'false')
        ? { defaultShowCommentsSearch: JSON.parse(search.toLocaleLowerCase()) }
        : { defaultShowCommentsSearch: false },
      page ? { defaultPage: Number(page) } : { defaultPage: 1 },
      sort ? { defaultSort: sort } : { defaultSort: 'created' },
      order ? { defaultOrder: order } : { defaultOrder: 'desc' },
      defaultSearch ? { defaultSearch } : null,
    );
    return defaultParams;
  }

  function getSearchParam(params) {
    const nonSearchParams = ['sort', 'order', 'page', 'size', 'comments', 'search'];
    let searchParams = { ...params };
    nonSearchParams.forEach((param) => delete searchParams[param]);
    if (Object.keys(searchParams).length === 0) {
      searchParams = null;
    }
    return searchParams;
  }

  function onSearch(search) {
    setSearch(search);
    setPage(1);
  }

  function onCommentSave(content) {
    const comment = {
      content: content,
      userId: user.userId,
      postId: postId,
    };
    saveComment(comment);
  }

  function afterSave() {
    setCommentCount((prev) => ++prev);
    setShowComments(true);
    setPage(1);
  }

  function afterDelete() {
    let newPage = page;
    if (!isPageExists(commentCount - 1, PAGE_SIZE, page)) {
      newPage--;
    }
    setCommentCount((prev) => --prev);
    setPage(newPage);
  }

  function getSortOptions() {
    return [
      { value: 'created', label: 'creation date' },
      { label: 'author', value: 'author' },
    ];
  }

  function getSearchOptions() {
    return [
      { value: 'content', label: 'content' },
      { label: 'author', value: 'author' },
    ];
  }

  function getComments() {
    if (isSuccess && comments.length > 0) {
      return comments.map((comment) => (
        <Comment
          key={`comment_${comment.commentId}`}
          comment={{ ...comment }}
          onCommentUpdate={editComment}
          onCommentDelete={deleteComment}
        />
      ));
    }
  }

  return (
    <CommentsWrapper>
      {showComments && (
        <>
          {showCommentsSearch && commentCount > 0 && (
            <Search
              sortOptions={getSortOptions()}
              searchOptions={getSearchOptions()}
              defaultSort={sort}
              defaultOrder={order}
              defaultSearch={defaultSearch}
              setOrder={setOrder}
              setSort={setSort}
              onSearch={onSearch}
            />
          )}
          {getComments()}
          {pageCount > 1 && (
            <Pagination
              page={page - 1}
              pageCount={pageCount}
              pageRangeDisplayed={PAGE_SIZE}
              onPageChange={setPage}
            />
          )}
        </>
      )}
      <div className="flex-column" style={{ width: '100%' }}>
        {isCanLeftAComment && (
          <Editor
            onSave={(content) => onCommentSave(content)}
            useTitle={false}
            useCancel={false}
            saveLabel={'Left a comment'}
          />
        )}
      </div>
    </CommentsWrapper>
  );
};

const CommentsWrapper = styled.div.attrs({
  className: 'flex-column',
})`
  margin-top: 10px;
  margin-left: 20px;
`;

export default CommentList;
