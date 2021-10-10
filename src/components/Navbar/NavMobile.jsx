import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AiOutlineHome, AiOutlinePlusCircle } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Avatar } from "..";

const NavMobile = ({ setShowCreatePost }) => {
  const { _id: loggedInUserID, avatarUrl } = useSelector(
    (state) => state.authentication
  );
  return (
    <Wrapper>
      <Link to="/" className="nav-icon">
        <AiOutlineHome />
      </Link>
      <button className="nav-icon" onClick={() => setShowCreatePost(true)}>
        <AiOutlinePlusCircle />
      </button>
      <Link to={`/profile/${loggedInUserID}`} className="nav-icon">
        <Avatar url={avatarUrl} size="small" />
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: var(--clr-white);
  height: 3.5rem;
  width: 100%;
  border-top: 1px solid var(--clr-primary-8);
  border-top-right-radius: var(--radius);
  border-top-left-radius: var(--radius);
  padding: 0.5rem;
  display: flex;
  position: fixed;
  bottom: 0;
  z-index: 4;
  justify-content: space-around;
  .nav-icon {
    color: var(--clr-primary-5);
    cursor: pointer;
    font-size: 1.75rem;
    img {
      margin-top: 0.25rem;
    }
  }

  @media screen and (min-width: 768px) {
    display: none;
  }
`;

export default NavMobile;
