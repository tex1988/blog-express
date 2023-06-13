import { useContext, useEffect, useState } from 'react';
import { fetchPosts, savePost } from '../api/api';
import { useNavigate } from 'react-router-dom';
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
  const [posts, setPosts] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [page, setPage] = useState(1);
  const [isEditorVisible, setEditorVisible] = useState(false);
  const [order, setOrder] = useState('desc');
  const [sort, setSort] = useState('created');
  const [search, setSearch] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getPosts();
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


  function enrichWithSearch(params) {
    Object.entries(search).forEach((entry) => {
      const [key, value] = entry;
      params[key] = value
    });
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
      <Search {...{ setOrder, setSort, setSearch, defaultSort: 'created', defaultOrder: 'desc', defaultSearch: 'content',isMyPosts }} />
      {getPostPreviews()}
      {pageCount > 1 && <Pagination {...getPaginationProps()} />}
      {isMyPosts && isEditorVisible && <Editor {...getEditorProps()} />}
      {isMyPosts && (
        <ButtonWrapper>
          {!isEditorVisible && <button onClick={()=> setEditorVisible(true)}>Create post</button>}
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