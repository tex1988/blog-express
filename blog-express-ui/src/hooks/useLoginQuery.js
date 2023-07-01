import { useMutation } from 'react-query';
import useAuthContext from './useAuthContext';
import { useNavigate } from 'react-router-dom';
import { logInUser } from '../api/api';

export default function useLoginQuery(credentials) {
  const { signIn } = useAuthContext();
  const navigate = useNavigate();
  const {
    mutate: logIn,
    error,
    isLoading,
  } = useMutation({
    mutationFn: () => logInUser(credentials),
    onSuccess: (data) => updateAuthContext(data),
  });

  function updateAuthContext(user) {
    signIn(user);
    navigate(`/user/${user.userId}/post`);
  }

  return { logIn, error, isLoading };
}