import { getDate, isTheSameUser } from '../utils/utils';
import useAuthContext from '../hooks/useAuthContext';

const Comment = ({ comment, onCommentUpdate, onCommentDelete }) => {
  const { user } = useAuthContext();
  const { commentId, content, created, modified, userId } = comment;
  const userName = `${comment?.user?.firstName} ${comment?.user?.lastName}`;
  const isEditable = isTheSameUser(user, userId);

  return (
    <div className="flex-column">
      <div className="info">
        <span>
          {userName}, {getDate(created)}
        </span>
        {modified && <span>Edited {getDate(modified)}</span>}
      </div>
      <span className="content">{content}</span>
      <div className="info">
        {isEditable && (
          <div className="flex-row-right">
            <span className="action-link" onClick={() => onCommentUpdate(commentId)}>
              Edit
            </span>
            <span
              className="action-link"
              onClick={() => onCommentDelete(commentId)}
              style={{ marginLeft: '5px' }}>
              Delete
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
