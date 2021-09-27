import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import Avatar from "../Avatar/Avatar";

const UserCard = ({ user }) => {
  const { _id: userID, avatarUrl, name, username } = user;
  return (
    <Wrapper>
      <Avatar url={avatarUrl} />
      <div className="user-info">
        <Link to={`/profile/${userID}`}>{name}</Link>
        <h6>@{username}</h6>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  background: var(--clr-white);
  border: 1px solid var(--clr-primary-8);
  margin: 0.5rem 0;
  border-radius: var(--radius);
  display: flex;
  align-items: center;
  padding: 1rem;
  gap: 1rem;
  h6 {
    font-weight: 400;
    margin-top: -0.35rem;
  }
  .user-info > a {
    color: var(--clr-primary-5);
    font-weight: 500;
  }
`;

export default UserCard;
