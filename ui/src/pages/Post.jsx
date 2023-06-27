import { Suspense } from 'react';
import Loading from '../components/Loading';
import FullPost from '../components/FullPost';

const Post = () => {
  return (
    <Suspense fallback={<Loading />}>
      <FullPost />
    </Suspense>
  );
};

export default Post;
