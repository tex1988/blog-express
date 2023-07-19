import { createContext, Suspense } from 'react';
import PostList from '../components/PostList';
import { loadingFade, MotionPostListSkeleton } from '../components/animation/motionComponents';
import { AnimatePresence } from 'framer-motion';

export const EditorContext = createContext(undefined);

const MyPosts = () => {
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
        <PostList isMyPosts={true} />
      </Suspense>
    </AnimatePresence>
  );
};

export default MyPosts;
