import { deletePostById, fetchPostById, updatePost } from '../api/api';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../App';
import Editor from '../components/Editor';
import { getDate, isTheSameUser } from '../../utils/utils';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import CommentList from '../components/CommentList';

const Post = () => {
  const { user: loggedInUser } = useContext(UserContext);
  const { userId, postId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { defaultShowComments, defaultShowCommentsSearch } = getDefaultParams();
  const [post, setPost] = useState({});
  const { title, content, created, modified, user, _count } = post;
  const [commentCount, setCommentCount] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const isEditable = isTheSameUser(loggedInUser, userId);
  const [showComments, setShowComments] = useState(defaultShowComments);
  const [showCommentsSearch, setShowCommentsSearch] = useState(defaultShowCommentsSearch);
  const hasComments = commentCount > 0;
  const navigate = useNavigate();

  useEffect(() => {
    fetchPostById(postId).then((post) => {
      setPost(post);
    });
  }, []);

  useEffect(() => {
    setCommentCount(_count ? _count.comments : 0);
  }, [post]);

  useEffect(()=> {
    setSearchParams(getSearchParams());
  }, [showComments, showCommentsSearch])

  function getSearchParams() {
    return new URLSearchParams({
      ...Object.fromEntries(searchParams),
      comments: showComments,
      search: showCommentsSearch,
    });
  }

  function getDefaultParams() {
    const params = Object.fromEntries(searchParams);
    const { comments, search } = params;
    const defaultParams = {};
    Object.assign(defaultParams,
      comments ? { defaultShowComments: comments } : { defaultShowComments: false },
      search ? { defaultShowCommentsSearch: search } : { defaultShowCommentsSearch: false });
    return defaultParams;
  }

  function onDeleteClick() {
    deletePostById(postId).then(() => {
      navigate(`/user/${userId}/post`);
    });
  }

  function onPostEdit(content, title) {
    const post = {
      userId: loggedInUser.userId,
      title: title,
      content: content,
    };
    updatePost(postId, post).then(() => {
      fetchPostById(postId).then((post) => {
        setPost(post);
        setEditMode(false);
      });
    });
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
          {showComments && (
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
            <span className="action-link" onClick={onDeleteClick} style={{ marginLeft: '5px' }}>
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
