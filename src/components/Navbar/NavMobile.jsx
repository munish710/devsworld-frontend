import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  AiOutlineHome,
  AiOutlinePlusCircle,
  AiOutlineUser,
} from "react-icons/ai";

const NavMobile = () => {
  return (
    <Wrapper>
      <Link to="/" className="nav-icon">
        <AiOutlineHome />
      </Link>
      <button className="nav-icon">
        <AiOutlinePlusCircle />
      </button>
      <Link to="/profile" className="nav-icon">
        <AiOutlineUser />
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
    font-size: 1.75rem;
  }

  @media screen and (min-width: 768px) {
    display: none;
  }
`;

export default NavMobile;
