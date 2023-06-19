import { useContext, useEffect, useState } from 'react';
import {
  deleteCommentById,
  fetchCommentsByPostId,
  savePostComment,
  updateComment,
} from '../api/api';
import { useParams } from 'react-router-dom';
import Comment from './Comment';
import { UserContext } from '../App';
import { isPageExists, isTheSameUser } from '../../utils/utils';
import Editor from './Editor';
import styled from 'styled-components';
import Pagination from './Pagination';
import Search from './Search';

const CommentList = (props) => {
  const PAGE_SIZE = 5;
  const { user } = useContext(UserContext);
  const { showComments, showCommentsSearch, commentCount, setCommentCount, setShowComments } =
    props;
  const { defaultPage, defaultSort, defaultOrder, defaultSearch } = getDefaultParams();
  const { userId, postId } = useParams();
  const [comments, setComments] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [page, setPage] = useState(defaultPage);
  const [order, setOrder] = useState(defaultOrder);
  const [sort, setSort] = useState(defaultSort);
  const [search, setSearch] = useState(defaultSearch);
  const isCanLeftAComment = user && !isTheSameUser(user, userId);

  useEffect(() => {
    fetchPostComments(postId, page);
  }, [page, order, sort, search]);

  function fetchPostComments(postId, page) {
    fetchCommentsByPostId(postId, getFetchParams(page)).then((res) => {
      setComments(res.comments);
      setPageCount(res.pageCount);
    });
  }

  function getFetchParams(page) {
    const params = { order, sort, size: PAGE_SIZE, page };
    search && enrichWithSearch(params);
    return params;
  }

  function enrichWithSearch(params) {
    Object.entries(search).forEach((entry) => {
      const [key, value] = entry;
      params[key] = value;
    });
  }

  function getDefaultParams() {
    return {
      defaultPage: 1,
      defaultSort: 'created',
      defaultOrder: 'desc',
      defaultSearch: null,
    };
  }

  function onSearch(search) {
    setSearch(search);
    setPage(1);
  }

  function onCommentUpdate(comment) {
    updateComment(comment.commentId, comment).then(() => {
      fetchPostComments(postId, page);
    });
  }

  function onCommentDelete(commentId) {
    deleteCommentById(commentId).then(() => {
      afterDelete();
    });
  }

  function onCommentSave(content) {
    const comment = {
      content: content,
      userId: user.userId,
      postId: postId,
    };
    savePostComment(comment.postId, comment).then(async () => {
      afterSave();
    });
  }

  function afterSave() {
    fetchPostComments(postId, 1);
    setCommentCount((prev) => ++prev);
    setShowComments(true);
    setPage(1);
  }

  function afterDelete() {
    let newPage = page;
    if (!isPageExists(commentCount - 1, PAGE_SIZE, page)) {
      newPage--;
    }
    fetchPostComments(postId, newPage);
    setCommentCount((prev) => --prev);
    setPage(newPage);
  }

  function getSortOptions() {
    return [
      { value: 'created', label: 'creation date' },
      { label: 'author', value: 'author' },
    ];
  }

  function getSearchOptions() {
    return [
      { value: 'content', label: 'content' },
      { label: 'author', value: 'author' },
    ];
  }

  function getComments() {
    return comments.map((comment) => (
      <Comment
        key={`comment_${comment.commentId}`}
        comment={{ ...comment }}
        onCommentUpdate={onCommentUpdate}
        onCommentDelete={onCommentDelete}
      />
    ));
  }

  return (
    <CommentsWrapper>
      {showComments && (
        <>
          {showCommentsSearch && (
            <Search
              sortOptions={getSortOptions()}
              searchOptions={getSearchOptions()}
              defaultSort={sort}
              defaultOrder={order}
              defaultSearch={defaultSearch}
              setOrder={setOrder}
              setSort={setSort}
              onSearch={onSearch}
            />
          )}
          {getComments()}
          {pageCount > 1 && (
            <Pagination
              initialPage={page - 1}
              pageCount={pageCount}
              pageRangeDisplayed={PAGE_SIZE}
              onPageChange={setPage}
            />
          )}
        </>
      )}
      <div className="flex-column" style={{ width: '100%' }}>
        {isCanLeftAComment && (
          <Editor
            onSave={(content) => onCommentSave(content)}
            useTitle={false}
            useCancel={false}
            saveLabel={'Post a comment'}
          />
        )}
      </div>
    </CommentsWrapper>
  );
};

const CommentsWrapper = styled.div.attrs({
  className: 'flex-column',
})`
  margin-top: 10px;
  margin-left: 20px;
`;

export default CommentList;
