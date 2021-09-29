import React from "react";
import styled from "styled-components";
import { Posts } from "../../components";
import UserDetails from "./components/UserDetails";
import { posts } from "../../utils/mockPosts";
import { userData } from "../../utils/userData";
import EditProfile from "./components/EditProfile";

const Profile = () => {
  return (
    <main className="section page-100">
      <Wrapper className="section-center test">
        <UserDetails user={userData} />
        <Posts posts={posts} />
      </Wrapper>
      <EditProfile />
    </main>
  );
};

const Wrapper = styled.div`
  max-width: var(--fixed-width);

  /* border: 1px solid red; */
`;

export default Profile;
