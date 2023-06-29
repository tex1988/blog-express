import { forwardRef, useImperativeHandle, useState } from 'react';
import { useParams } from 'react-router-dom';
import Comment from './Comment';
import { isPageExists, isTheSameUser } from '../utils/utils';
import Editor from './Editor';
import styled from 'styled-components';
import Pagination from './ui/Pagination';
import Search from './Search';
import useCommentListQuery from '../hooks/useCommentListQuery';
import useCommentListSearchParams from '../hooks/useCommentListSearchParams';
import useAuthContext from '../hooks/useAuthContext';
import Empty from './ui/Empty';
import CommentSkeleton from './skeleton/CommentSkeleton';

const NON_SEARCH_PARAMS = ['sort', 'order', 'page', 'size', 'comments', 'search'];
const PAGE_SIZE = 5;

const CommentList = forwardRef((props, ref) => {
  const { user } = useAuthContext();
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
    setSearch,
  } = useCommentListSearchParams(NON_SEARCH_PARAMS);
  const { userId, postId } = useParams();
  const fetchParams = getFetchParams(page);
  const isCanLeftAComment = user && !isTheSameUser(user, userId);
  const [editedCommentId, setEditedCommentId] = useState(null);
  const [deletedCommentId, setDeletedCommentId] = useState(null);
  const { isSuccess, comments, pageCount, saveComment, isSaveLoading, editComment, isEditLoading, deleteComment, isDeleteLoading } =
    useCommentListQuery({ postId, fetchParams, isFetch: showComments, afterDelete, afterSave, afterEdit });

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
    setDeletedCommentId(null);
    setCommentCount((prev) => --prev);
    setPage(newPage);
  }

  function afterEdit() {
    setEditedCommentId(null);
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

  function onDeleteComment(commentId) {
    deleteComment(commentId);
    setDeletedCommentId(commentId);
  }

  function getComments() {
    if (isSuccess && comments.length > 0) {
      return comments.map((comment) => {
        const commentId = comment.commentId;
        return editedCommentId !== commentId ? (
          isDeleteLoading && deletedCommentId === commentId ? (
            <CommentSkeleton />
          ) : (
            <Comment
              key={`comment_${commentId}`}
              comment={{ ...comment }}
              onCommentUpdate={setEditedCommentId}
              onCommentDelete={onDeleteComment}
            />
          )
        ) : (
          <Editor
            key={`comment_${commentId}`}
            onSave={(content) => editComment({ commentId, content })}
            onCancel={() => setEditedCommentId(null)}
            initialContent={comment.content}
            useTitle={false}
            textAreaHeight="50px"
            loading={isEditLoading}
            loadingLabel="Saving"
          />
        );
      });
    }
  }

  return (
    <CommentListWrapper>
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
          {comments.length > 0 ? getComments() : <Empty />}
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
            loading={isSaveLoading}
            textAreaHeight='50px'
          />
        )}
      </div>
    </CommentListWrapper>
  );
});

export const CommentListWrapper = styled.div.attrs({
  className: 'flex-column',
})`
  margin-top: 10px;
  margin-left: 20px;
`;

export default CommentList;
