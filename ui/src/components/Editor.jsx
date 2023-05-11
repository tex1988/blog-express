import { useContext, useState } from 'react';
import { UserContext } from '../App';
import { fetchUserPosts, postPost } from '../api/api';

const Editor = (props) => {
  const { setPosts } = props;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { user } = useContext(UserContext);

  function onHeaderInput(event) {
    setTitle(event.target.value);
  }

  function onContentInput(event) {
    setContent(event.target.value);
  }

  function post() {
    const post = {
      userId: user.userId,
      title: title,
      content: content,
    };
    postPost(post).then((code) => {
      if (code === 201) {
        fetchUserPosts(user.userId).then((posts) => setPosts(posts));
      } else {
        alert('An error occurred please try again later');
      }
    });
  }

  return (
    <div className='flex-column'>
      <input onChange={onHeaderInput} value={title} placeholder="Post title" />
      <textarea className="text-area" value={content} onChange={onContentInput}></textarea>
      <div className='flex-column' style={{justifyContent: 'center', alignContent: 'center', flexWrap: 'wrap'}}>
        <button onClick={post}>Post</button>
      </div>
    </div>
  );
};

export default Editor;