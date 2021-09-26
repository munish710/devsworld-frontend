import React from "react";
import styled from "styled-components";

const Avatar = ({ size = "normal", url }) => {
  return (
    <Wrapper>
      <img
        className={`${size === "small" ? "small" : ""}`}
        src={url}
        loading="lazy"
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  place-items: center;
  img {
    display: block;
    height: 2.25rem;
    width: 2.25rem;
    border-radius: 50%;
    object-fit: contain;
  }
  .img-small {
    height: 1.75rem;
    width: 1.75rem;
  }
`;

export default Avatar;
