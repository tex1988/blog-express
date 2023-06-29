import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const CommentSkeleton = ({ count }) => {
  const skeleton = (index) => (
    <SkeletonTheme key={`commentSkeleton_${index}`} baseColor="#444" highlightColor="#202020">
      <div className="flex-column">
        <div className="info">
          <span>
            <Skeleton width={220} />
          </span>
        </div>
        <span className="content">
          <Skeleton width={'70%'} />
        </span>
      </div>
    </SkeletonTheme>
  );

  function getSkeletons() {
    let skeletons;
    if (!count || count < 1) {
      skeletons = skeleton(1);
    } else {
      skeletons = [...Array(count)].map((_, index) => skeleton(index));
    }
    return skeletons;
  }

  return getSkeletons();
};

export default CommentSkeleton;
