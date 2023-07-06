import { useMutation, useQuery, useQueryClient } from 'react-query';
import { deleteCommentById, fetchCommentsByPostId, savePostComment, updateComment, } from '../api/api';
import useNotificationContext from './useNotificationContext';

export default function useCommentListQuery(props) {
  const {
    postId,
    fetchParams,
    afterSave = () => {},
    afterEdit = () => {},
    afterDelete = () => {},
    isFetch,
  } = props;
  const { pushNotification } = useNotificationContext();
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
    isSuccess: isSaveSuccess,
    isLoading: isSaveLoading,
    isError: isSaveError,
    reset: resetSave
  } = useMutation({
    mutationFn: (comment) => savePostComment(postId, comment),
    onSuccess: () => onSaveSuccess(),
    onError: (err) => onMutationError(err),
  });

  const {
    mutate: editComment,
    isSuccess: isEditSuccess,
    isLoading: isEditLoading,
    isError: isEditError,
    reset: resetEdit
  } = useMutation({
    mutationFn: (comment) => updateComment(comment.commentId, comment),
    onSuccess: () => onEditSuccess(),
    onError: (err) => onMutationError(err),
  });

  const {
    mutate: deleteComment,
    isSuccess: isDeleteSuccess,
    isLoading: isDeleteLoading,
  } = useMutation({
    mutationFn: deleteCommentById,
    onSuccess: () => onDeleteSuccess(),
    onError: (err) => onMutationError(err),
  });

  function onSaveSuccess() {
    pushNotification({
      message: 'Comment was successfully saved',
      type: 'success',
      autoClose: true,
    });
    client.invalidateQueries({ queryKey })
      .then(() => afterSave());
  }

  function onEditSuccess() {
    pushNotification({
      message: 'Comment was successfully edited',
      type: 'success',
      autoClose: true,
    });
    client.invalidateQueries({ queryKey })
      .then(() => afterEdit());
  }

  function onDeleteSuccess() {
    pushNotification({
      message: 'Comment was successfully deleted',
      type: 'success',
      autoClose: true,
    });
    client.invalidateQueries({ queryKey })
      .then(() => afterDelete());
  }

  function onMutationError(error) {
    pushNotification({ message: error.message, type: 'error' });
  }

  return {
    isSuccess,
    isLoading,
    comments,
    pageCount,
    saveComment,
    isSaveLoading,
    isSaveSuccess,
    isSaveError,
    resetSave,
    editComment,
    isEditLoading,
    isEditSuccess,
    isEditError,
    resetEdit,
    deleteComment,
    isDeleteLoading,
    isDeleteSuccess,
  };
}
