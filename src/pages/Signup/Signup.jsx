import React, { useState } from "react";
import styled from "styled-components";
import { BiNetworkChart } from "react-icons/bi";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "react-loader-spinner";

const initialData = {
  name: "",
  username: "",
  email: "",
  password: "",
};

const Signup = () => {
  const [signupData, setSignupData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  const handleInputChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signupUser();
  };

  const signupUser = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/register",
        signupData
      );
      console.log(response.data);
      if (response.data.success) {
        setIsLoading(false);
        toast.success("User Signup Successfully");
        history.push("/login");
      } else {
        setIsLoading(false);
        toast.error(`Signup Failed : ${response.data.message} `);
      }
    } catch (error) {
      setIsLoading(false);
      if (error.response) {
        toast.error(`Signup failed : ${error.response?.data?.message}`);
      } else {
        toast.error("Signup failed");
      }
    }
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
              placeholder="Enter your name"
              value={signupData.name}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter unique username"
              value={signupData.username}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="abc@gmail.com"
              value={signupData.email}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your Password"
              value={signupData.password}
              onChange={handleInputChange}
              required
            />
            <button className="btn" type="submit">
              {isLoading ? (
                <Loader type="Oval" color="#3730a3" height={16} width={16} />
              ) : (
                "Signup"
              )}
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
