import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { createUser } from '../api/api';
import useNotificationContext from './useNotificationContext';

export default function useRegisterQuery() {
  const { pushNotification } = useNotificationContext();
  const navigate = useNavigate();
  const { mutate: register, isLoading } = useMutation({
    mutationFn: (user) => createUser(user),
    onSuccess: () => navigate('/login'),
    onError: (err) => pushNotification({ message: err.message, type: 'error' }),
  });

  return { register, isLoading };
}
