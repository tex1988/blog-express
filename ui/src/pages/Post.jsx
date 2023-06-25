import { Suspense, useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '../App';
import Editor from '../components/Editor';
import { getDate, isTheSameUser } from '../utils/utils';
import { useParams } from 'react-router-dom';
import CommentList from '../components/CommentList';
import usePostQuery from '../hooks/usePostQuery';
import usePostAdditionalParams from '../hooks/usePostAdditionalParams';
import Loading from '../components/Loading';

const Post = () => {
  const { user: loggedInUser } = useContext(UserContext);
  const { userId, postId } = useParams();
  const [editMode, setEditMode] = useState(false);
  const { showComments, showCommentsSearch } = usePostAdditionalParams();
  const { post, editPost, deletePost } = usePostQuery(postId, userId);
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
      <div className="info">
        <span>
          Posted by {user?.firstName} {user?.lastName}, {getDate(created)}
        </span>
        {modified && <span>Edited {getDate(modified)}</span>}
      </div>
      <span className="content">{content}</span>
      <div className="info" style={{ textAlign: 'right' }}>
        <div>
          <span
            className={hasComments ? 'action-link' : ''}
            onClick={hasComments ? () => ref.current.setCommentsSearchParam(!showComments) : () => {}}
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
      <Suspense fallback={<Loading />}>
        <CommentList ref={ref}
          {...{ showComments, showCommentsSearch, commentCount, setCommentCount }}
        />
      </Suspense>
    </>
  );

  return (
    <div className="flex-column" style={{ padding: '10px' }}>
      {editMode ? (
        <Editor
          onSave={(content, title) => onPostEdit(content, title)}
          onCancel={() => setEditMode(false)}
          initialTitle={title}
          initialContent={content}
          useTitle={true}
        />
      ) : (
        postElement
      )}
    </div>
  );
};

export default Post;
