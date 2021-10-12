import React from "react";
import styled from "styled-components";

const Avatar = ({ size, url }) => {
  return (
    <Wrapper>
      <img className={`${size ? size : ""}`} src={url} loading="lazy" />
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
    object-fit: cover;
  }
  .small {
    height: 1.75rem;
    width: 1.75rem;
  }
  .large {
    height: 6rem;
    width: 6rem;
  }
`;

export default Avatar;
