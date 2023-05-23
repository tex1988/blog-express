import { getDate, isTheSameUser } from '../../utils/utils';
import { useContext, useState } from 'react';
import { UserContext } from '../App';
import Editor from './Editor';

const Comment = (props) => {
  const { user } = useContext(UserContext);
  const { commentId, content, created, modified, userId, userName, onCommentDelete, onCommentUpdate } = props;
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
    }
    onCommentUpdate(comment);
    setEditMode(false);
  }

  const commentElement = (
    <>
      <span className="info">
        {userName}, {getDate(created)}
      </span>
      <span className="content">{content}</span>
      <div className="info">
        {modified && <span>Edited {getDate(modified)}</span>}
        {isEditable && (
          <div className="flex-row-left">
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
    <div className="flex-column" style={{ marginTop: '5px' }}>
      {editMode ? <Editor {...getEditorProps()} /> : commentElement}
    </div>
  );
};

export default Comment;
