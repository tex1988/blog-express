import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { forwardRef } from 'react';

const PostPreviewSkeleton = forwardRef(({ count }, ref) => {
  const skeleton = (index) => (
    <SkeletonTheme key={`postPreviewSkeleton_${index}`} baseColor="#444" highlightColor="#202020">
      <div className="flex-column">
        <h3>
          <Skeleton width={200} />
        </h3>
        <span className="info">
          <Skeleton width={300} />
        </span>
        <span className="content">
          <Skeleton style={{ maxWidth: '1423px' }} />
        </span>
        <div className="info">
          <span>
            <Skeleton width={78} />
          </span>
        </div>
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

  return <div ref={ref}>{getSkeletons()}</div>;
});

export default PostPreviewSkeleton;
