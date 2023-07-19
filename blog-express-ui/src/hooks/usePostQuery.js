import { useMutation, useQuery, useQueryClient } from 'react-query';
import { deletePostById, fetchPostById, updatePost } from '../api/api';
import { useNavigate } from 'react-router-dom';
import useNotificationContext from './useNotificationContext';

export default function usePostQuery(postId, userId, setCommentCount, setEditMode) {
  const { pushNotification } = useNotificationContext();
  const navigate = useNavigate();
  const queryKey = `post/${postId}`;
  const { isSuccess, isLoading, data } = useQuery({
    queryFn: () => fetchPostById(postId),
    queryKey,
    staleTime: 1000 * 5,
    onSuccess: (data) => setCommentCount(data.commentCount)
  });
  const post = data || {};
  const client = useQueryClient();
  const isInvalidateLoading = !!client.isFetching(queryKey);
  const {
    mutate: editPost,
    isLoading: isEditLoading,
    isSuccess: isEditSuccess,
    isError: isEditError,
    reset: resetEdit,
  } = useMutation({
    mutationFn: (post) => updatePost(postId, post),
    onSuccess: () => onEditSuccess(),
    onError: (err) => onMutationError(err),
  });
  const {
    mutate: deletePost,
    isLoading: isDeleteLoading,
    isSuccess: isDeleteSuccess,
  } = useMutation({
    mutationFn: deletePostById,
    onSuccess: () => onDeleteSuccess(),
    onError: (err) => onMutationError(err),
  });

  function onEditSuccess() {
    pushNotification({
      message: 'Post was successfully edited',
      type: 'success',
      autoClose: true,
    });
    setEditMode(false);
    client.invalidateQueries({ queryKey });
  }

  function onDeleteSuccess() {
    pushNotification({
      message: 'Post was successfully deleted',
      type: 'success',
      autoClose: true,
    });
    navigate(`/user/${userId}/post`, { replace: true, state: { deletedPostId: Number(postId) } });
  }

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
    isInvalidateLoading
  };
}