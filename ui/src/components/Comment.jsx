import { getDate, isTheSameUser } from '../utils/utils';
import { useState } from 'react';
import Editor from './Editor';
import useAuthContext from '../hooks/useAuthContext';

const Comment = ({ comment, onCommentUpdate, onCommentDelete }) => {
  const { user } = useAuthContext();
  const { commentId, content, created, modified, userId } = comment;
  const userName = `${comment?.user?.firstName} ${comment?.user?.lastName}`;
  const [editMode, setEditMode] = useState(false);
  const isEditable = isTheSameUser(user, userId);

  function onUpdate(content) {
    const comment = {
      commentId: commentId,
      content: content,
    };
    onCommentUpdate(comment);
    setEditMode(false);
  }

  const commentElement = (
    <>
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
            <span className="action-link" onClick={() => setEditMode(true)}>
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
    </>
  );

  return (
    <div className="flex-column">
      {editMode ? (
        <Editor
          onSave={(content) => onUpdate(content)}
          onCancel={() => setEditMode(false)}
          initialContent={content}
          useTitle={false}
          textAreaHeight='50px'
        />
      ) : (
        commentElement
      )}
    </div>
  );
};

export default Comment;
