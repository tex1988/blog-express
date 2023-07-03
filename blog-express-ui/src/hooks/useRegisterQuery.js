import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { createUser } from '../api/api';

export default function useRegisterQuery() {
  const navigate = useNavigate();
  const {
    mutate: register,
    error,
    isLoading,
  } = useMutation({
    mutationFn: (user) => createUser(user),
    onSuccess: () => navigate('/login'),
  });

  return { register, error, isLoading };
}
