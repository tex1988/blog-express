import { createContext, useContext, useEffect, useState } from 'react';
import { fetchUserPosts, savePost } from '../api/api';
import { Navigate, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import Editor from '../components/Editor';
import PostPreview from '../components/PostPreview';

export const EditorContext = createContext(undefined);

const MyPosts = () => {
  const { user } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [isEditorVisible, setEditorVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user !== undefined) {
      fetchUserPosts(user.userId).then((posts) => {
        if (posts.status) {
          navigate('/error');
        } else {
          setPosts(posts);
        }
      });
    }
  }, []);

  function getPostProps(post) {
    return {
      postId: post.postId,
      userName: `${user.firstName} ${user.lastName}`,
      userId: post.userId,
      title: post.title,
      content: post.content,
      created: post.created,
      modified: post.modified,
      commentsCount: post._count.comments,
      setPosts: (value) => setPosts(value),
    };
  }

  function getEditorProps() {
    return {
      onSave: (title, content) => onPostSave(content, title),
      onCancel: () => setEditorVisible(false),
      initialTitle: '',
      initialContent: '',
      useTitle: true,
    };
  }

  function getPosts() {
    if (posts.length > 0) {
      return posts.map((post) => (
        <PostPreview key={`post_${post.postId}`} {...getPostProps(post)} />
      ));
    }
  }

  function onAddPostClick() {
    setEditorVisible(true);
  }

  function onPostSave(title, content) {
    const post = {
      userId: user.userId,
      title: title,
      content: content,
    };
    savePost(post).then(async (res) => {
      if (res.status === 201) {
        updatePostsAfterSave(await res.json());
      } else {
        alert('An error occurred please try again later');
      }
    });
  }

  function updatePostsAfterSave(post) {
    const updatedPosts = [post, ...posts];
    setPosts(updatedPosts);
    setEditorVisible(false);
  }

  if (user === undefined) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex-column p-10">
      {getPosts()}
      {isEditorVisible && <Editor {...getEditorProps()} />}
      <div
        className="flex-column"
        style={{ justifyContent: 'center', alignContent: 'center', flexWrap: 'wrap' }}>
        {!isEditorVisible && <button onClick={onAddPostClick}>Create post</button>}
      </div>
    </div>
  );
};

export default MyPosts;
