import PostList from '../components/PostList';
import { Suspense } from 'react';
import { loadingFade, MotionPostListSkeleton } from '../components/animation/motionComponents';
import { AnimatePresence } from 'framer-motion';

const AllPosts = () => {
  return (
    <AnimatePresence mode="wait">
      <Suspense
        fallback={
          <MotionPostListSkeleton
            variants={loadingFade}
            initial="hidden"
            animate="visible"
            exit="hidden"
          />
        }>
        <PostList isMyPosts={false} />
      </Suspense>
    </AnimatePresence>
  );
};

export default AllPosts;
