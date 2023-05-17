import { deletePostById, fetchPostById, updatePost } from '../api/api';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../App';
import Editor from '../components/Editor';
import { getDate, isTheSameUser } from '../../utils/utils';
import { useNavigate, useParams } from 'react-router-dom';
import Comments from '../components/Comments';

const Post = () => {
  const { user: loggedInUser } = useContext(UserContext);
  const { userId, postId } = useParams();
  const [post, setPost] = useState({});
  const { title, content, created, modified, user, _count } = post;
  const [editMode, setEditMode] = useState(false);
  const isEditable = isTheSameUser(loggedInUser, userId);
  const [showComments, setShowComments] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPostById(postId).then((post) => setPost(post));
  }, []);

  useEffect(() => {}, [post]);

  function onDeleteClick() {
    deletePostById(postId).then((status) => {
      if (status === 200) {
        navigate(`user/${userId}/post`);
      } else {
        alert('An error occurred please try again later');
      }
    });
  }

  function getEditorProps() {
    return {
      onSave: (content, title) => onPostEdit(content, title),
      onCancel: () => setEditMode(false),
      initialTitle: title,
      initialContent: content,
      useTitle: true,
    };
  }

  function onPostEdit(content, title) {
    const post = {
      userId: loggedInUser.userId,
      title: title,
      content: content,
    };
    updatePost(postId, post).then((code) => {
      if (code === 200) {
        fetchPostById(postId).then((post) => {
          setPost(post);
          setEditMode(false);
        });
      } else {
        alert('An error occurred please try again later');
      }
    });
  }

  const postElement = (
    <>
      <h3>{title}</h3>
      <div className="info">
        Posted by {user?.firstName} {user?.lastName}, {getDate(created)}
      </div>
      <div className="content">{content}</div>
      <div className="info" style={{ textAlign: 'right' }}>
        <div
          onClick={_count?.comments < 1 ? () => {} : () => setShowComments(!showComments)}
          style={{ cursor: 'pointer', textDecoration: 'underline' }}
          aria-disabled={_count?.comments < 1}>
          Comments: {_count?.comments}
        </div>
        {modified && <div>Edited {getDate(modified)}</div>}
      </div>
      <div className="flex-row-left">
        {isEditable && <button onClick={() => setEditMode(true)}>Edit</button>}
        {isEditable && <button onClick={onDeleteClick}>Delete</button>}
      </div>
      {showComments && <Comments />}
    </>
  );

  return (
    <div className="flex-column" style={{ width: '100%' }}>
      {editMode ? <Editor {...getEditorProps()} /> : postElement}
    </div>
  );
};

export default Post;
