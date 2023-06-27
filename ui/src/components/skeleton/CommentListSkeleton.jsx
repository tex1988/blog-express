import { CommentListWrapper } from '../CommentList';
import CommentSkeleton from './CommentSkeleton';

const CommentListSkeleton = () => {
  return (
    <CommentListWrapper>
      <CommentSkeleton count={3} />
    </CommentListWrapper>
  );
};

export default CommentListSkeleton;
