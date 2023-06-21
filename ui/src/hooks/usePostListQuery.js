import { useMutation, useQuery, useQueryClient } from 'react-query';
import { fetchPosts, savePost } from '../api/api';
import { useErrorBoundary } from 'react-error-boundary';

export default function usePostListQuery(fetchParams) {
  const queryKey = `post?${JSON.stringify(fetchParams)}`;
  const { isSuccess, isLoading, error, data } = useQuery({
    queryFn: () => fetchPosts(fetchParams),
    queryKey,
    staleTime: 1000 * 5,
  });
  const { posts = null, pageCount = 1 } = data || {};
  const client = useQueryClient();
  const { mutate: createPost, error: saveError } = useMutation({
    mutationFn: savePost,
    onSuccess: () => client.invalidateQueries({ queryKey }),
  });
  const { showBoundary } = useErrorBoundary();

  if (error) showBoundary(error);

  return { isSuccess, isLoading, saveError, posts, pageCount, createPost };
}
