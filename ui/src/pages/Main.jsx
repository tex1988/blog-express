import { useContext, useEffect, useState } from 'react';
import { fetchUserPosts } from '../api/api';
import Post from '../components/Post';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../App';
import Editor from '../components/Editor';

const Main = () => {
  const { user } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [isEditorVisible, setEditorVisible] = useState(false);

  useEffect(() => {
    if (user !== undefined) {
      fetchUserPosts(user.userId).then((json) => setPosts(json));
    }
  }, []);

  function getPostProps(post) {
    return {
      postId: post.postId,
      userName: `${user.firstName} ${user.lastName}`,
      title: post.title,
      content: post.content,
      created: post.created,
      modified: post.modified,
      setPosts: (posts) => setPosts(posts)
    };
  }

  function getPosts() {
    if (posts.length > 0) {
      return posts.map((post) => <Post key={`post_${post.id}`} {...getPostProps(post)} />);
    }
  }

  function onAddPostClick() {
    setEditorVisible(!isEditorVisible);
  }

  if (user === undefined) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container">
      <div className='flex-column'>
        {getPosts()}
        {isEditorVisible && <Editor setPosts={(posts) => setPosts(posts)} />}
        <div className='flex-column' style={{justifyContent: 'center', alignContent: 'center', flexWrap: 'wrap'}}>
          <button onClick={onAddPostClick}>{isEditorVisible ? 'Close editor' : 'Create post'}</button>
        </div>
      </div>
    </div>
  );
};

export default Main;
