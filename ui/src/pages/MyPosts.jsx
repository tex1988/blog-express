import { createContext, Suspense, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../App';
import PostList from '../components/PostList';
import Loading from '../components/Loading';

export const EditorContext = createContext(undefined);

const MyPosts = () => {
  const { user } = useContext(UserContext);

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
