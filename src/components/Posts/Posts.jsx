import React from "react";
import styled from "styled-components";

import Post from "./Post";

const Posts = ({ posts }) => {
  return (
    <PostsContainer>
      {posts.map((post) => {
        return <Post key={post._id} post={post} />;
      })}
    </PostsContainer>
  );
};

const PostsContainer = styled.div`
  margin-top: 1rem;
  display: grid;
  row-gap: 1.5rem;
`;

export default Posts;
