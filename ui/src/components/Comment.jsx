import { getDate, isTheSameUser } from '../../utils/utils';
import { useContext, useState } from 'react';
import { UserContext } from '../App';
import Editor from './Editor';

const Comment = ({ comment, onCommentUpdate, onCommentDelete }) => {
  const { user } = useContext(UserContext);
  const { commentId, content, created, modified, userId } = comment;
  const userName = `${comment?.user?.firstName} ${comment?.user?.lastName}`;
  const [editMode, setEditMode] = useState(false);
  const isEditable = isTheSameUser(user, userId);

  function getEditorProps() {
    return {
      onSave: (content) => onUpdate(content),
      onCancel: () => setEditMode(false),
      initialContent: content,
      useTitle: false,
    };
  }

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
      {editMode ? <Editor {...getEditorProps()} /> : commentElement}
    </div>
  );
};

export default Comment;
