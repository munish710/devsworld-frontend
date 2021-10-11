import React from "react";
import styled from "styled-components";
import GeneralFeed from "./components/GeneralFeed";
import UserSuggestions from "./components/UserSuggestions";
import UserFeed from "./components/UserFeed";

const Home = () => {
  return (
    <main className="section page-100">
      <Wrapper>
        <div className="section-center home">
          <div className="feed">
            <UserFeed />
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
    @media screen and (min-width: 800px) {
      grid-template-columns: 1fr 400px;
    }
  }
`;

export default Home;
