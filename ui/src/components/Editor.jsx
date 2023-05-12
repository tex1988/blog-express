import { useContext, useState } from 'react';
import { UserContext } from '../App';
import { fetchUserPosts, savePost } from '../api/api';

const Editor = (props) => {
  const { setEditorVisible, setPosts } = props;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { user } = useContext(UserContext);

  function onHeaderInput(event) {
    setTitle(event.target.value);
  }

  function onContentInput(event) {
    setContent(event.target.value);
  }

  function onSaveClick() {
    const post = {
      userId: user.userId,
      title: title,
      content: content,
    };
    savePost(post).then((code) => {
      if (code === 201) {
        fetchUserPosts(user.userId)
          .then((posts) => {
            setPosts(posts)
            setEditorVisible(false);
          });
      } else {
        alert('An error occurred please try again later');
      }
    });
  }

  return (
    <div className='flex-column'>
      <input onChange={onHeaderInput} value={title} placeholder="Post title" />
      <textarea className="text-area" value={content} onChange={onContentInput}></textarea>
      <div className='flex-row-center' style={{justifyContent: 'center', alignContent: 'center', flexWrap: 'wrap'}}>
        <button onClick={onSaveClick}>Save</button>
        <button onClick={() => setEditorVisible(false)}>Cancel</button>
      </div>
    </div>
  );
};

export default Editor;