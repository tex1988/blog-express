import { useSearchParams } from 'react-router-dom';

export default function usePostAdditionalParams() {
  const [searchParams] = useSearchParams();
  const { showComments, showCommentsSearch } = getAdditionalParams();

  function getAdditionalParams() {
    const params = Object.fromEntries(searchParams);
    const { comments, search } = params;
    const defaultParams = {};
    Object.assign(
      defaultParams,
      comments === 'true' || comments === 'false'
        ? { showComments: JSON.parse(comments.toLocaleLowerCase()) }
        : { showComments: false },
      search === 'true' || search === 'false'
        ? { showCommentsSearch: JSON.parse(search.toLocaleLowerCase()) }
        : { showCommentsSearch: false },
    );
    return defaultParams;
  }

  return { showComments, showCommentsSearch };
}