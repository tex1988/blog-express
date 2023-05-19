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
  const [commentCount, setCommentCount] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const isEditable = isTheSameUser(loggedInUser, userId);
  const [showComments, setShowComments] = useState(false);
  const hasComments = commentCount > 0;
  const navigate = useNavigate();

  useEffect(() => {
    fetchPostById(postId).then((post) => setPost(post));
  }, []);

  useEffect(() => {
    setCommentCount(_count ? _count.comments : 0);
  }, [post]);

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
      <div className='info'>
        <span>Posted by {user?.firstName} {user?.lastName}, {getDate(created)}</span>
        {modified && <span>Edited {getDate(modified)}</span>}
      </div>
      <div className='content'>{content}</div>
      <div className='info' style={{ textAlign: 'right' }}>
        <div
          className={hasComments ? 'underlined-button' : ''}
          onClick={hasComments ? () => setShowComments(!showComments) : () => {}}
          aria-disabled={hasComments}
          style={hasComments ? {} : { textDecoration: 'none' }}>
          Comments: {commentCount}
        </div>
        {isEditable && (<div className='flex-row-left'>
          <div className='underlined-button' onClick={() => setEditMode(true)}>Edit</div>
          <div className='underlined-button' onClick={onDeleteClick} style={{ marginLeft: '5px' }}>Delete</div>
        </div>)}
      </div>
      <Comments {...{ showComments, setCommentCount, setShowComments }} />
    </>
  );

  return (
    <div className='flex-column' style={{ width: '100%' }}>
      {editMode ? <Editor {...getEditorProps()} /> : postElement}
    </div>
  );
};

export default Post;
