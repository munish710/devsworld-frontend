import React from "react";
import styled from "styled-components";
import { Posts } from "../../components";
import UserDetails from "./components/UserDetails";
import { posts } from "../../utils/mockPosts";

const Profile = () => {
  return (
    <main className="section page-100">
      <Wrapper className="section-center test">
        <UserDetails />
        <Posts posts={posts} />
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.div`
  max-width: var(--fixed-width);
`;

export default Profile;
