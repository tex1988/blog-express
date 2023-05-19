import { useContext, useEffect, useState } from 'react';
import {
  deleteCommentById,
  fetchCommentById,
  fetchCommentsByPostId,
  savePostComment,
  updateComment,
} from '../api/api';
import { useParams } from 'react-router-dom';
import Comment from './Comment';
import { UserContext } from '../App';
import { isTheSameUser } from '../../utils/utils';
import Editor from './Editor';

const Comments = (props) => {
  const { user } = useContext(UserContext);
  const { showComments, setCommentCount, setShowComments } = props;
  const { userId, postId } = useParams();
  const [comments, setComments] = useState([]);
  const isCanLeftAComment = user && !isTheSameUser(user, userId);

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

  function onCommentSave(content) {
    const comment = {
      content: content,
      userId: user.userId,
      postId: postId,
    };
    savePostComment(comment.postId, comment).then(async (res) => {
      if (res.status === 201) {
        updateCommentsAfterSave(await res.json());
      } else {
        alert('An error occurred please try again later');
      }
    });
  }

  function updateCommentsAfterSave(comment) {
    const updatedComments = [comment, ...comments];
    setComments(updatedComments);
    setCommentCount((prev) => ++prev);
    setShowComments(true);
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
    setCommentCount(prev => --prev);
  }

  function getEditorProps() {
    return {
      onSave: (content) => onCommentSave(content),
      useTitle: false,
      useCancel: false,
    };
  }

  function getComments() {
    return comments.map((comment) => (
      <Comment key={`comment_${comment.commentId}`} {...getCommentProps(comment)} />
    ));
  }

  return (
    <div className='flex-column' style={{ marginTop: '5px' }}>
      {showComments && getComments()}
      <div className='flex-column' style={{ width: '100%' }}>
        {isCanLeftAComment && <Editor {...getEditorProps()} />}
      </div>
    </div>
  );
};

export default Comments;
