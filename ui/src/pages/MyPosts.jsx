import { createContext, useContext, useEffect, useState } from 'react';
import { fetchUserPosts, savePost } from '../api/api';
import { Navigate, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import Editor from '../components/Editor';
import PostPreview from '../components/PostPreview';
import Pagination from '../components/Pagination';
import styled from 'styled-components';

export const EditorContext = createContext(undefined);

const MyPosts = () => {
  const PAGE_SIZE = 5;
  const { user } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [page, setPage] = useState(1);
  const [isEditorVisible, setEditorVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user !== undefined) {
      fetchPostPage(page);
    }
  }, [page]);

  function fetchPostPage(pageNumber) {
    fetchUserPosts(user.userId, { size: PAGE_SIZE, page: pageNumber }).then((posts) => {
      if (posts.status) {
        navigate('/error');
      } else {
        setPageCount(posts.pageCount);
        setPosts(posts.posts);
      }
    });
  }

  function onPageChange(pageNumber) {
    setPage(pageNumber);
  }

  function getPostProps(post) {
    return {
      postId: post.postId,
      userName: `${user.firstName} ${user.lastName}`,
      userId: post.userId,
      title: post.title,
      content: post.content,
      created: post.created,
      modified: post.modified,
      commentsCount: post._count.comments,
      setPosts: (value) => setPosts(value),
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
      onPageChange: (pageNumber) => onPageChange(pageNumber),
    };
  }

  function getPosts() {
    if (posts.length > 0) {
      return posts.map((post) => (
        <PostPreview key={`post_${post.postId}`} {...getPostProps(post)} />
      ));
    }
  }

  function onAddPostClick() {
    setEditorVisible(true);
  }

  function onPostSave(title, content) {
    const post = {
      userId: user.userId,
      title: title,
      content: content,
    };
    savePost(post).then(async (res) => {
      if (res.status === 201) {
        fetchPostPage(page);
        setPage(1);
        setEditorVisible(false);
      } else {
        alert('An error occurred please try again later');
      }
    });
  }

  if (user === undefined) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex-column p-10">
      {getPosts()}
      {pageCount > 1 && <Pagination {...getPaginationProps()} />}
      {isEditorVisible && <Editor {...getEditorProps()} />}
      <EditorWrapper>
        {!isEditorVisible && <button onClick={onAddPostClick}>Create post</button>}
      </EditorWrapper>
    </div>
  );
};

const EditorWrapper = styled.div.attrs({
  className: 'flex-column'
})`
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
`;

export default MyPosts;
