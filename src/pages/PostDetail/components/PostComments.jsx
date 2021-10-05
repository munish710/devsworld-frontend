import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { Avatar } from "../../../components";
import { FiTrash2 } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteComment,
  updatePostInSlice,
} from "../../../app/features/postSlice";
import { updatePostInFeed } from "../../../app/features/feedSlice";

const PostComments = ({ post, postID }) => {
  const { comments } = post;
  const { _id: loggedInUserID } = useSelector((state) => state.authentication);
  const dispatch = useDispatch();

  const handleDelete = async (commentID) => {
    const confirmDeleteComment = window.confirm(
      "Do you want to delete this comment?"
    );
    if (confirmDeleteComment) {
      const clonedPost = JSON.parse(JSON.stringify(post));
      const updatedComments = clonedPost.comments.filter(
        (comment) => comment._id !== commentID
      );
      clonedPost.comments = updatedComments;

      try {
        const commentData = {
          commentID,
          postID,
        };
        await dispatch(deleteComment(commentData));
        //update in feed slice and user profile
        dispatch(updatePostInFeed(clonedPost));
        dispatch(updatePostInSlice(clonedPost));
      } catch (error) {
        toast.error("Couldn't delete comment");
      }
    }
  };
  return (
    <Wrapper>
      <h5>Comments ({comments.length})</h5>
      {comments.map((comment) => {
        return (
          <Comment key={comment._id}>
            <Avatar size="small" url={comment.postedBy.avatarUrl} />
            <div className="comment-text">
              <h6>
                <Link to={`/profile/${comment.postedBy._id}`}>
                  @{comment.postedBy.username}
                </Link>
              </h6>
              <p>{comment.text}</p>
            </div>
            {comment.postedBy._id === loggedInUserID && (
              <div
                className="delete-icon"
                onClick={() => handleDelete(comment._id)}
              >
                <FiTrash2 />
              </div>
            )}
          </Comment>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  max-width: 35rem;
  padding: 0.5rem;
  background: var(--clr-white);
  border-radius: var(--radius);
  border: 1px solid var(--clr-primary-8);
  border-top: none;
  max-height: 11rem;
  overflow-y: scroll;
  h5,
  h6 {
    font-weight: 500;
    text-transform: none;
    letter-spacing: normal;
    color: var(--clr-grey-3);
  }
`;

const Comment = styled.div`
  display: grid;
  grid-template-columns: 2rem 1fr 1rem;
  column-gap: 0.5rem;
  border-bottom: 1px solid var(--clr-primary-8);
  padding: 0.45rem 0;
  p {
    margin-bottom: 0;
  }
  a {
    color: var(--clr-primary-5);
    &:hover {
      color: var(--clr-primary-6);
    }
  }
  svg {
    vertical-align: middle;
  }
  .delete-icon {
    color: var(--clr-red-dark);
    cursor: pointer;
    &:hover {
      color: var(--clr-red-light);
    }
  }
`;

export default PostComments;
