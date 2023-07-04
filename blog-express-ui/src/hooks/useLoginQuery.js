import { useMutation } from 'react-query';
import useAuthContext from './useAuthContext';
import { useNavigate } from 'react-router-dom';
import { logInUser } from '../api/api';
import useNotificationContext from './useNotificationContext';

export default function useLoginQuery() {
  const { signIn } = useAuthContext();
  const { pushNotification } = useNotificationContext();
  const navigate = useNavigate();
  const {
    mutate: logIn,
    isLoading,
  } = useMutation({
    mutationFn: (credentials) => logInUser(credentials),
    onSuccess: (data) => updateAuthContext(data),
    onError: (err) => pushNotification({ message: err.message, type: 'error' }),
  });

  function updateAuthContext(user) {
    signIn(user);
    navigate(`/user/${user.userId}/post`);
  }

  return { logIn, isLoading };
}