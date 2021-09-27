import React from "react";
import styled from "styled-components";
import { BiNetworkChart } from "react-icons/bi";
import {
  AiOutlineHome,
  AiOutlinePlusCircle,
  AiOutlineUser,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import NavMobile from "./NavMobile";
import SearchBar from "../SearchBar/SearchBar";

const Navbar = () => {
  return (
    <>
      <NavContainer>
        <div className="nav-center section-center">
          <div className="nav-logo">
            <BiNetworkChart /> <h4>DevsWorld</h4>
          </div>
          <SearchBar />
          <div className="nav-links">
            <button className="nav-icon">
              <AiOutlinePlusCircle />
            </button>
            <Link to="/" className="nav-icon">
              <AiOutlineHome />
            </Link>
            <Link to="/profile" className="nav-icon">
              <AiOutlineUser />
            </Link>
          </div>
        </div>
      </NavContainer>
      <NavMobile />
    </>
  );
};

const NavContainer = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  height: 4rem;
  background: var(--clr-white);
  padding: 0.75rem 0rem;
  z-index: 4;
  border-bottom: 1px solid var(--clr-primary-8);
  border-bottom-right-radius: var(--radius);
  border-bottom-left-radius: var(--radius);

  .nav-center {
    display: flex;
    justify-content: space-between;
  }

  .nav-logo {
    display: flex;
    align-items: center;
    color: var(--clr-primary-5);
    svg {
      font-size: 1.75rem;
      vertical-align: middle;
      margin-right: 0.5rem;
    }
  }
  .nav-icon {
    color: var(--clr-primary-5);
    font-size: 1.75rem;
  }
  .nav-links {
    min-width: 14rem;
    justify-content: space-between;
    display: none;
    @media screen and (min-width: 768px) {
      display: flex;
    }
  }
`;

export default Navbar;
