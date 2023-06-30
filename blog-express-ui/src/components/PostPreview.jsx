import { getDate } from '../utils/utils';
import { Link } from 'react-router-dom';

const PostPreview = ({ post }) => {
  const { postId, title, content, userId, created, modified } = post;
  const commentsCount = post?._count?.comments;
  const userName = `${post?.user?.firstName} ${post?.user?.lastName}`;
  const contentPreview = getContentPreview();

  function getContentPreview() {
    let preview = content;
    if (content.length > 200) {
      preview = content.substring(0, 200) + '...';
    }
    return preview;
  }

  return (
    <div className="flex-column">
      <Link className='title' to={`/user/${userId}/post/${postId}`}>{title}</Link>
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
