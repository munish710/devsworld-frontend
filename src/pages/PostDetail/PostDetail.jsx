import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";

import AddComment from "./components/AddComment";
import PostComments from "./components/PostComments";
import { getPost } from "../../app/features/postSlice";
import { Post } from "../../components";

const PostDetail = () => {
  const { post, fetchPostStatus } = useSelector((state) => state.post);
  const { postID } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (post._id !== postID) {
        await dispatch(getPost(postID));
      }
    })();
  }, [dispatch, postID, post]);

  return (
    <main className="section page-100">
      <Wrapper className="section-center">
        {fetchPostStatus === "loading" && (
          <Loader
            type="Oval"
            color="#6366f1"
            height="4rem"
            width="4rem"
            className="loader"
          />
        )}
        {fetchPostStatus === "success" && (
          <>
            {post._id === postID && (
              <div className="post-container">
                <Post post={post} />
                <PostComments post={post} postID={postID} />
                <AddComment post={post} postID={postID} />
              </div>
            )}
          </>
        )}
        {fetchPostStatus === "deleted" && (
          <div className="no-post">
            <h4 className="title">This post has been deleted</h4>
            <Link to="/" className="btn">
              Back Home
            </Link>
          </div>
        )}
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.section`
  background: transparent;
  max-width: var(--fixed-width);
  h4 {
    font-weight: 500;
    text-transform: none;
    letter-spacing: normal;
    color: var(--clr-grey-3);
  }
  a {
    margin: 1rem auto;
  }
  .no-post {
    margin-top: 5rem;
    display: grid;
    place-items: center;
  }
  .loader {
    margin: 2rem auto;
    margin-left: 40%;
  }
`;

export default PostDetail;
