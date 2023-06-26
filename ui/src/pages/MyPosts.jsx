import { createContext, Suspense } from 'react';
import { Navigate } from 'react-router-dom';
import PostList from '../components/PostList';
import Loading from '../components/Loading';
import useUserContext from '../hooks/useUserContext';

export const EditorContext = createContext(undefined);

const MyPosts = () => {
  const { user } = useUserContext();

  if (user === undefined) {
    return <Navigate to="/login" />;
  }

  return (
    <Suspense fallback={<Loading />}>
      <PostList isMyPosts={true} />
    </Suspense>
  );
};

export default MyPosts;
