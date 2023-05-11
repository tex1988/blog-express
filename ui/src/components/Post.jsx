import { deletePostById, fetchUserPosts } from '../api/api';
import { useContext } from 'react';
import { UserContext } from '../App';

const Post = (props) => {
  const { user } = useContext(UserContext);
  const { postId, title, content, userName, created, modified, setPosts } = props;

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

  return (
    <div className="flex-column">
      <h3>{title}</h3>
      <div className="post-info">
        Posted by {userName}, {getDate(created)}
      </div>
      <div className="content">{content}</div>
      {modified && (
        <div className="post-info" style={{ textAlign: 'right' }}>
          Edited {getDate(modified)}
        </div>
      )}
      <div className="flex-row-left">
        <button>Edit</button>
        <button onClick={onDeleteClick}>Delete</button>
      </div>
    </div>
  );
};

export default Post;
