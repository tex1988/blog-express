import { useContext, useEffect, useState } from 'react';
import { fetchPosts, savePost } from '../api/api';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { UserContext } from '../App';
import Editor from '../components/Editor';
import PostPreview from '../components/PostPreview';
import Pagination from '../components/Pagination';
import Search from './Search';
import styled from 'styled-components';

const Posts = (props) => {
  const PAGE_SIZE = 5;
  const { isMyPosts } = props;
  const { user } = useContext(UserContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const { defaultPage, defaultSort, defaultOrder, defaultSearch } = getDefaultParams();
  const [posts, setPosts] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [page, setPage] = useState(defaultPage);
  const [isEditorVisible, setEditorVisible] = useState(false);
  const [order, setOrder] = useState(defaultOrder);
  const [sort, setSort] = useState(defaultSort);
  const [search, setSearch] = useState(defaultSearch);
  const navigate = useNavigate();

  useEffect(() => {
    getPosts();
    setSearchParams(new URLSearchParams(getFetchParams()));
  }, [page, order, sort, search]);

  function getPosts() {
    fetchPosts(getFetchParams())
      .then((res) => {
        setPageCount(res.pageCount);
        setPosts(res.posts);
      })
      .catch(() => {
        navigate('/error');
      });
  }

  function getFetchParams() {
    const params = { order, sort, size: PAGE_SIZE, page };
    search && enrichWithSearch(params);
    isMyPosts && (params.userId = user.userId);
    return params;
  }

  function getDefaultParams() {
    const params = Object.fromEntries(searchParams);
    const { page, sort, order } = params;
    const defaultSearch = getSearchParam(params);
    const defaultParams = {};
    Object.assign(defaultParams,
      page ? { defaultPage: Number(page) } : { defaultPage: 1 },
      sort ? { defaultSort: sort } : { defaultSort: 'created' },
      order ? { defaultOrder: order } : { defaultOrder: 'desc' },
      defaultSearch ? {defaultSearch} : null);
    return defaultParams;
  }

  function getSearchParam(params) {
    const nonSearchParams = ['sort', 'order', 'page', 'size'];
    let searchParams = { ...params };
    nonSearchParams.forEach((param) => delete searchParams[param]);
    if (Object.keys(searchParams).length === 0) {
      searchParams = null;
    }
    return searchParams;
  }

  function enrichWithSearch(params) {
    Object.entries(search).forEach((entry) => {
      const [key, value] = entry;
      params[key] = value;
    });
  }

  function onSearch(search) {
    setSearch(search);
    setPage(1);
  }

  function getPostProps(post) {
    return {
      postId: post.postId,
      userName: `${post.user.firstName} ${post.user.lastName}`,
      userId: post.userId,
      title: post.title,
      content: post.content,
      created: post.created,
      modified: post.modified,
      commentsCount: post._count.comments,
    };
  }

  function getEditorProps() {
    return {
      onSave: (title, content) => onPostSave(content, title),
      onCancel: () => setEditorVisible(false),
      initialTitle: '',
      initialContent: '',
      useTitle: true,
    };
  }

  function getPaginationProps() {
    return {
      initialPage: page - 1,
      pageCount: pageCount,
      pageRangeDisplayed: PAGE_SIZE,
      onPageChange: (pageNumber) => setPage(pageNumber),
    };
  }

  function getPostPreviews() {
    if (posts.length > 0) {
      return posts.map((post) => (
        <PostPreview key={`post_${post.postId}`} {...getPostProps(post)} />
      ));
    }
  }

  function onPostSave(title, content) {
    const post = {
      userId: user.userId,
      title: title,
      content: content,
    };
    savePost(post)
      .then(() => {
        getPosts();
        setPage(1);
        setEditorVisible(false);
      })
      .catch(() => {
        alert('An error occurred please try again later');
      });
  }

  return (
    <div className="flex-column p-10">
      <Search
        defaultSort={sort}
        defaultOrder={order}
        defaultSearch={defaultSearch}
        setOrder={setOrder}
        setSort={setSort}
        onSearch={onSearch}
        allowAuthorSearch={!isMyPosts}
      />
      {getPostPreviews()}
      {pageCount > 1 && <Pagination {...getPaginationProps()} />}
      {isMyPosts && isEditorVisible && <Editor {...getEditorProps()} />}
      {isMyPosts && (
        <ButtonWrapper>
          {!isEditorVisible && <button onClick={() => setEditorVisible(true)}>Create post</button>}
        </ButtonWrapper>
      )}
    </div>
  );
};

const ButtonWrapper = styled.div.attrs({
  className: 'flex-column'
})`
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
`;

export default Posts;