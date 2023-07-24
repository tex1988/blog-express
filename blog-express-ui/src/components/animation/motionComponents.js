import { motion } from 'framer-motion';
import Comment from '../Comment';
import CommentSkeleton from '../skeleton/CommentSkeleton';
import Editor from '../Editor';
import Empty from '../ui/Empty';
import Search from '../Search';
import CommentListSkeleton from '../skeleton/CommentListSkeleton';
import Pagination from '../ui/Pagination';
import FullPostSkeleton from '../skeleton/FullPostSkeleton';
import PostListSkeleton from '../skeleton/PostListSkeleton';
import PostPreviewSkeleton from '../skeleton/PostPreviewSkeleton';
import PostPreview from '../PostPreview';
import { NavLink } from 'react-router-dom';

export const basicFade = {
  hidden: { opacity: 0, transition: { duration: 0.25 } },
  visible: { opacity: 1, transition: { duration: 0.25 } },
};

export const loadingFade = {
  hidden: { opacity: 0, transition: { duration: 0.5 } },
  visible: { opacity: 1, transition: { duration: 0.5 } },
}

export const paginationVariants = {
  hidden: { opacity: 1, transition: { duration: 0.1} },
  visible: {  opacity: 1, transition: { duration: 0.1, staggerChildren: 0.1, when: "afterChildren" } },
};

export const paginationChildrenVariants = {
  hidden: { opacity: 0, x: 400, },
  visible: (options) => ({  opacity: 1, x: 0, transition: {duration: 0.1, delay: options.delay} }),
  exit: (options) => ({  opacity: 0, x: 400, transition: {duration: 0.1, delay: options.exitDelay} })
};

export const pageTransitionVariants = {
  hidden: { opacity: 0, x: 400 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.2 } },
  exit: { opacity: 0, x: -400, transition: { duration: 0.2 } },
};

export const basicTransition = { layout: { duration: 0.25 } }

export const MotionComment = motion(Comment);
export const MotionCommentSkeleton = motion(CommentSkeleton);
export const MotionPostPreviewSkeleton = motion(PostPreviewSkeleton);
export const MotionCommentListSkeleton = motion(CommentListSkeleton);
export const MotionFullPostSkeleton = motion(FullPostSkeleton);
export const MotionPostListSkeleton = motion(PostListSkeleton);
export const MotionEditor = motion(Editor);
export const MotionEmpty = motion(Empty);
export const MotionSearch = motion(Search);
export const MotionPagination = motion(Pagination);
export const MotionPostPreview = motion(PostPreview);
export const MotionNavLink = motion(NavLink);