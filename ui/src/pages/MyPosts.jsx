import { createContext, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../App';
import Posts from '../components/Posts';

export const EditorContext = createContext(undefined);

const MyPosts = () => {
  const { user } = useContext(UserContext);

  if (user === undefined) {
    return <Navigate to="/login" />;
  }

  return <Posts isMyPosts={true} />;
};

export default MyPosts;
