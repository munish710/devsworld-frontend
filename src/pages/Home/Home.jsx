import React from "react";
import styled from "styled-components";
import GeneralFeed from "./components/GeneralFeed";
import UserSuggestions from "./components/UserSuggestions";

const Home = () => {
  return (
    <main className="section page-100">
      <Wrapper>
        <div className="section-center home">
          <div className="feed test">
            <GeneralFeed />
          </div>
          <UserSuggestions />
        </div>
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.div`
  .home {
    display: grid;
    column-gap: 1rem;
    @media screen and (min-width: 767px) {
      grid-template-columns: 1fr 350px;
    }
  }

  .test {
    border: 2px solid red;
  }
`;

export default Home;
