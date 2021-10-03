import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Loader from "react-loader-spinner";

import { Posts } from "../../../components";

const GeneralFeed = () => {
  const { generalFeed, generalFeedStatus } = useSelector((state) => state.feed);
  return (
    <Wrapper>
      {generalFeed.length > 0 ? (
        <>
          {" "}
          <h4>General Feed</h4>
          <div className="general-feed">
            {generalFeedStatus === "loading" ? (
              <Loader
                type="Oval"
                color="#6366f1"
                height="4rem"
                width="4rem"
                className="loader"
              />
            ) : (
              <Posts posts={generalFeed} />
            )}
          </div>
        </>
      ) : null}
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
    margin-left: 30%;
  }
`;

export default GeneralFeed;
