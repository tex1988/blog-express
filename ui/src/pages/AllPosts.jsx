import { useEffect, useState } from 'react';
import { fetchPosts } from '../api/api';
import PostPreview from '../components/PostPreview';

const AllPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts().then((posts) => setPosts(posts));
  }, []);

  function getPosts() {
    if (posts.length > 0) {
      return posts.map((post) => (
        <PostPreview key={`post_${post.postId}`} {...getPostProps(post)} />
      ));
    }
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
      commentsCount: post._count.comments
    };
  }

  return (
    <div className="flex-column" style={{ width: '100%' }}>
      {getPosts()}
    </div>
  );
};

export default AllPosts;