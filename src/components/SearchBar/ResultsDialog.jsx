import React from "react";
import styled from "styled-components";
import Loader from "react-loader-spinner";
import { Avatar } from "..";
import { Link } from "react-router-dom";

const ResultsDialog = ({ showResultsDialog, usersData, isLoading }) => {
  return (
    <Dialog className={`${showResultsDialog ? "show-modal" : "hide-modal"}`}>
      {isLoading ? (
        <Loader type="Oval" color="#48647f" height="2rem" width="2rem" />
      ) : (
        <>
          {usersData.length > 0 ? (
            <ul>
              {usersData.map((user) => {
                return (
                  <li key={user._id}>
                    <article className="result-card">
                      <Avatar size="small" url={user.avatarUrl} />
                      <Link to={`/profile/${user._id}`}>{user.username}</Link>
                    </article>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>No users found</p>
          )}
        </>
      )}
    </Dialog>
  );
};

const Dialog = styled.div`
  position: absolute;
  display: grid;
  place-items: center;
  padding: 1rem;
  width: 16rem;
  top: 3.2rem;
  background: var(--clr-white);
  border-radius: var(--radius);
  border: 1px solid var(--clr-primary-8);
  height: 14rem;
  overflow-y: scroll;
  overflow-x: hidden;
  ul {
    height: 100%;
    width: 100%;
    .result-card {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      border-bottom: 1px solid var(--clr-primary-8);
      padding: 0.5rem;
      margin-bottom: 0.5rem;
    }
  }
`;

export default ResultsDialog;
