import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

import { BiNetworkChart } from "react-icons/bi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "react-loader-spinner";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";

import { login } from "../../app/features/authenticationSlice";

const initialData = {
  email: "",
  password: "",
};

const Login = () => {
  const [loginData, setLoginData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingGuest, setIsLoadingGuest] = useState(false);

  const authDispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    loginUser(loginData);
  };

  const handleInputChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const loginAsGuest = () => {
    setLoginData({ email: "", password: "" });
    const guestData = {
      email: "test@gmail.com",
      password: "test123",
    };
    setIsLoadingGuest(true);
    loginUser(guestData);
  };

  const loginUser = async (loginReqData) => {
    try {
      const response = await axios.post("/auth/login", loginReqData);

      if (response.data.success) {
        setIsLoading(false);
        setIsLoadingGuest(false);
        authDispatch(login(response.data.user));
        toast.success(response.data.message);
        history.push("/");
      } else {
        setIsLoading(false);
        setIsLoadingGuest(false);
        toast.error(`Login Failed : ${response.data.message}`);
      }
    } catch (error) {
      setIsLoading(false);
      setIsLoadingGuest(false);
      if (error.response) {
        toast.error(`Login failed : ${error.response?.data?.message}`);
      } else {
        toast.error("Login failed");
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
        <div className="login-form">
          <h2>Login</h2>
          <p>Login to access all the features of the app!</p>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="abc@gmail.com"
              value={loginData.email}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your Password"
              value={loginData.password}
              onChange={handleInputChange}
              required
            />
            <button className="btn" type="submit">
              {isLoading ? (
                <Loader type="Oval" color="#fff" height={14} width={14} />
              ) : (
                "Login"
              )}
            </button>
            <div className="title">OR</div>
          </form>
          <button className="btn-secondary" onClick={loginAsGuest}>
            {isLoadingGuest ? (
              <Loader type="Oval" color="#fff" height={14} width={14} />
            ) : (
              "Login as Guest"
            )}
          </button>
          <p className="footer-info">
            Don't have an account? <Link to="/signup">Signup</Link>
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
    @media screen and (min-width: 768px) {
      padding: 1rem;
      display: block;
      align-items: center;

      h2 {
        color: var(--clr-primary-5);
        margin-bottom: 1rem;
      }
      min-width: 50%;
    }
  }
  .login-form {
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
        color: var(--clr-primary-4);
        text-decoration: underline;
        &:hover {
          color: var(--clr-primary-6);
        }
      }
    }
  }
`;

export default Login;
