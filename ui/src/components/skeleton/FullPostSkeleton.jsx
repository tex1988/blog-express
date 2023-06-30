import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const FullPostSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#444" highlightColor="#202020">
      <div className="flex-column" style={{ padding: '10px' }}>
        <h3>
          <Skeleton width={200} />
        </h3>
        <div className="flex-row-left info">
          <span>
            <Skeleton width={270}/>
          </span>
        </div>
        <span className="content">
          <Skeleton count={5} />
        </span>
        <div className="flex-row-space-between info" style={{ textAlign: 'right' }}>
          <div>
            <span>
              <Skeleton width={85} />
            </span>
          </div>
          <div className="flex-row-left" style={{ flexBasis: 'auto' }}>
            <span>
              <Skeleton width={22} />
            </span>
            <span>
              <Skeleton width={37} style={{ marginLeft: '5px' }} />
            </span>
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default FullPostSkeleton;
