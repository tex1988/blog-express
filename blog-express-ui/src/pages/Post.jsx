import { Suspense } from 'react';
import FullPost from '../components/FullPost';
import FullPostSkeleton from '../components/skeleton/FullPostSkeleton';

const Post = () => {
  return (
    <Suspense fallback={<FullPostSkeleton />}>
      <FullPost />
    </Suspense>
  );
};

export default Post;
