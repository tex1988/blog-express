import { useState } from 'react';
import styled from 'styled-components';
import usePostListQuery from '../hooks/usePostListQuery';
import useDefaultSearchParams from '../hooks/useDefaultSearchParams';
import useAuthContext from '../hooks/useAuthContext';
import {
  basicFade,
  basicTransition, loadingFade,
  MotionEditor, MotionEmpty, MotionPagination,
  MotionPostPreview,
  MotionPostPreviewSkeleton, MotionSearch, pageChildrenVariants, pageVariants,
} from './animation/motionComponents';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const NON_SEARCH_PARAMS = ['sort', 'order', 'page', 'size'];
const PAGE_SIZE = 5;

const PostList = ({ isMyPosts }) => {
  const { user } = useAuthContext();
  const { page, setPage, sort, setSort, order, setOrder, searchQuery, setSearchQuery } =
    useDefaultSearchParams(NON_SEARCH_PARAMS);
  const [isEditorVisible, setEditorVisible] = useState(false);
  const fetchParams = getFetchParams();
  const {
    isSuccess,
    posts,
    pageCount,
    createPost,
    isSaveLoading,
    isCreateError,
    resetCreate,
    isSavedPostLoading,
    isInvalidateLoading,
  } = usePostListQuery(fetchParams);
  const location = useLocation();
  const [deletedPostId] = useState(location?.state?.deletedPostId);

  function getFetchParams() {
    const params = { order, sort, size: PAGE_SIZE, page };
    searchQuery && enrichWithSearch(params);
    isMyPosts && (params.userId = user.userId);
    return params;
  }

  function enrichWithSearch(params) {
    Object.entries(searchQuery).forEach((entry) => {
      const [key, value] = entry;
      params[key] = value;
    });
  }

  function getSortOptions() {
    const options = [
      { value: 'created', label: 'creation date' },
      { value: 'modified', label: 'edit date' },
    ];
    !isMyPosts && options.push({ label: 'author', value: 'author' });
    return options;
  }

  function getSearchOptions() {
    const options = [
      { value: 'content', label: 'content' },
      { value: 'title', label: 'title' },
    ];
    !isMyPosts && options.push({ label: 'author', value: 'author' });
    return options;
  }

  function getPostPreviews() {
    if (isSuccess && posts.length > 0) {
      return (
        <motion.div
          layout="position"
          layoutId="post_list"
          key={`post_page_${page}`}
          variants={pageVariants}
          initial="hidden"
          animate="visible">
          <AnimatePresence mode="wait">
            {isSavedPostLoading && (
              <MotionPostPreviewSkeleton
                key="post_new"
                transition={basicTransition}
                variants={basicFade}
                initial="hidden"
                animate="visible"
                exit="hidden"
              />
            )}
          </AnimatePresence>
          {posts.map((post, index) => {
            const postId = post.postId;
            return (
              <motion.div
                key={`post_list_item_${postId}`}
                variants={pageChildrenVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                custom={{ delay: index * 0.1, exitDelay: (PAGE_SIZE - index) * 0.1 }}>
                <AnimatePresence mode="wait" initial={false}>
                  {postId === deletedPostId && isInvalidateLoading ? (
                    <MotionPostPreviewSkeleton
                      key="post_deleted"
                      layoutId={`post_item_${postId}`}
                      transition={basicTransition}
                      variants={basicFade}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                    />
                  ) : (
                    <MotionPostPreview
                      key={`post_${postId}`}
                      post={post}
                      layoutId={`post_item_${postId}`}
                      transition={basicTransition}
                      variants={basicFade}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      );
    }
  }

  function onPostSave(title, content) {
    const post = {
      userId: user.userId,
      title: title,
      content: content,
    };
    createPost(post);
  }

  return (
    <motion.div
      className="flex-column p-10"
      key="posts"
      layout
      variants={loadingFade}
      initial="hidden"
      animate="visible"
      exit="hidden">
      <MotionSearch
        key="post_search"
        layout="position"
        sortOptions={getSortOptions()}
        searchOptions={getSearchOptions()}
        defaultSort={sort}
        defaultOrder={order}
        defaultSearch={searchQuery}
        setOrder={setOrder}
        setSort={setSort}
        onSearch={setSearchQuery}
      />
      <AnimatePresence mode="wait">
        {posts.length > 0 ? (
          getPostPreviews()
        ) : (
          <MotionEmpty
            layout="position"
            layoutId="comment_list"
            key="empty"
            transition={basicTransition}
            variants={basicFade}
            initial="hidden"
            animate="visible"
            exit="hidden"
          />
        )}
      </AnimatePresence>
      {pageCount > 1 && (
        <MotionPagination
          key="post_pagination"
          layout="position"
          transition={basicTransition}
          page={page - 1}
          pageCount={pageCount}
          pageRangeDisplayed={PAGE_SIZE}
          onPageChange={setPage}
        />
      )}
      <AnimatePresence>
        {isMyPosts && isEditorVisible && (
          <MotionEditor
            onSave={(title, content) => onPostSave(content, title)}
            onCancel={() => setEditorVisible(false)}
            onTitleEdit={resetCreate}
            onContentEdit={resetCreate}
            initialTitle=""
            initialContent=""
            useTitle={true}
            loading={isSaveLoading}
            loadingLabel="Saving"
            isError={isCreateError}
            key="post_editor"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto', transition: { duration: 0.25 } }}
            exit={{ opacity: 0, height: 0, transition: { duration: 0.25 } }}
            style={{ overflow: 'hidden' }}
          />
        )}
      </AnimatePresence>
      {isMyPosts && (
        <ButtonWrapper>
          {!isEditorVisible && <button onClick={() => setEditorVisible(true)}>Create post</button>}
        </ButtonWrapper>
      )}
    </motion.div>
  );
};

const ButtonWrapper = styled.div.attrs({
  className: 'flex-column',
})`
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
`;

export default PostList;
