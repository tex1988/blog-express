import PostList from '../components/PostList';
import Loading from '../components/Loading';
import { Suspense } from 'react';

const AllPosts = () => {
  return (
    <Suspense fallback={<Loading />}>
      <PostList isMyPosts={false} />
    </Suspense>
  );
};

export default AllPosts;
