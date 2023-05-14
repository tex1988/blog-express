import { getDate } from '../../utils/utils';
import { useNavigate } from 'react-router-dom';

const PostPreview = (props) => {
  const { postId, title, content, userName, userId, created, modified } = props;
  const contentPreview = getContentPreview();
  const navigate = useNavigate();

  function getContentPreview() {
    let preview = content;
    if (content.length > 200) {
      preview = content.substring(0, 200) + '...';
    }
    return preview;
  }

  function navigateToPost() {
    navigate(`/user/${userId}/post/${postId}`)
  }

  return (
    <div className='flex-column'>
      <h3 onClick={navigateToPost} style={{cursor: 'pointer'}}>{title}</h3>
      <div className="post-info">
        Posted by {userName}, {getDate(created)}
      </div>
      <div className="content">{contentPreview}</div>
      {modified && (
        <div className="post-info" style={{ textAlign: 'right' }}>
          Edited {getDate(modified)}
        </div>
      )}
    </div>
  );
};

export default PostPreview;
