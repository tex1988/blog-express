import { Suspense, useEffect, useRef, useState } from 'react';
import Editor from './Editor';
import { getDate, isTheSameUser } from '../utils/utils';
import { useParams } from 'react-router-dom';
import CommentList from './CommentList';
import usePostQuery from '../hooks/usePostQuery';
import usePostAdditionalParams from '../hooks/usePostAdditionalParams';
import useAuthContext from '../hooks/useAuthContext';
import CommentListSkeleton from './skeleton/CommentListSkeleton';
import FullPostSkeleton from './skeleton/FullPostSkeleton';

const FullPost = () => {
  const { user: loggedInUser } = useAuthContext();
  const { userId, postId } = useParams();
  const [editMode, setEditMode] = useState(false);
  const { showComments, showCommentsSearch } = usePostAdditionalParams();
  const { post, editPost, isEditLoading, deletePost, isDeleteLoading, isEditError, resetEdit } =
    usePostQuery(postId, userId);
  const { title, content, created, modified, user, commentCount: count } = post;
  const [commentCount, setCommentCount] = useState(0);
  const hasComments = commentCount > 0;
  const isEditable = isTheSameUser(loggedInUser, userId);
  const ref = useRef();

  useEffect(() => {
    setEditMode(false);
    setCommentCount(count);
  }, [post]);

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
          {showComments && hasComments && (
            <>
              <span>, </span>
              <span
                className="action-link"
                onClick={() => ref.current.setSearch(!showCommentsSearch)}>
                {showCommentsSearch ? 'Hide' : 'Show'} search
              </span>
            </>
          )}
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
      <Suspense fallback={<CommentListSkeleton search={showCommentsSearch} />}>
        <CommentList
          ref={ref}
          {...{ showComments, showCommentsSearch, commentCount, setCommentCount }}
        />
      </Suspense>
    </>
  );

  return isDeleteLoading ? (
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
