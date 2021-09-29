import React, { useRef } from "react";
import Avatar from "../../../components/Avatar/Avatar";
import styled from "styled-components";
import { CgClose, CgLogOut } from "react-icons/cg";
//avatarUrl name link bio
const EditProfile = () => {
  const hiddenFileInput = useRef(null);

  //image upload
  const handleChange = (e) => {
    console.log("file uploaded", e.target);

    console.log(e.target.files);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <ModalOverlay className="show-modal">
      <article className="edit-profile">
        <div className="header">
          <button className="close">
            <CgClose />
          </button>
        </div>
        <hr />
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="avatar">Avatar</label>
            <div className="avatar-container">
              <Avatar
                url="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?crop=entropy&cs=srgb&fm=jpg&ixid=MnwyNDY0NjR8MHwxfHNlYXJjaHwxfHx1c2VyfGVufDB8fHx8MTYzMjY1OTI5Mw&ixlib=rb-1.2.1&q=85"
                size="large"
              />

              <button
                className="btn-secondary upload-button"
                onClick={() => hiddenFileInput.current.click()}
              >
                Change Image
              </button>
              <input
                type="file"
                name="avatar"
                id="avatar"
                ref={hiddenFileInput}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-control">
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" autoComplete="off" />
          </div>
          <div className="form-control">
            <label htmlFor="bio">Bio</label>
            <textarea name="bio" id="bio" rows="5"></textarea>
          </div>
          <div className="form-control">
            <label htmlFor="link">Link</label>
            <input type="text" name="link" id="link" autoComplete="off" />
          </div>
          <button type="submit" className="btn update-btn">
            Update
          </button>
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
  .avatar-container {
    display: grid;
    place-items: center;
    row-gap: 0.5rem;
    button {
      letter-spacing: normal;
      text-transform: none;
      font-weight: 500;
      box-shadow: none;
    }
    input {
      display: none;
    }
  }

  .update-btn {
    float: right;
    padding: 0.5rem 0.75rem;
  }
`;

export default EditProfile;
