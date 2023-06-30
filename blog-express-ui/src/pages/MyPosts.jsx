import { createContext, Suspense } from 'react';
import PostList from '../components/PostList';
import PostListSkeleton from '../components/skeleton/PostListSkeleton';

export const EditorContext = createContext(undefined);

const MyPosts = () => {

  return (
    <Suspense fallback={<PostListSkeleton />}>
      <PostList isMyPosts={true} />
    </Suspense>
  );
};

export default MyPosts;
