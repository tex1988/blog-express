import { Suspense } from 'react';
import FullPost from '../components/FullPost';
import { loadingFade, MotionFullPostSkeleton, pageTransitionVariants } from '../components/animation/motionComponents';
import { AnimatePresence, motion } from 'framer-motion';

const Post = () => {
  return (
    <motion.div
      variants={pageTransitionVariants}
      initial="hidden"
      animate="visible"
      exit="exit">
      <AnimatePresence mode='wait'>
        <Suspense
          fallback={
            <MotionFullPostSkeleton
              variants={loadingFade}
              initial='hidden'
              animate='visible'
              exit='hidden'
            />
          }>
          <FullPost />
        </Suspense>
      </AnimatePresence>
    </motion.div>
  );
};

export default Post;
