import { useEffect, useState } from 'react';
import { fetchPostsByPage } from '../api/api';
import PostPreview from '../components/PostPreview';
import Pagination from '../components/Pagination';

const AllPosts = () => {
  const PAGE_SIZE = 5;
  const [posts, setPosts] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchPostPage(page);
  }, []);

  useEffect(() => {
    fetchPostPage(page);
  }, [page]);

  function fetchPostPage(pageNumber) {
    fetchPostsByPage(PAGE_SIZE, pageNumber).then((res) => {
      setPageCount(res.pageCount);
      setPosts(res.posts);
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
    <div className="flex-column" style={{ padding: '10px' }}>
      {getPosts()}
      {pageCount > 1 && <Pagination {...getPaginationProps()} />}
    </div>
  );
};

export default AllPosts;
