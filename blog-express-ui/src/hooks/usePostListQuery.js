import { useMutation, useQuery, useQueryClient } from 'react-query';
import { fetchPosts, savePost } from '../api/api';

export default function usePostListQuery(fetchParams) {
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
    error: saveError,
    isLoading: isSaveLoading,
  } = useMutation({
    mutationFn: savePost,
    onSuccess: () => client.invalidateQueries({ queryKey }),
  });

  return { isSuccess, isLoading, saveError, posts, pageCount, createPost, isSaveLoading };
}
