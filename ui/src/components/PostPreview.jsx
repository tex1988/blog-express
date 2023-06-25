import { getDate } from '../utils/utils';
import { useNavigate } from 'react-router-dom';

const PostPreview = ({ post }) => {
  const { postId, title, content, userId, created, modified } = post;
  const commentsCount = post?._count?.comments;
  const userName = `${post?.user?.firstName} ${post?.user?.lastName}`;
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
    navigate(`/user/${userId}/post/${postId}`);
  }

  return (
    <div className="flex-column">
      <h3 onClick={navigateToPost} style={{ cursor: 'pointer' }}>
        {title}
      </h3>
      <span className="info">
        Posted by {userName}, {getDate(created)}
      </span>
      <span className="content">{contentPreview}</span>
      <div className="info" style={{ textAlign: 'right' }}>
        <span>Comments: {commentsCount}</span>
        {modified && <span>Edited {getDate(modified)}</span>}
      </div>
    </div>
  );
};

export default PostPreview;
