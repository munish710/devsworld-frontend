import React from "react";
import styled from "styled-components";
import { Post } from "../../components";

import { post } from "../../utils/mockSinglePost";
import AddComment from "./components/AddComment";
import PostComments from "./components/PostComments";

const PostDetail = () => {
  return (
    <main className="section page-100">
      <Wrapper className="section-center">
        <div className="post-container">
          <Post post={post} />
        </div>
        <PostComments comments={post.comments} />
        <AddComment />
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.section`
  background: transparent;
  max-width: var(--fixed-width);
`;

export default PostDetail;
