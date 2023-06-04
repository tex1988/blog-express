import { useEffect, useState } from 'react';
import { fetchPosts } from '../api/api';
import PostPreview from '../components/PostPreview';
import Pagination from '../components/Pagination';
import { useNavigate } from 'react-router-dom';

const AllPosts = () => {
  const PAGE_SIZE = 5;
  const [posts, setPosts] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPostPage(page);
  }, [page]);

  function fetchPostPage(pageNumber) {
    fetchPosts({ size: PAGE_SIZE, page: pageNumber }).then((posts) => {
      if (posts.status) {
        navigate('/error');
      } else {
        setPageCount(posts.pageCount);
        setPosts(posts.posts);
      }
    });
  }

  function getPosts() {
    if (posts.length > 0) {
      return posts.map((post) => (
        <PostPreview key={`post_${post.postId}`} {...getPostProps(post)} />
      ));
    }
  }

  function onPageChange(pageNumber) {
    setPage(pageNumber);
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

  function getPaginationProps() {
    return {
      pageCount: pageCount,
      pageRangeDisplayed: PAGE_SIZE,
      onPageChange: (pageNumber) => onPageChange(pageNumber),
    };
  }

  return (
    <div className="flex-column p-10">
      {getPosts()}
      {pageCount > 1 && <Pagination {...getPaginationProps()} />}
    </div>
  );
};

export default AllPosts;
