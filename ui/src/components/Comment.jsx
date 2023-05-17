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
      <div className="info">
        {userName}, {getDate(created)}
      </div>
      <div className="content">{content}</div>
      {modified && <div className="info">Edited {getDate(modified)}</div>}
      <div className="flex-row-left">
        {isEditable && <button onClick={() => setEditMode(true)}>Edit</button>}
        {isEditable && <button onClick={() => onCommentDelete(commentId)}>Delete</button>}
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
