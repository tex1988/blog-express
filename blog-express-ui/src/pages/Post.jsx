import { Suspense } from 'react';
import FullPost from '../components/FullPost';
import { loadingFade, MotionFullPostSkeleton } from '../components/animation/motionComponents';
import { AnimatePresence } from 'framer-motion';

const Post = () => {
  return (
    <AnimatePresence mode="wait">
      <Suspense
        fallback={
          <MotionFullPostSkeleton
            variants={loadingFade}
            initial="hidden"
            animate="visible"
            exit="hidden"
          />
        }>
        <FullPost />
      </Suspense>
    </AnimatePresence>
  );
};

export default Post;
