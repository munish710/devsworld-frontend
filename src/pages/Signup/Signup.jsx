import React from "react";
import styled from "styled-components";
import { BiNetworkChart } from "react-icons/bi";
import { Link } from "react-router-dom";

const Signup = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <main className="page-100">
      <Wrapper className="section-center">
        <div className="banner">
          <h2>
            <BiNetworkChart /> DevsWorld
          </h2>
          <p>Connect with like minded programmers throughout the world</p>
          <ul>
            <li>Be a part of the growing community.</li>
            <li>Share your thoughts, photos, tips.</li>
            <li>Comment on other's posts</li>
            <li>Follow people you like</li>
          </ul>
        </div>
        <div className="signup-form">
          <h2>Signup</h2>
          <p>Signup by filling the below form to access all the features</p>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter you name"
              required
            />
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter unique username"
              required
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="abc@gmail.com"
              required
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your Password"
              required
            />
            <button className="btn" type="submit">
              Signup
            </button>
          </form>
          <p className="footer-info">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.article`
  min-height: 60vh;
  margin: 4rem auto;
  border-radius: var(--radius);
  border: 1px solid var(--clr-primary-8);
  display: flex;
  background: var(--clr-white);
  padding: 2rem;
  ul {
    list-style-type: disc;
    padding-left: 1rem;
  }
  li {
    margin-bottom: 0.75rem;
  }
  .banner {
    display: none;
    @media screen and (min-width: 767px) {
      padding: 1rem;
      display: block;
      align-items: center;

      h2 {
        color: var(--clr-primary-5);
        margin-bottom: 1rem;
      }
      width: 50%;
    }
  }
  .signup-form {
    padding: 1rem;
    min-width: 50%;

    h2 {
      color: var(--clr-primary-5);
    }

    label {
      margin-bottom: 0.5rem;
    }
    input {
      width: 100%;
      padding: 0.5rem;
      background: var(--clr-primary-10);
      font-size: 1rem;
      margin-bottom: 0.75rem;
      border-radius: var(--radius);
      border: transparent;
      outline: none;
    }
    button {
      margin: 0.5rem 0;
      font-size: 1rem;
      padding: 0.75rem;
      width: 100%;
    }
    .footer-info {
      margin-top: 1rem;
      a {
        color: var(--clr-primary-5);
        text-decoration: underline;
      }
    }
  }
`;

export default Signup;
