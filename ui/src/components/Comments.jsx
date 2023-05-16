import { useEffect, useState } from 'react';
import { fetchCommentsByPostId } from '../api/api';
import { useParams } from 'react-router-dom';
import Comment from './Comment';

const Comments = () => {
  const { postId } = useParams();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchCommentsByPostId(postId).then((comments) => setComments(comments));
  }, []);

  function getCommentProps(comment) {
    return {
      commentId: comment.commentId,
      content: comment.content,
      created: comment.created,
      modified: comment.modified,
      userId: comment.userId,
      userName: `${comment.user.firstName} ${comment.user.lastName}`,
    }
  }

  function getComments() {
    return comments.map((comment) => <Comment key={`comment_${comment.commentId}`} {...getCommentProps(comment)} />);
  }

  return (
    <div className='flex-column' style={{marginTop: '5px'}}>
      {getComments()}
    </div>
  )
};

export default Comments;
