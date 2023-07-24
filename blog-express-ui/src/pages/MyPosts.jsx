import { Suspense } from 'react';
import PostList from '../components/PostList';
import { loadingFade, MotionPostListSkeleton, pageTransitionVariants } from '../components/animation/motionComponents';
import { AnimatePresence, motion } from 'framer-motion';

const MyPosts = () => {
  return (
    <motion.div
      variants={pageTransitionVariants}
      initial="hidden"
      animate="visible"
      exit="exit">
      <AnimatePresence mode='wait'>
        <Suspense
          fallback={
            <MotionPostListSkeleton
              variants={loadingFade}
              initial='hidden'
              animate='visible'
              exit='hidden'
            />
          }>
          <PostList isMyPosts={true} />
        </Suspense>
      </AnimatePresence>
    </motion.div>
  );
};

export default MyPosts;
