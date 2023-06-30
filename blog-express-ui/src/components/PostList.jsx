import { useState } from 'react';
import Editor from './Editor';
import PostPreview from './PostPreview';
import Pagination from './ui/Pagination';
import Search from './Search';
import styled from 'styled-components';
import usePostListQuery from '../hooks/usePostListQuery';
import useDefaultSearchParams from '../hooks/useDefaultSearchParams';
import useAuthContext from '../hooks/useAuthContext';
import Empty from './ui/Empty';

const NON_SEARCH_PARAMS = ['sort', 'order', 'page', 'size'];
const PAGE_SIZE = 5;

const PostList = ({ isMyPosts }) => {
  const { user } = useAuthContext();
  const { page, setPage, sort, setSort, order, setOrder, searchQuery, setSearchQuery } =
    useDefaultSearchParams(NON_SEARCH_PARAMS);
  const [isEditorVisible, setEditorVisible] = useState(false);
  const fetchParams = getFetchParams();
  const { isSuccess, posts, pageCount, createPost, isSaveLoading } = usePostListQuery(fetchParams);

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
      return posts.map((post) => <PostPreview key={`post_${post.postId}`} post={post} />);
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
    <div className="flex-column p-10">
      <Search
        sortOptions={getSortOptions()}
        searchOptions={getSearchOptions()}
        defaultSort={sort}
        defaultOrder={order}
        defaultSearch={searchQuery}
        setOrder={setOrder}
        setSort={setSort}
        onSearch={setSearchQuery}
      />
      {posts.length > 0 ? getPostPreviews() : <Empty/>}
      {pageCount > 1 && (
        <Pagination
          page={page - 1}
          pageCount={pageCount}
          pageRangeDisplayed={PAGE_SIZE}
          onPageChange={setPage}
        />
      )}
      {isMyPosts && isEditorVisible && (
        <Editor
          onSave={(title, content) => onPostSave(content, title)}
          onCancel={() => setEditorVisible(false)}
          initialTitle=""
          initialContent=""
          useTitle={true}
          loading={isSaveLoading}
          loadingLabel="Saving"
        />
      )}
      {isMyPosts && (
        <ButtonWrapper>
          {!isEditorVisible && <button onClick={() => setEditorVisible(true)}>Create post</button>}
        </ButtonWrapper>
      )}
    </div>
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
