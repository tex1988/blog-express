import { useMutation, useQuery, useQueryClient } from 'react-query';
import { deletePostById, fetchPostById, updatePost } from '../api/api';
import { useNavigate } from 'react-router-dom';
import useNotificationContext from './useNotificationContext';

export default function usePostQuery(postId, userId) {
  const { pushNotification } = useNotificationContext();
  const navigate = useNavigate();
  const queryKey = `post/${postId}`;
  const { isSuccess, isLoading, data } = useQuery({
    queryFn: () => fetchPostById(postId),
    queryKey,
    staleTime: 1000 * 5,
  });
  const post = data || {};
  const client = useQueryClient();
  const {
    mutate: editPost,
    isLoading: isEditLoading,
    isSuccess: isEditSuccess,
    isError: isEditError,
    reset: resetEdit,
  } = useMutation({
    mutationFn: (post) => updatePost(postId, post),
    onSuccess: () => client.invalidateQueries({ queryKey }),
    onError: (err) => onMutationError(err),
  });
  const {
    mutate: deletePost,
    isLoading: isDeleteLoading,
    isSuccess: isDeleteSuccess,
  } = useMutation({
    mutationFn: deletePostById,
    onSuccess: () => navigate(`/user/${userId}/post`),
    onError: (err) => onMutationError(err),
  });

  function onMutationError(error) {
    pushNotification({ message: error.message, type: 'error' });
  }

  return {
    isSuccess,
    isLoading,
    post,
    editPost,
    isEditLoading,
    isEditSuccess,
    isEditError,
    resetEdit,
    deletePost,
    isDeleteLoading,
    isDeleteSuccess,
  };
}