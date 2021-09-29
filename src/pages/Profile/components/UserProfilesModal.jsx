import React from "react";
import styled from "styled-components";
import { CgClose } from "react-icons/cg";

import { UserCard } from "../../../components";

const OtherUsers = ({ showModal, usersData, title, setShowModal }) => {
  return (
    <ModalOverlay className={`${showModal ? "show-modal" : "hide-modal"}`}>
      <article className="followers-card">
        <div className="header">
          <h4 className="title">{title}</h4>
          <button className="close" onClick={() => setShowModal(false)}>
            <CgClose />
          </button>
        </div>
        <hr />
        <div className="users-container">
          {usersData.length > 0 ? (
            usersData.map((user) => {
              return <UserCard user={user} key={user._id} />;
            })
          ) : (
            <h5>No users found</h5>
          )}
        </div>
      </article>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: grid;
  place-items: center;

  .followers-card {
    width: 80vw;
    max-width: var(--fixed-width);

    background: var(--clr-white);
    border: 1px solid var(--clr-primary-8);
    border-radius: var(--radius);
    padding: 1.5rem;
    padding-top: 0.5rem;
  }
  hr {
    margin-bottom: 1rem;
  }
  .header {
    display: grid;
    grid-template-columns: 5fr 1fr;
    gap: 0.5rem;
  }
  .close {
    background: transparent;
    border: none;
    font-size: 1.75rem;
    cursor: pointer;
    color: var(--clr-red-dark);
    &:hover {
      color: var(--clr-red-light);
    }
  }
  .users-container {
    padding: 0.5rem;
    height: 400px;
    max-height: 70vh;
    overflow-y: scroll;
  }
`;

export default OtherUsers;
