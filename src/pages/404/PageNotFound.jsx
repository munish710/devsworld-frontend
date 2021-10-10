import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import error_404 from "../../assets/error_404.svg";

const PageNotFound = () => {
  return (
    <main className="page-100">
      <Wrapper className="section error">
        <div className="section-center error-center">
          <div className="error-image-container">
            <img src={error_404} alt="questions" className="error-image" />
          </div>
          <div className="error-info">
            <h3>Page not Found</h3>
            <p>Sorry, the page you are looking for is not available.</p>

            <Link to="/" className="btn">
              Go Back
            </Link>
          </div>
        </div>
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.section`
  .error {
    padding-bottom: 0;
  }

  .error-text {
    color: var(--clr-primary-4);
  }

  .error-image-container {
    width: 100%;
    height: 100%;
  }

  .error-info {
    padding: 1rem;
    font-size: 1.2rem;
  }

  .error-image {
    height: 100%;
    width: 100%;
  }

  @media screen and (min-width: 800px) {
    .error-center {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .error-image-container {
      width: 50%;
      height: 100%;
    }

    .error-info {
      width: 50%;
      height: 100%;
    }
  }
`;

export default PageNotFound;
