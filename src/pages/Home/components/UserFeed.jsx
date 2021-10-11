import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Posts } from "../../../components";
import { getUserFeed } from "../../../app/features/feedSlice";
import Loader from "react-loader-spinner";
import styled from "styled-components";

const UserFeed = () => {
  const authState = useSelector((state) => state.authentication);
  const { userFeed, userFeedStatus } = useSelector((state) => state.feed);
  const dispatch = useDispatch();
  useEffect(() => {
    (async function () {
      if (userFeedStatus === "idle" && authState.token) {
        await dispatch(getUserFeed());
      }
    })();
  }, [authState.token]);
  return (
    <Wrapper>
      <h4>Your Feed</h4>
      <div className="user-feed">
        {userFeedStatus === "loading" && (
          <Loader
            type="Oval"
            color="#6366f1"
            height="4rem"
            width="4rem"
            className="loader"
          />
        )}

        {userFeedStatus === "success" && (
          <div>
            {userFeed.length > 0 ? (
              <Posts posts={userFeed} />
            ) : (
              <p>
                Your posts and posts from people you follow will appear here!
                <br />
                Check posts from other members below
              </p>
            )}
          </div>
        )}

        {userFeedStatus === "error" && (
          <p>Snap! Some Error occured. Please try again/</p>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 2rem 0;
  h4 {
    letter-spacing: normal;
    color: var(--clr-grey-3);
    font-weight: 500;
  }
  .loader {
    margin: 4rem;
    margin-left: 40%;
    @media screen and (min-width: 768px) {
      margin-left: 30%;
    }
  }
`;

export default UserFeed;
