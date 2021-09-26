import React from "react";
import styled from "styled-components";
import GeneralFeed from "./components/GeneralFeed";
import UserSuggestions from "./components/UserSuggestions";
import { mockUsers } from "../../utils/mockUsers";

const Home = () => {
  return (
    <main className="section page-100">
      <Wrapper>
        <div className="section-center home">
          <div className="feed">
            <GeneralFeed />
          </div>
          <UserSuggestions users={mockUsers} />
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
