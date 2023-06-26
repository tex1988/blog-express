import { createContext, Suspense } from 'react';
import { Navigate } from 'react-router-dom';
import PostList from '../components/PostList';
import useUserContext from '../hooks/useUserContext';
import PostListSkeleton from '../components/skeleton/PostListSkeleton';

export const EditorContext = createContext(undefined);

const MyPosts = () => {
  const { user } = useUserContext();

  if (user === undefined) {
    return <Navigate to="/login" />;
  }

  return (
    <Suspense fallback={<PostListSkeleton />}>
      <PostList isMyPosts={true} />
    </Suspense>
  );
};

export default MyPosts;
