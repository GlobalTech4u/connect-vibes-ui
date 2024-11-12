import { Skeleton } from "@mui/material";

import "./PostContainerSkeleton.css";

const PostContainerSkeleton = () => {
  return (
    <div className="post-container-skeleton">
      <div className="post-header">
        <Skeleton variant="circular" width={40} height={40} />
        <div className="name-time">
          <Skeleton variant="text" width={"100%"} sx={{ fontSize: "1rem" }} />
          <Skeleton variant="text" width={"100%"} sx={{ fontSize: "1rem" }} />
        </div>
      </div>
      <div className="post-body">
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
        <Skeleton variant="rectangular" width={"100%"} height={"240px"} />
      </div>
    </div>
  );
};

export default PostContainerSkeleton;
