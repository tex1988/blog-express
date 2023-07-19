import { CommentListWrapper } from '../CommentList';
import CommentSkeleton from './CommentSkeleton';
import SearchSkeleton from './SearchSkeleton';
import { forwardRef } from 'react';

const CommentListSkeleton = forwardRef(({ search = false }, ref) => {
  return (
    <div ref={ref}>
      <CommentListWrapper>
        {search && <SearchSkeleton />}
        <CommentSkeleton count={3} />
      </CommentListWrapper>
    </div>
  );
});

export default CommentListSkeleton;
