import { useContext, useEffect, useState } from 'react';
import { deleteCommentById, fetchCommentsByPostId, savePostComment, updateComment } from '../api/api';
import { useParams } from 'react-router-dom';
import Comment from './Comment';
import { UserContext } from '../App';
import { isPageExists, isTheSameUser } from '../../utils/utils';
import Editor from './Editor';
import styled from 'styled-components';
import Pagination from './Pagination';

const Comments = (props) => {
  const PAGE_SIZE = 10;
  const { user } = useContext(UserContext);
  const { showComments, commentCount, setCommentCount, setShowComments } = props;
  const { userId, postId } = useParams();
  const [comments, setComments] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [page, setPage] = useState(1);
  const isCanLeftAComment = user && !isTheSameUser(user, userId);

  useEffect(() => {
    fetchPostComments(postId, page);
  }, [page]);

  function fetchPostComments(postId, page) {
    fetchCommentsByPostId(postId, { size: PAGE_SIZE, page }).then((res) => {
      setComments(res.comments);
      setPageCount(res.pageCount);
    });
  }

  function onPageChange(pageNumber) {
    setPage(pageNumber);
  }

  function onCommentUpdate(comment) {
    updateComment(comment.commentId, comment).then((code) => {
      if (code === 200) {
        fetchPostComments(postId, page);
      } else {
        alert('An error occurred please try again later');
      }
    });
  }

  function onCommentDelete(commentId) {
    deleteCommentById(commentId).then((status) => {
      if (status === 200) {
        afterDelete();
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
        afterSave();
      } else {
        alert('An error occurred please try again later');
      }
    });
  }

  function afterSave() {
    fetchPostComments(postId, 1);
    setCommentCount((prev) => ++prev);
    setShowComments(true);
    setPage(1)
  }

  function afterDelete() {
    let newPage = page;
    if(!isPageExists(commentCount - 1, PAGE_SIZE, page)) {
      newPage--;
    }
    fetchPostComments(postId, newPage);
    setCommentCount((prev) => --prev);
    setPage(newPage);
  }

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

  function getEditorProps() {
    return {
      onSave: (content) => onCommentSave(content),
      useTitle: false,
      useCancel: false,
      saveLabel: 'Post a comment',
    };
  }

  function getPaginationProps() {
    return {
      pageCount: pageCount,
      pageRangeDisplayed: PAGE_SIZE,
      onPageChange: (pageNumber) => onPageChange(pageNumber),
    };
  }

  function getComments() {
    return comments.map((comment) => (
      <Comment key={`comment_${comment.commentId}`} {...getCommentProps(comment)} />
    ));
  }

  return (
    <CommentsWrapper>
      {showComments && getComments()}
      {showComments && pageCount > 1 && <Pagination {...getPaginationProps()} />}
      <div className="flex-column" style={{ width: '100%' }}>
        {isCanLeftAComment && <Editor {...getEditorProps()} />}
      </div>
    </CommentsWrapper>
  );
};

const CommentsWrapper = styled.div.attrs({
  className: 'flex-column',
})`
  margin-top: 10px;
  margin-left: 20px;
`;

export default Comments;
