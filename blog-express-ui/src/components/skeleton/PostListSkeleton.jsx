import PostPreviewSkeleton from './PostPreviewSkeleton';
import SearchSkeleton from './SearchSkeleton';
import { forwardRef } from 'react';

const PostListSkeleton = forwardRef(({}, ref) => {
  return (
    <div className="flex-column p-10" ref={ref}>
      <SearchSkeleton />
      <PostPreviewSkeleton count={3} />
    </div>
  );
});

export default PostListSkeleton;