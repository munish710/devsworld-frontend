import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import styled from "styled-components";
import { getUserPosts } from "../../app/features/profileSlice";
import { Posts } from "../../components";
import UserDetails from "./components/UserDetails";
import Loader from "react-loader-spinner";

const Profile = () => {
  const { userPosts, userPostsStatus } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const { userID } = useParams();
  const { _id: loggedInUserID } = useSelector((state) => state.authentication);

  useEffect(() => {
    (async () => {
      await dispatch(getUserPosts(userID));
    })();
  }, [userID, dispatch]);

  return (
    <main className="section page-100">
      <Wrapper className="section-center test">
        <UserDetails />
        {userPostsStatus === "loading" && (
          <Loader
            type="Oval"
            color="#6366f1"
            height="4rem"
            width="4rem"
            className="loader"
          />
        )}
        {userPostsStatus === "success" && (
          <>
            <h4>{userID === loggedInUserID ? "Your Posts" : "User's Posts"}</h4>
            {userPosts.length > 0 ? (
              <Posts posts={userPosts} />
            ) : (
              <p>
                {userID === loggedInUserID
                  ? "You don't have any posts, create a post!"
                  : "User hasn't posted anything :("}
              </p>
            )}
          </>
        )}
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.div`
  max-width: var(--fixed-width);
  h4 {
    letter-spacing: normal;
    color: var(--clr-grey-3);
    font-weight: 500;
  }
  .loader {
    margin: 4rem auto;
    margin-left: 40%;
  }
`;

export default Profile;
