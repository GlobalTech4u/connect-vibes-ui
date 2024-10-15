import * as React from "react";

import PostCard from "components/postCard/PostCard";

import "./PostsContainer.css";

const PostsContainer = (props) => {
  const { posts, userId, getPosts } = props;

  return (
    <div className="posts-container">
      {posts?.map((post) => {
        return (
          <PostCard
            post={post}
            userId={userId}
            getPosts={getPosts}
            key={`post-container-${post?._id}`}
          />
        );
      })}
    </div>
  );
};

export default PostsContainer;
