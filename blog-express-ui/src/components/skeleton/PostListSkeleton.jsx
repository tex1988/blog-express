import PostPreviewSkeleton from './PostPreviewSkeleton';
import SearchSkeleton from './SearchSkeleton';

const PostListSkeleton = () => {
  return (
    <div className="flex-column p-10">
      <SearchSkeleton />
      <PostPreviewSkeleton count={3} />
    </div>
  );
};

export default PostListSkeleton;