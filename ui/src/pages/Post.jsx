import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../App';
import Editor from '../components/Editor';
import { getDate, isTheSameUser } from '../../utils/utils';
import { useParams, useSearchParams } from 'react-router-dom';
import CommentList from '../components/CommentList';
import usePostQuery from '../hooks/usePostQuery';

const Post = () => {
  const { user: loggedInUser } = useContext(UserContext);
  const { userId, postId } = useParams();
  const [searchParams] = useSearchParams();
  const { defaultShowComments, defaultShowCommentsSearch } = getDefaultParams();
  const [editMode, setEditMode] = useState(false);
  const isEditable = isTheSameUser(loggedInUser, userId);
  const [showComments, setShowComments] = useState(defaultShowComments);
  const [showCommentsSearch, setShowCommentsSearch] = useState(defaultShowCommentsSearch);
  const { post, editPost, deletePost } = usePostQuery(postId, userId);
  const { title, content, created, modified, user, commentCount: count } = post;
  const [commentCount, setCommentCount] = useState(0);
  const hasComments = commentCount > 0;

  useEffect(() => {
    setEditMode(false);
    setCommentCount(count);
  }, [post]);

  function getDefaultParams() {
    const params = Object.fromEntries(searchParams);
    const { comments, search } = params;
    const defaultParams = {};
    Object.assign(
      defaultParams,
      (comments === 'true' || comments === 'false')
        ? { defaultShowComments: JSON.parse(comments.toLocaleLowerCase()) }
        : { defaultShowComments: false },
      (search === 'true' || search === 'false')
        ? { defaultShowCommentsSearch: JSON.parse(search.toLocaleLowerCase()) }
        : { defaultShowCommentsSearch: false },
    );
    return defaultParams;
  }

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
            onClick={hasComments ? () => setShowComments(!showComments) : () => {}}
            aria-disabled={hasComments}
            style={hasComments ? {} : { textDecoration: 'none' }}>
            Comments: {commentCount}
          </span>
          {showComments && hasComments && (
            <>
              <span>, </span>
              <span
                className="action-link"
                onClick={() => setShowCommentsSearch(!showCommentsSearch)}>
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
      <CommentList
        {...{ showComments, showCommentsSearch, commentCount, setCommentCount, setShowComments }}
      />
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
