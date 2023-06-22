import { useMutation, useQuery, useQueryClient } from 'react-query';
import { deletePostById, fetchPostById, updatePost } from '../api/api';
import { useErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';

export default function usePostQuery(postId, userId) {
  const navigate = useNavigate();
  const queryKey = `post/${postId}`;
  const { isSuccess, isLoading, error, data } = useQuery({
    queryFn: () => fetchPostById(postId),
    queryKey,
    staleTime: 1000 * 5,
  });
  const post = data || {};
  const client = useQueryClient();
  const {
    mutate: editPost,
    error: editError,
    isSuccess: isEditSuccess,
  } = useMutation({
    mutationFn: (post) => updatePost(postId, post),
    onSuccess: () => client.invalidateQueries({ queryKey }),
  });
  const {
    mutate: deletePost,
    error: deleteError,
    isSuccess: isDeleteSuccess,
  } = useMutation({
    mutationFn: deletePostById,
    onSuccess: () => navigate(`/user/${userId}/post`),
  });
  const { showBoundary } = useErrorBoundary();

  if (error) showBoundary(error);

  return {
    isSuccess,
    isLoading,
    post,
    editPost,
    editError,
    isEditSuccess,
    deletePost,
    deleteError,
    isDeleteSuccess,
  };
}