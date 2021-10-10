import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BsSearch } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import ResultsDialog from "./ResultsDialog";
import { useLocation } from "react-router";
import axios from "axios";

const SearchBar = () => {
  const [showResultsDialog, setShowResultsDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [resultData, setResultData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { pathname } = useLocation();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`/users/search?user=${searchQuery}`);
        if (response.data.success) {
          setResultData(response.data.users);
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        console.log("Error, while searching for users", error);
      }
    })();
  }, [searchQuery]);

  useEffect(() => {
    setShowResultsDialog(false);
    setSearchQuery("");
  }, [pathname]);
  return (
    <SearchInput>
      <div className="input-container">
        <input
          type="text"
          placeholder="Search User"
          onClick={() => setShowResultsDialog(true)}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="input-icon">
          {showResultsDialog ? (
            <AiOutlineClose onClick={() => setShowResultsDialog(false)} />
          ) : (
            <BsSearch />
          )}
        </div>
      </div>
      <ResultsDialog
        showResultsDialog={showResultsDialog}
        usersData={resultData}
        isLoading={isLoading}
      />
    </SearchInput>
  );
};

const SearchInput = styled.div`
  background: var(--clr-white);
  .input-container {
    display: flex;
    align-items: center;
    font-size: 1rem;
    border-radius: var(--radius);
    border: 1px solid var(--clr-primary-8);

    input {
      outline: none;
      border: none;
      padding: 0.5rem;
      width: 85%;
    }
    .input-icon {
      cursor: pointer;
      color: var(--clr-grey-4);
      top: 0.5rem;
      left: 80%;
      &:hover {
        color: var(--clr-grey-2);
      }
    }
  }
`;

export default SearchBar;
