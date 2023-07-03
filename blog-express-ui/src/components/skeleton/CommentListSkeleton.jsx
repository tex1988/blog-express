import { CommentListWrapper } from '../CommentList';
import CommentSkeleton from './CommentSkeleton';
import SearchSkeleton from './SearchSkeleton';

const CommentListSkeleton = ({ search = false }) => {
  return (
    <CommentListWrapper>
      {search && <SearchSkeleton />}
      <CommentSkeleton count={3} />
    </CommentListWrapper>
  );
};

export default CommentListSkeleton;
