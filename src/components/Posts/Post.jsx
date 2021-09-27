import React from "react";
import styled from "styled-components";

import { BsHeart, BsHeartFill } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";

import Avatar from "../Avatar/Avatar";

const Post = ({ post }) => {
  const {
    _id: postID,
    title,
    body,
    likes,
    postedBy,
    comments,
    createdAt,
  } = post;
  return (
    <PostCard>
      <div className="header">
        <div className="user">
          <Avatar url={postedBy.avatarUrl} />
          <div className="user-info">
            <p>{postedBy.name}</p>
            <h6>@{postedBy.username}</h6>
          </div>
        </div>
        <div className="icon-red">
          <FiTrash2 />
        </div>
      </div>
      <hr />
      <div className="content">
        <h5>{title}</h5>
        {post?.imageUrl && (
          <img src={post.imageUrl} alt={title} loading="lazy" />
        )}
        <p>{body}</p>
      </div>
      <hr />
      <div className="footer">
        <div className="icon-red">
          <BsHeartFill />
        </div>
        <div className="icon-primary">
          <FaRegComment />
        </div>
      </div>
    </PostCard>
  );
};

const PostCard = styled.article`
  margin: 1.5rem auto;
  max-width: 35rem;
  padding: 0.5rem;
  background: var(--clr-white);
  border-radius: var(--radius);
  border: 1px solid var(--clr-primary-8);
  p {
    margin-bottom: 0;
  }
  h5 {
    font-weight: 500;
    color: var(--clr-grey-3);
    letter-spacing: normal;
  }
  h6 {
    font-weight: 400;
    margin-top: -0.35rem;
  }
  .header {
    padding-bottom: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .user {
      display: flex;
      align-items: flex-start;
      gap: 0.25rem;
    }
    .user-info > p {
      color: var(--clr-primary-5);
      font-weight: 500;
    }
  }
  .content {
    padding: 1rem 0;

    img {
      max-height: 30rem;
      width: 100%;
    }
  }
  .footer {
    padding-top: 0.5rem;
    display: flex;
    gap: 1rem;
    align-items: center;
  }

  .icon-red {
    color: var(--clr-red-light);
    font-size: 1.5rem;
    cursor: pointer;
  }
  .icon-primary {
    color: var(--clr-primary-5);
    font-size: 1.5rem;
    cursor: pointer;
  }
`;
export default Post;
