import { forwardRef, useContext, useImperativeHandle } from 'react';
import { useParams } from 'react-router-dom';
import Comment from './Comment';
import { UserContext } from '../App';
import { isPageExists, isTheSameUser } from '../utils/utils';
import Editor from './Editor';
import styled from 'styled-components';
import Pagination from './Pagination';
import Search from './Search';
import useCommentListQuery from '../hooks/useCommentListQuery';
import useCommentListSearchParams from '../hooks/useCommentListSearchParams';

const NON_SEARCH_PARAMS = ['sort', 'order', 'page', 'size', 'comments', 'search'];
const PAGE_SIZE = 5;

const CommentList = forwardRef((props, ref) => {
  const { user } = useContext(UserContext);
  const { commentCount, setCommentCount, showComments, showCommentsSearch } = props;
  const {
    page,
    setPage,
    sort,
    setSort,
    order,
    setOrder,
    searchQuery,
    setSearchQuery,
    setCommentsSearchParam,
    setSearch
  } = useCommentListSearchParams(NON_SEARCH_PARAMS);
  const { userId, postId } = useParams();
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
  } = useCommentListQuery({ postId, fetchParams, isFetch: showComments, afterDelete, afterSave });

  useImperativeHandle(ref, () => ({
    setCommentsSearchParam,
    setSearch,
  }));

  function getFetchParams(page) {
    const params = { order, sort, size: PAGE_SIZE, page };
    searchQuery && enrichWithSearch(params);
    return params;
  }

  function enrichWithSearch(params) {
    Object.entries(searchQuery).forEach((entry) => {
      const [key, value] = entry;
      params[key] = value;
    });
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
    setCommentsSearchParam(true);
    setCommentCount((prev) => ++prev);
    setPage(1);
    setSort('created');
    setOrder('desc');
    setSearchQuery(null);
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
              defaultSearch={searchQuery}
              setOrder={setOrder}
              setSort={setSort}
              onSearch={setSearchQuery}
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
});

const CommentsWrapper = styled.div.attrs({
  className: 'flex-column',
})`
  margin-top: 10px;
  margin-left: 20px;
`;

export default CommentList;
