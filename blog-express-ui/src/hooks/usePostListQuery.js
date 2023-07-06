import { useMutation, useQuery, useQueryClient } from 'react-query';
import { fetchPosts, savePost } from '../api/api';
import useNotificationContext from './useNotificationContext';

export default function usePostListQuery(fetchParams) {
  const { pushNotification } = useNotificationContext();
  const queryKey = `post?${JSON.stringify(fetchParams)}`;
  const { isSuccess, isLoading, data } = useQuery({
    queryFn: () => fetchPosts(fetchParams),
    queryKey,
    staleTime: 1000 * 5,
  });
  const { posts = null, pageCount = 1 } = data || {};
  const client = useQueryClient();
  const {
    mutate: createPost,
    isLoading: isSaveLoading,
  } = useMutation({
    mutationFn: savePost,
    onSuccess: () => client.invalidateQueries({ queryKey }),
    onError: (err) => pushNotification({ message: err.message, type: 'error' }),
  });

  return { isSuccess, isLoading, posts, pageCount, createPost, isSaveLoading };
}
