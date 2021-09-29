import React, { useRef } from "react";
import styled from "styled-components";
import { BsFillImageFill } from "react-icons/bs";
import { CgClose } from "react-icons/cg";

const CreatePost = ({ isOpen, setIsOpen }) => {
  const hiddenFileInput = useRef(null);
  const handleImageUpload = (e) => {
    console.log(e.target.files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <ModalOverlay className={`${isOpen ? "show-modal" : "hide-modal"}`}>
      <article className="edit-profile">
        <div className="header">
          <button className="close" onClick={() => setIsOpen(false)}>
            <CgClose />
          </button>
        </div>
        <hr />
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              autoComplete="off"
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="body">Caption</label>
            <textarea name="body" id="body" rows="5" required></textarea>
          </div>
          <div className="form-control">
            <div className="upload-image">
              <BsFillImageFill
                onClick={() => hiddenFileInput.current.click()}
              />
              <input
                type="file"
                name="avatar"
                id="avatar"
                ref={hiddenFileInput}
                className="hidden-input"
                onChange={handleImageUpload}
              />
            </div>

            <button type="submit" className="btn create-post">
              Create Post
            </button>
          </div>
        </form>
      </article>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: grid;
  place-items: center;

  article {
    width: 80vw;
    max-width: var(--fixed-width);
    background: var(--clr-white);
    border: 1px solid var(--clr-primary-8);
    border-radius: var(--radius);
    padding: 1.5rem;
    padding-top: 0.5rem;
  }
  input,
  textarea {
    width: 100%;
    padding: 0.5rem;
    background: var(--clr-primary-10);
    font-size: 1rem;
    border-radius: var(--radius);
    color: var(--clr-grey-2);
    border: transparent;
    outline: none;
  }

  .close {
    background: transparent;
    border: none;
    font-size: 1.75rem;
    cursor: pointer;
    float: right;
    color: var(--clr-red-dark);
    &:hover {
      color: var(--clr-red-light);
    }
  }
  hr {
    clear: both;
    margin-bottom: 1.5rem;
  }

  .form-control {
    display: grid;
    grid-template-columns: 1fr 3fr;
    gap: 1rem;
    margin-bottom: 1.75rem;
  }

  .upload-image {
    cursor: pointer;
    color: var(--clr-primary-5);
    font-size: 1.5rem;
    svg {
      font-size: 2rem;

      vertical-align: middle;
    }
  }

  .hidden-input {
    display: none;
  }

  .create-post {
    /* float: right; */
    padding: 0.5rem 0.75rem;
  }
`;

export default CreatePost;
