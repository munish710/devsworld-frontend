import React, { useState, useRef } from "react";
import { Avatar } from "../../../components";
import styled from "styled-components";
import { CgClose } from "react-icons/cg";
import { toast } from "react-toastify";
import Loader from "react-loader-spinner";
import { useSelector, useDispatch } from "react-redux";

import { CLOUDINARY_PRESET, CLOUDINARY_URL } from "../../../utils/constants";
import { updateAuthState } from "../../../app/features/authenticationSlice";
import { useParams } from "react-router";
import { updateUserData } from "../../../app/features/profileSlice";
import { resetFeed } from "../../../app/features/feedSlice";

const EditProfile = ({ showEditUser, setShowEditUser }) => {
  const { avatarUrl } = useSelector((state) => state.authentication);
  const { userData } = useSelector((state) => state.profile);
  const initialFormData = {
    name: userData.name ?? "",
    bio: userData.bio ?? "",
    link: userData.link ?? "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [imageUrl, setImageUrl] = useState(avatarUrl);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const { userID } = useParams();
  const dispatch = useDispatch();

  const hiddenFileInput = useRef(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //image upload
  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", CLOUDINARY_PRESET);
    try {
      setIsImageUploading(true);
      const response = await fetch(`${CLOUDINARY_URL}/image/upload`, {
        method: "POST",
        body: data,
      });
      const res = await response.json();
      if (res) {
        setIsImageUploading(false);
        setImageUrl(res.url);
        toast.success("Image uploaded successfully");
      }
    } catch (error) {
      setIsImageUploading(false);
      toast.error("Image upload unsuccessfull");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payloadData = {
      ...formData,
      avatarUrl: imageUrl,
    };
    try {
      //handle when user doesn't update image
      dispatch(updateAuthState({ avatarUrl: imageUrl, name: formData.name }));
      await dispatch(updateUserData({ userID, payloadData }));
      dispatch(resetFeed());
      setShowEditUser(false);
      toast.success("Updated user data successfully");
    } catch (error) {
      toast.error("Couldn't update User Data");
      setShowEditUser(false);
    }
  };

  return (
    <ModalOverlay className={`${showEditUser ? "show-modal" : "hide-modal"}`}>
      <article className="edit-profile">
        <div className="header">
          <button className="close" onClick={() => setShowEditUser(false)}>
            <CgClose />
          </button>
        </div>
        <hr />
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="avatar">Avatar</label>
            <div className="avatar-container">
              <Avatar url={imageUrl} size="large" />

              {isImageUploading ? (
                <Loader
                  type="Oval"
                  color="#6366f1"
                  height="1.5rem"
                  width="1.5rem"
                />
              ) : (
                <button
                  type="button"
                  className="btn-secondary upload-button"
                  onClick={() => hiddenFileInput.current.click()}
                >
                  Change Image
                </button>
              )}
              <input
                type="file"
                ref={hiddenFileInput}
                accept="image/jpeg, image/png, image/gif, image/jpg"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          </div>
          <div className="form-control">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              autoComplete="off"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder="Enter your name"
            />
          </div>
          <div className="form-control">
            <label htmlFor="bio">Bio</label>
            <textarea
              name="bio"
              id="bio"
              rows="5"
              value={formData.bio}
              onChange={handleInputChange}
              placeholder="Some additional details about you"
            ></textarea>
          </div>
          <div className="form-control">
            <label htmlFor="link">Link</label>
            <input
              type="url"
              name="link"
              id="link"
              pattern="https://.*"
              autoComplete="off"
              value={formData.link}
              onChange={handleInputChange}
              placeholder="https://example.com"
            />
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
    font-family: inherit;
    font-size: 1rem;
    border-radius: var(--radius);
    color: var(--clr-grey-1);
    border: transparent;
    outline: none;
  }

  button {
    transition: none;
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
    .hidden {
      display: none;
    }
  }

  .update-btn {
    float: right;
    padding: 0.5rem 0.75rem;
  }
`;

export default EditProfile;
