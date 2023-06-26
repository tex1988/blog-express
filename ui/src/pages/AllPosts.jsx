import PostList from '../components/PostList';
import { Suspense } from 'react';
import PostListSkeleton from '../components/skeleton/PostListSkeleton';

const AllPosts = () => {
  return (
    <Suspense fallback={<PostListSkeleton />}>
      <PostList isMyPosts={false} />
    </Suspense>
  );
};

export default AllPosts;
