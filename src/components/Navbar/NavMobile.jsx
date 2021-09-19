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
  padding: 0.5rem;
  display: flex;
  position: absolute;
  bottom: 0;
  z-index: 4;
  justify-content: space-around;
  .nav-icon {
    color: var(--clr-primary-5);
    font-size: 1.75rem;
  }

  @media screen and (min-width: 767px) {
    display: none;
  }
`;

export default NavMobile;
