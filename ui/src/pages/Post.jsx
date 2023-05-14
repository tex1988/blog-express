import { deletePostById, fetchPostById, fetchUserPosts, savePost, updatePost } from '../api/api';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../App';
import Editor from '../components/Editor';
import { getDate } from '../../utils/utils';
import { useNavigate, useParams } from 'react-router-dom';

const Post = () => {
  const { user } = useContext(UserContext);
  const { userId, postId } = useParams();
  const [post, setPost] = useState({});
  const { title, content, firstName, lastName, created, modified } = post;
  const [editMode, setEditMode] = useState(false);
  const isEditable = getEditable();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPostById(postId)
      .then(post => setPost(post))
  }, [])

  useEffect(()=> {}, [post])

  function getEditable() {
    if(!user) return false;
    return Number(userId) === Number(user.userId)
  }

  function onDeleteClick() {
    deletePostById(postId).then((status) => {
      if (status === 200) {
        navigate(`user/${userId}/post`)
      } else {
        alert('An error occurred please try again later');
      }
    });
  }

  function getEditorProps() {
    return {
      onSave: (title, content) => onPostEdit(title, content),
      onCancel: () => setEditMode(false),
      initialTitle: title,
      initialContent: content,
    };
  }

  function onPostEdit(title, content) {
    const post = {
      userId: user.userId,
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
      <div className="post-info">
        Posted by {firstName} {lastName}, {getDate(created)}
      </div>
      <div className="content">{content}</div>
      {modified && (
        <div className="post-info" style={{ textAlign: 'right' }}>
          Edited {getDate(modified)}
        </div>
      )}
      {isEditable && (
        <div className="flex-row-left">
          <button onClick={() => setEditMode(true)}>Edit</button>
          <button onClick={onDeleteClick}>Delete</button>
        </div>
      )}
    </>
  );

  return (
    <div className="flex-column" style={{width: '100%'}}>{editMode ? <Editor {...getEditorProps()} /> : postElement}</div>
  );
};

export default Post;
