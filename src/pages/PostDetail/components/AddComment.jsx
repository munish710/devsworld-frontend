import React, { useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import Loader from "react-loader-spinner";
import { useSelector, useDispatch } from "react-redux";

import { Avatar } from "../../../components";
import { addComment, updatePostInSlice } from "../../../app/features/postSlice";
import { updatePostInFeed } from "../../../app/features/feedSlice";

const AddComment = ({ postID, post }) => {
  const {
    _id: loggedInUserID,
    name,
    username,
    avatarUrl,
  } = useSelector((state) => state.authentication);
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const clonedPost = JSON.parse(JSON.stringify(post));
    setIsLoading(true);
    let commentObj = {
      text: comment,
      postedBy: {
        _id: loggedInUserID,
        name,
        username,
        avatarUrl,
      },
    };

    clonedPost.comments.push(commentObj);

    try {
      const commentData = {
        postID,
        comment,
      };
      await dispatch(addComment(commentData));
      //update in feed slice userProfile
      dispatch(updatePostInSlice(clonedPost));
      dispatch(updatePostInFeed(clonedPost));
      setIsLoading(false);
      setComment("");
    } catch (error) {
      toast.error("Unable to add comment");
      setIsLoading(false);
    }
  };

  return (
    <CommentForm>
      <form onSubmit={handleSubmit}>
        <Avatar size="small" url={avatarUrl} />
        <input
          type="text"
          name="comment"
          id="comment"
          required
          autoComplete="off"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button className="btn">
          {isLoading ? (
            <Loader type="Oval" color="#fff" height={14} width={14} />
          ) : (
            "Add"
          )}
        </button>
      </form>
    </CommentForm>
  );
};

const CommentForm = styled.div`
  max-width: 35rem;
  padding: 0.5rem;
  background: var(--clr-white);
  border-radius: var(--radius);
  border: 1px solid var(--clr-primary-8);
  border-top: none;

  form {
    display: grid;
    grid-template-columns: 2rem 1fr auto;
    column-gap: 0.5rem;
  }
  input {
    width: 100%;
    padding: 0.5rem;
    background: var(--clr-primary-10);
    font-size: 1rem;
    border-radius: var(--radius);
    color: var(--clr-grey-3);
    border: transparent;
    outline: none;
  }
  button {
    padding: 0.125rem 0.5rem;
  }
`;

export default AddComment;
