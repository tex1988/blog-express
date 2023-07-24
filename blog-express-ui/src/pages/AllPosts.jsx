import PostList from '../components/PostList';
import { Suspense } from 'react';
import { loadingFade, MotionPostListSkeleton, pageTransitionVariants } from '../components/animation/motionComponents';
import { AnimatePresence, motion } from 'framer-motion';

const AllPosts = () => {
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
            <PostList isMyPosts={false} />
          </Suspense>
        </AnimatePresence>
      </motion.div>
  );
};

export default AllPosts;
