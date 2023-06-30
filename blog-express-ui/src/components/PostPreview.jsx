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
      <h3 onClick={navigateToPost} style={{ cursor: 'pointer', width: 'fit-content' }}>
        {title}
      </h3>
      <div className="flex-row-left info">
        <span>
          Posted by {userName}, {getDate(created)}
          {modified && `, edited ${getDate(modified)}`}
        </span>
      </div>
      <span className="content">{contentPreview}</span>
      <div className="flex-row-left info" style={{ textAlign: 'right' }}>
        <span>Comments: {commentsCount}</span>
      </div>
    </div>
  );
};

export default PostPreview;
