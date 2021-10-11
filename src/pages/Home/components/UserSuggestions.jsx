import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import Loader from "react-loader-spinner";

import { UserCard } from "../../../components";
import { getUsersData } from "../../../app/features/feedSlice";

const UserSuggestions = () => {
  const loggedInUser = useSelector((state) => state.authentication);
  const { usersData, usersDataStatus } = useSelector((state) => state.feed);
  const dispatch = useDispatch();

  useEffect(() => {
    (async function () {
      if (usersDataStatus === "idle") {
        await dispatch(getUsersData());
      }
    })();
  }, [dispatch, usersDataStatus]);

  return (
    <Wrapper>
      <div className="users-container">
        <div className="main-user">
          <UserCard user={loggedInUser} />
        </div>
        <h5>Suggestions for you</h5>
        {usersDataStatus === "loading" ? (
          <Loader
            type="Oval"
            color="#6366f1"
            height="3rem"
            width="3rem"
            className="loader"
          />
        ) : (
          usersData
            .slice(0, 5)
            .filter((user) => user._id !== loggedInUser._id)
            .map((user) => {
              return <UserCard user={user} key={user._id} />;
            })
        )}
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
  .loader {
    margin: 1rem;
    margin-left: 45%;
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
