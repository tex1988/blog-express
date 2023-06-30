import { useMutation, useQuery, useQueryClient } from 'react-query';
import { deleteCommentById, fetchCommentsByPostId, savePostComment, updateComment, } from '../api/api';

export default function useCommentListQuery(props) {
  const {
    postId,
    fetchParams,
    afterSave = () => {},
    afterEdit = () => {},
    afterDelete = () => {},
    isFetch,
  } = props;
  const queryKey = `post/${postId}/comment?${JSON.stringify(fetchParams)}`;
  const { isSuccess, isLoading, data } = useQuery({
    queryFn: () => fetchCommentsByPostId(postId, fetchParams),
    queryKey,
    staleTime: 1000 * 5,
    enabled: isFetch,
  });

  const { comments = null, pageCount = 1 } = data || {};
  const client = useQueryClient();
  const {
    mutate: saveComment,
    error: saveError,
    isSuccess: isSaveSuccess,
    isLoading: isSaveLoading,
  } = useMutation({
    mutationFn: (comment) => savePostComment(postId, comment),
    onSuccess: () => client.invalidateQueries({ queryKey })
      .then(() => afterSave()),
  });

  const {
    mutate: editComment,
    error: editError,
    isSuccess: isEditSuccess,
    isLoading: isEditLoading,
  } = useMutation({
    mutationFn: (comment) => updateComment(comment.commentId, comment),
    onSuccess: () => client.invalidateQueries({ queryKey })
      .then(() => afterEdit()),
  });

  const {
    mutate: deleteComment,
    error: deleteError,
    isSuccess: isDeleteSuccess,
    isLoading: isDeleteLoading,
  } = useMutation({
    mutationFn: deleteCommentById,
    onSuccess: () => client.invalidateQueries({ queryKey })
      .then(() => afterDelete()),
  });

  return {
    isSuccess,
    isLoading,
    saveError,
    comments,
    pageCount,
    saveComment,
    isSaveLoading,
    isSaveSuccess,
    editComment,
    editError,
    isEditLoading,
    isEditSuccess,
    deleteComment,
    deleteError,
    isDeleteLoading,
    isDeleteSuccess,
  };
}
