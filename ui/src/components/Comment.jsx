import { getDate, isTheSameUser } from '../../utils/utils';
import { useContext, useState } from 'react';
import { UserContext } from '../App';
import { deleteCommentById } from '../api/api';
import Editor from './Editor';

const Comment = (props) => {
  const { user } = useContext(UserContext);
  const { commentId, content, created, modified, userId, userName, onUpdate, onCommentUpdate } =
    props;
  const [editMode, setEditMode] = useState(false);
  const isEditable = isTheSameUser(user, userId);

  function onDeleteClick() {
    deleteCommentById(commentId).then((status) => {
      if (status === 200) {
        onUpdate();
      } else {
        alert('An error occurred please try again later');
      }
    });
  }

  function getEditorProps() {
    return {
      onSave: (content) => onCommentEdit(content),
      onCancel: () => setEditMode(false),
      initialContent: content,
      useTitle: false,
    };
  }

  function onCommentEdit(content) {
    const comment = {
      commentId: commentId,
      content: content,
    }
    onCommentUpdate(comment);
    setEditMode(false);
  }

  const postElement = (
    <>
      <div className="info">
        {userName}, {getDate(created)}
      </div>
      <div className="content">{content}</div>
      {modified && <div className="info">Edited {getDate(modified)}</div>}
      <div className="flex-row-left">
        {isEditable && <button onClick={() => setEditMode(true)}>Edit</button>}
        {isEditable && <button onClick={onDeleteClick}>Delete</button>}
      </div>
    </>
  );

  return (
    <div className="flex-column" style={{ marginTop: '5px' }}>
      {editMode ? <Editor {...getEditorProps()} /> : postElement}
    </div>
  );
};

export default Comment;
