import { deletePostById, fetchUserPosts, savePost, updatePost } from '../api/api';
import { useContext, useState } from 'react';
import { UserContext } from '../App';
import Editor from './Editor';

const Post = (props) => {
  const { user } = useContext(UserContext);
  const { postId, title, content, userName, userId, created, modified, setPosts } = props;
  const [editMode, setEditMode] = useState(false);
  const isEditable = userId === user.userId;

  function getDate(stringDate) {
    const date = new Date(stringDate);
    return date.toLocaleString('en-US');
  }

  function onDeleteClick() {
    deletePostById(postId).then((status) => {
      if (status === 200) {
        fetchUserPosts(user.userId).then((posts) => setPosts(posts));
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
        fetchUserPosts(user.userId)
          .then((posts) => {
            setPosts(posts);
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
      <div className='post-info'>
        Posted by {userName}, {getDate(created)}
      </div>
      <div className='content'>{content}</div>
      {modified && (
        <div className='post-info' style={{ textAlign: 'right' }}>
          Edited {getDate(modified)}
        </div>
      )}
      {isEditable && (
        <div className='flex-row-left'>
          <button onClick={() => setEditMode(true)}>Edit</button>
          <button onClick={onDeleteClick}>Delete</button>
        </div>
      )}
    </>
  );

  return (
    <div className='flex-column'>
      {editMode ? <Editor {...getEditorProps()} /> : postElement}
    </div>
  );
};

export default Post;
