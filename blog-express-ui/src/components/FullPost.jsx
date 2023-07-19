import { Suspense, useEffect, useRef, useState } from 'react';
import Editor from './Editor';
import { getDate, isTheSameUser } from '../utils/utils';
import { useParams } from 'react-router-dom';
import CommentList from './CommentList';
import usePostQuery from '../hooks/usePostQuery';
import usePostAdditionalParams from '../hooks/usePostAdditionalParams';
import useAuthContext from '../hooks/useAuthContext';
import FullPostSkeleton from './skeleton/FullPostSkeleton';
import { AnimatePresence, motion } from 'framer-motion';
import { basicFade, loadingFade, MotionCommentListSkeleton } from './animation/motionComponents';

const FullPost = () => {
  const { user: loggedInUser } = useAuthContext();
  const { userId, postId } = useParams();
  const [editMode, setEditMode] = useState(false);
  const { showComments, showCommentsSearch } = usePostAdditionalParams();
  const [commentCount, setCommentCount] = useState(0);
  const {
    post,
    editPost,
    isEditLoading,
    deletePost,
    isDeleteLoading,
    isEditError,
    resetEdit,
    isInvalidateLoading,
  } = usePostQuery(postId, userId, setCommentCount, setEditMode);
  const { title, content, created, modified, user, commentCount: count } = post;
  const hasComments = commentCount > 0;
  const isEditable = isTheSameUser(loggedInUser, userId);
  const ref = useRef();

  useEffect(() => {
    setCommentCount(count);
  }, []);

  function onPostEdit(content, title) {
    const post = {
      userId: loggedInUser.userId,
      title: title,
      content: content,
    };
    editPost(post);
  }

  const postElement = (
    <>
      <h3>{title}</h3>
      <div className="flex-row-left info">
        <span>
          Posted by {user?.firstName} {user?.lastName}, {getDate(created)}
          {modified && `, edited ${getDate(modified)}`}
        </span>
      </div>
      <span className="content">{content}</span>
      <div className="flex-row-space-between info" style={{ textAlign: 'right' }}>
        <div>
          <span
            className={hasComments ? 'action-link' : ''}
            onClick={
              hasComments ? () => ref.current.setCommentsSearchParam(!showComments) : () => {}
            }
            aria-disabled={hasComments}
            style={hasComments ? {} : { textDecoration: 'none' }}>
            Comments: {commentCount}
          </span>
          <AnimatePresence initial={false}>
            {showComments && hasComments && (
              <>
                <span> </span>
                <motion.span
                  className="action-link"
                  onClick={() => ref.current.setSearch(!showCommentsSearch)}
                  key="comment_search_switcher"
                  variants={basicFade}
                  initial="hidden"
                  animate="visible"
                  exit="hidden">
                  {showCommentsSearch ? 'Hide' : 'Show'} search
                </motion.span>
              </>
            )}
          </AnimatePresence>
        </div>
        {isEditable && (
          <div className="flex-row-left" style={{ flexBasis: 'auto' }}>
            <span className="action-link" onClick={() => setEditMode(true)}>
              Edit
            </span>
            <span
              className="action-link"
              onClick={() => deletePost(postId)}
              style={{ marginLeft: '5px' }}>
              Delete
            </span>
          </div>
        )}
      </div>
      <AnimatePresence mode="wait">
        <Suspense
          fallback={
            <MotionCommentListSkeleton
              search={showCommentsSearch}
              variants={loadingFade}
              initial="hidden"
              animate="visible"
              exit="hidden"
            />
          }>
          <CommentList
            ref={ref}
            {...{ showComments, showCommentsSearch, commentCount, setCommentCount }}
          />
        </Suspense>
      </AnimatePresence>
    </>
  );

  return (isDeleteLoading || isInvalidateLoading) ? (
    <FullPostSkeleton />
  ) : (
    <div className="flex-column" style={{ padding: '10px' }}>
      {editMode ? (
        <Editor
          onSave={(content, title) => onPostEdit(content, title)}
          onCancel={() => setEditMode(false)}
          onTitleEdit={resetEdit}
          onContentEdit={resetEdit}
          initialTitle={title}
          initialContent={content}
          useTitle={true}
          loading={isEditLoading}
          loadingLabel="Saving"
          isError={isEditError}
        />
      ) : (
        postElement
      )}
    </div>
  );
};

export default FullPost;
