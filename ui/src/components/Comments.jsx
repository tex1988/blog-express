import { useEffect, useState } from 'react';
import { deleteCommentById, fetchCommentById, fetchCommentsByPostId, updateComment, } from '../api/api';
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
      onCommentUpdate: (comment) => onCommentUpdate(comment),
      onCommentDelete: (commentId) => onCommentDelete(commentId),
    };
  }

  function onCommentUpdate(comment) {
    updateComment(comment.commentId, comment).then((code) => {
      if (code === 200) {
        fetchCommentById(comment.commentId).then((updatedComment) => {
          updateCommentsAfterUpdate(updatedComment);
        });
      } else {
        alert('An error occurred please try again later');
      }
    });
  }

  function onCommentDelete(commentId) {
    deleteCommentById(commentId).then((status) => {
      if (status === 200) {
        updateCommentsAfterDelete(commentId);
      } else {
        alert('An error occurred please try again later');
      }
    });
  }

  function updateCommentsAfterUpdate(comment) {
    const index = comments.findIndex((element) => element.commentId === comment.commentId);
    const updatedComments = [...comments];
    updatedComments[index] = comment;
    setComments(updatedComments);
  }

  function updateCommentsAfterDelete(commentId) {
    const index = comments.findIndex((comment) => comment.commentId === commentId);
    const updatedComments = [...comments];
    updatedComments.splice(index, 1);
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
