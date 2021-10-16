import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaRegComment, FaRegHeart, FaHeart } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";
import { formatDistanceToNow } from "date-fns";

import Avatar from "../Avatar/Avatar";
import {
  deletePost,
  toggleLike,
  updatePostInSlice,
} from "../../app/features/postSlice";
import {
  removePostFromFeed,
  updatePostInFeed,
} from "../../app/features/feedSlice";
import { toast } from "react-toastify";
import {
  removePostFromProfile,
  updatePostInProfile,
} from "../../app/features/profileSlice";

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

  const { _id: loggedInUserId } = useSelector((state) => state.authentication);
  const [isLiked, setisLiked] = useState(likes.includes(loggedInUserId));
  const dispatch = useDispatch();

  const handleLike = async () => {
    const clonedPost = JSON.parse(JSON.stringify(post));
    if (isLiked) {
      const updatedLikes = likes.filter((userID) => userID !== loggedInUserId);
      clonedPost.likes = updatedLikes;
      setisLiked(false);
    } else {
      clonedPost.likes.push(loggedInUserId);
      setisLiked(true);
    }

    // dispatch(updatePostInSlice(clonedPost));
    dispatch(updatePostInFeed(clonedPost));
    dispatch(updatePostInProfile(clonedPost));

    try {
      const isLikedInfo = await dispatch(toggleLike(postID));
      setisLiked(isLikedInfo.payload);
    } catch (error) {
      toast.error("Failed like operation");
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (confirmDelete) {
      dispatch(removePostFromFeed(postID));
      dispatch(removePostFromProfile(postID));
      try {
        await dispatch(deletePost(postID));
        toast.success("Post Deleted Successfully!");
      } catch (error) {
        toast.error("Failed to delete post");
      }
    }
  };

  return (
    <PostCard>
      <div className="header">
        <div className="user">
          <Avatar url={postedBy.avatarUrl} />
          <div className="user-info">
            <Link to={`/profile/${postedBy._id}`}>{postedBy.name}</Link>
            <h6>@{postedBy.username}</h6>
          </div>
        </div>
        {postedBy._id === loggedInUserId && (
          <div className="icon icon-red" onClick={handleDelete}>
            <FiTrash2 />
          </div>
        )}
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
        <div className="like-comment-container">
          <div className="icon icon-red" onClick={handleLike}>
            {isLiked ? <FaHeart /> : <FaRegHeart />}
            {likes.length}
          </div>
          <Link className="icon icon-primary" to={`/posts/${postID}`}>
            <FaRegComment />
            {comments.length}
          </Link>
        </div>
        <div className="time-container">
          {createdAt && formatDistanceToNow(new Date(createdAt)) + " ago"}
        </div>
      </div>
    </PostCard>
  );
};

const PostCard = styled.article`
  max-width: 35rem;
  padding: 0.5rem;
  background: var(--clr-white);
  border-radius: var(--radius);
  border: 1px solid var(--clr-primary-8);
  p {
    margin-bottom: 0;
    white-space: pre-wrap;
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

  a {
    color: var(--clr-primary-5);
    &:hover {
      color: var(--clr-primary-6);
    }
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
    .user-info > a {
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
    justify-content: space-between;
    align-items: center;
  }
  .like-comment-container {
    display: flex;
    gap: 1rem;
    align-items: center;
  }
  .time-container {
    font-size: 0.875rem;
    color: var(--clr-grey-4);
  }

  .icon {
    display: flex;
    font-weight: 500;
    svg {
      font-size: 1.5rem;
      cursor: pointer;
      margin-right: 0.5rem;
    }
  }
  .icon-red {
    color: var(--clr-red-light);
  }
`;
export default Post;
