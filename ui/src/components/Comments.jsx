import { useContext, useEffect, useState } from 'react';
import { fetchCommentById, fetchCommentsByPostId, updateComment } from '../api/api';
import { useParams } from 'react-router-dom';
import Comment from './Comment';
import { UserContext } from '../App';

const Comments = () => {
  const { user } = useContext(UserContext);
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
      onCommentUpdate: (comment) => onCommentUpdate(comment),
    };
  }

  function onCommentUpdate(comment) {
    updateComment(comment.commentId, comment).then((code) => {
      if (code === 200) {
        fetchCommentById(comment.commentId).then((updatedComment) => {
          updateComments(updatedComment);
        });
      } else {
        alert('An error occurred please try again later');
      }
    });
  }

  function updateComments(comment) {
    const index = comments.findIndex((element) => element.commentId === comment.commentId);
    const updatedComments = [...comments];
    updatedComments[index] = comment;
    setComments(updatedComments);
  }

  function getComments() {
    return comments.map((comment) => (
      <Comment key={`comment_${comment.commentId}`} {...getCommentProps(comment)} />
    ));
  }

  return (
    <div className="flex-column" style={{ marginTop: '5px' }}>
      {getComments()}
    </div>
  );
};

export default Comments;
