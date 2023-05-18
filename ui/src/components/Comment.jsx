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
      <div className='info'>
        {modified && <div>Edited {getDate(modified)}</div>}
        {isEditable && (<div className='flex-row-left'>
          <div className='underlined-button' onClick={() => setEditMode(true)}>Edit</div>
          <div className='underlined-button' onClick={() => onCommentDelete(commentId)}
               style={{ marginLeft: '5px' }}>Delete
          </div>
        </div>)}
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
