import { forwardRef, useImperativeHandle, useState } from 'react';
import { useParams } from 'react-router-dom';
import { isPageExists, isTheSameUser } from '../utils/utils';
import styled from 'styled-components';
import useCommentListQuery from '../hooks/useCommentListQuery';
import useCommentListSearchParams from '../hooks/useCommentListSearchParams';
import useAuthContext from '../hooks/useAuthContext';
import { AnimatePresence, motion } from 'framer-motion';
import {
  basicFade,
  basicTransition, loadingFade,
  MotionComment,
  MotionCommentSkeleton,
  MotionEditor, MotionEmpty, MotionPagination, MotionSearch, paginationChildrenVariants, paginationVariants,
} from './animation/motionComponents';

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
  const {
    comments,
    pageCount,
    isLoading,
    saveComment,
    isSaveLoading,
    isSavedCommentLoading,
    isSaveError,
    resetSave,
    editComment,
    isEditLoading,
    isEditError,
    resetEdit,
    deleteComment,
    isDeleteLoading,
    isInvalidateLoading,
  } = useCommentListQuery({
    postId,
    fetchParams,
    isFetch: showComments,
    afterDelete,
    afterSave,
    afterEdit,
  });

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

  function getCommentItem(comment) {
    const commentId = comment.commentId;
    return (
      <motion.div
        key={`comment_item_${commentId}`}
        layoutId={`comment_item_${commentId}`}
        transition={basicTransition}
        variants={basicFade}
        initial="hidden"
        animate="visible">
        <AnimatePresence mode="wait" initial={false}>
          {((isDeleteLoading || isInvalidateLoading) && deletedCommentId === commentId) ||
          (editedCommentId === commentId && isInvalidateLoading) ? (
            <MotionCommentSkeleton
              withEdit={true}
              layoutId={`comment_${commentId}`}
              key={`comment_skeleton_${comment.commentId}`}
              transition={basicTransition}
              variants={basicFade}
              initial="hidden"
              animate="visible"
              exit="hidden"
            />
          ) : (
            <MotionComment
              comment={{ ...comment }}
              onCommentUpdate={setEditedCommentId}
              onCommentDelete={onDeleteComment}
              isLoading={isEditLoading}
              layoutId={`comment_${commentId}`}
              key={`comment_${commentId}`}
              layout="position"
              transition={basicTransition}
              variants={basicFade}
              initial="hidden"
              animate="visible"
              exit="hidden"
            />
          )}
        </AnimatePresence>
      </motion.div>
    );
  }

  function getEditorItem(comment) {
    const commentId = comment.commentId;
    return (
      <MotionEditor
        onSave={(content) => editComment({ commentId, content })}
        onCancel={() => {
          setEditedCommentId(null);
          resetEdit();
        }}
        onContentEdit={resetEdit}
        initialContent={comment.content}
        useTitle={false}
        textAreaHeight="50px"
        loading={isEditLoading}
        loadingLabel="Saving"
        isError={isEditError}
        key={`comment_editor_${comment.commentId}`}
        layoutId={`comment_item_${commentId}`}
        layout="position"
        transition={basicTransition}
        variants={basicFade}
        initial="hidden"
        animate="visible"
      />
    );
  }

  function getComments() {
    return (
      <motion.div
        layout="position"
        layoutId="comment_list"
        key={`comments_page_${page}`}
        variants={paginationVariants}
        initial="hidden"
        animate="visible">
        <AnimatePresence mode="popLayout">
          {isSavedCommentLoading && (
            <MotionCommentSkeleton
              withEdit={true}
              layout="size"
              key="comment_skeleton_new"
              transition={basicTransition}
              variants={basicFade}
              initial="hidden"
              animate="visible"
              exit="hidden"
            />
          )}
        </AnimatePresence>
        {comments.map((comment, index) => {
          const commentId = comment.commentId;
          return (
            <motion.div
              key={`comment_list_item_${commentId}`}
              variants={paginationChildrenVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              custom={{ delay: index * 0.1, exitDelay: (PAGE_SIZE - index) * 0.1 }}>
              {editedCommentId === commentId && !isInvalidateLoading
                ? getEditorItem(comment)
                : getCommentItem(comment)}
            </motion.div>
          );
        })}
      </motion.div>
    );
  }

  return (
    <motion.div
      key="comments"
      layout
      variants={loadingFade}
      initial="hidden"
      animate="visible"
      exit="hidden">
      <CommentListWrapper>
        <AnimatePresence mode="wait" initial={false}>
          {showComments && (
            <motion.div
              layout
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto', transition: { duration: 0.025 * PAGE_SIZE + 0.5 } }}
              exit={{ opacity: 0, height: 0, transition: { duration: 0.025 * PAGE_SIZE + 0.5 } }}
              style={{ overflow: 'hidden' }}>
              <AnimatePresence mode="wait" initial={false}>
                {showComments && showCommentsSearch && commentCount > 0 && (
                  <MotionSearch
                    sortOptions={getSortOptions()}
                    searchOptions={getSearchOptions()}
                    defaultSort={sort}
                    defaultOrder={order}
                    defaultSearch={searchQuery}
                    setOrder={setOrder}
                    setSort={setSort}
                    onSearch={setSearchQuery}
                    disabled={isLoading}
                    key="comment_search"
                    layout="position"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto', transition: { duration: 0.2 } }}
                    exit={{ opacity: 0, height: 0, transition: { duration: 0.2 } }}
                  />
                )}
              </AnimatePresence>
              <AnimatePresence mode="wait">
                {comments.length > 0 ? (
                  getComments()
                ) : (
                  <MotionEmpty
                    layout="position"
                    layoutId="comment_list"
                    key="empty"
                    transition={basicTransition}
                    variants={basicFade}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  />
                )}
              </AnimatePresence>
              {pageCount > 1 && (
                <MotionPagination
                  page={page - 1}
                  pageCount={pageCount}
                  pageRangeDisplayed={PAGE_SIZE}
                  onPageChange={setPage}
                  disabled={!!editedCommentId}
                  layout="position"
                  transition={basicTransition}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
        <div className="flex-column" style={{ width: '100%' }}>
          {isCanLeftAComment && (
            <MotionEditor
              onSave={(content) => onCommentSave(content)}
              onContentEdit={resetSave}
              useTitle={false}
              useCancel={false}
              saveLabel={'Left a comment'}
              loadingLabel="Saving"
              loading={isSaveLoading}
              textAreaHeight="50px"
              isError={isSaveError}
              layout="position"
              transition={basicTransition}
            />
          )}
        </div>
      </CommentListWrapper>
    </motion.div>
  );
});

export const CommentListWrapper = styled.div.attrs({
  className: 'flex-column',
})`
  margin-left: 20px;
`;

export default CommentList;
