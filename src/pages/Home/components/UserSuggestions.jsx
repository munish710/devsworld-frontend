import React from "react";
import styled from "styled-components";

const UserSuggestions = () => {
  return (
    <Wrapper>
      <div className="test-sticky">CONTENT</div>
    </Wrapper>
  );
};

const Wrapper = styled.aside`
  display: none;
  border: 1px solid red;
  @media screen and (min-width: 767px) {
    display: block;
    padding: 1.5rem 0;
  }
  .test-sticky {
    height: 40vh;
    width: 100%;
    border: 1px solid green;
    position: sticky;
    top: 5rem;
  }
`;

export default UserSuggestions;
