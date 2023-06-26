import { SearchWrapper } from '../Search';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const SearchSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#444" highlightColor="#202020">
      <SearchWrapper>
        <div className="flex-row-left">
          <div className="flex-row-left">
            <span>
              <Skeleton width={52} style={{ marginRight: '7px' }} />
            </span>
            <Skeleton width={93} style={{ marginRight: '7px' }} />
          </div>
          <div className="flex-row-left">
            <span>
              <Skeleton width={45} style={{ marginRight: '7px' }} />
            </span>
            <div className="flex-row-left">
              <Skeleton width={60} />
            </div>
          </div>
        </div>
        <div className="flex-row-left">
          <div className="flex-row-left">
            <span>
              <Skeleton width={74} style={{ marginRight: '7px' }} />
            </span>
            <Skeleton width={58} style={{ marginRight: '7px' }} />
          </div>
          <Skeleton width={255} height={29} />
        </div>
      </SearchWrapper>
    </SkeletonTheme>
  );
};

export default SearchSkeleton;
