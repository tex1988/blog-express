import useAuthContext from '../hooks/useAuthContext';
import { Navigate, useLocation } from 'react-router-dom';

const RequireAuth = ({ children }) => {
  const { user } = useAuthContext();
  const location = useLocation();

  if (!user) return <Navigate to={'/'} state={{ from: location }} />;

  return children;
};

export default RequireAuth;