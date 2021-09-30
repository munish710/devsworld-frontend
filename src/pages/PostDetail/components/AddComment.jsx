import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import { Avatar } from "../../../components";

const AddComment = () => {
  const { avatarUrl } = useSelector((state) => state.authentication);

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <CommentForm>
      <form onSubmit={handleSubmit}>
        <Avatar size="small" url={avatarUrl} />
        <input type="text" name="comment" id="comment" required />
        <button className="btn">Add</button>
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
