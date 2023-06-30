import { getDate, isTheSameUser } from '../utils/utils';
import useAuthContext from '../hooks/useAuthContext';

const Comment = ({ comment, onCommentUpdate, onCommentDelete, isLoading = false }) => {
  const { user } = useAuthContext();
  const { commentId, content, created, modified, userId } = comment;
  const userName = `${comment?.user?.firstName} ${comment?.user?.lastName}`;
  const isEditable = isTheSameUser(user, userId);

  return (
    <div className="flex-column mt-10">
      <div className="info">
        <span>
          {userName}, {getDate(created)}
          {modified && `, edited ${getDate(modified)}`}
        </span>
      </div>
      <span className="content">{content}</span>
      {isEditable && (
        <div className="flex-row-left info">
          <span
            className={isLoading ? '' : 'action-link'}
            onClick={isLoading ? () => {} : () => onCommentUpdate(commentId)}>
            Edit
          </span>
          <span
            className={isLoading ? '' : 'action-link'}
            onClick={isLoading ? () => {} : () => onCommentDelete(commentId)}
            style={{ marginLeft: '5px' }}>
            Delete
          </span>
        </div>
      )}
    </div>
  );
};

export default Comment;
