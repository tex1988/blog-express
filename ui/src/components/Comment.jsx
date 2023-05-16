import { getDate, isTheSameUser } from '../../utils/utils';
import { useContext, useState } from 'react';
import { UserContext } from '../App';
import { deleteCommentById } from '../api/api';

const Comment = (props) => {
  const { user } = useContext(UserContext);
  const { commentId, content, created, modified, userId, userName, onUpdate } = props;
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

  return (
    <div className="flex-column" style={{marginTop: '5px'}}>
      <div className="info">
        {userName}, {getDate(created)}
      </div>
      <div className="content">{content}</div>
      {modified && <div className="info">Edited {getDate(modified)}</div>}
      <div className="flex-row-left">
        {isEditable && <button onClick={() => setEditMode(true)}>Edit</button>}
        {isEditable && <button onClick={onDeleteClick}>Delete</button>}
      </div>
    </div>
  );
};

export default Comment;
