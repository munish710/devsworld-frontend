import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import { UserCard } from "../../../components";

const UserSuggestions = ({ users }) => {
  const loggedInUser = useSelector((state) => state.authentication);
  console.log(loggedInUser);
  return (
    <Wrapper>
      <div className="users-container">
        <div className="main-user">
          <UserCard user={loggedInUser} />
        </div>
        <h5>Suggestions for you</h5>
        {users.slice(0, 5).map((user) => {
          return <UserCard user={user} key={user._id} />;
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.aside`
  display: none;

  @media screen and (min-width: 768px) {
    display: block;
  }
  h5 {
    font-weight: 500;
    color: var(--clr-grey-3);
  }
  .users-container {
    margin-top: 1.25rem;
    padding: 1rem 0.5rem;
    background: var(--clr-white);
    border: 1px solid var(--clr-primary-8);
    border-radius: var(--radius);
    width: 100%;
    position: sticky;
    top: 5rem;
  }
`;

export default UserSuggestions;
