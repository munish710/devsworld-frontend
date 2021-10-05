import React, { useState, useRef } from "react";
import styled from "styled-components";
import { BsFillImageFill } from "react-icons/bs";
import { CgClose } from "react-icons/cg";
import Loader from "react-loader-spinner";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";

import { CLOUDINARY_PRESET, CLOUDINARY_URL } from "../../utils/constants";
import { createPost } from "../../app/features/postSlice";
import { addPostToFeed } from "../../app/features/feedSlice";

const initialData = {
  title: "",
  body: "",
};

const CreatePost = ({ isOpen, setIsOpen }) => {
  const [formData, setFormData] = useState(initialData);
  const [imageUrl, setImageUrl] = useState("");
  const [isImageUploading, setIsImageUploading] = useState(false);
  const hiddenFileInput = useRef(null);

  const { postStatus } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
    try {
      const postData = {
        title: formData.title,
        body: formData.body,
        imageUrl,
      };
      const createdPost = await dispatch(createPost(postData));

      //add CreatedPost to Feed and user Profile
      console.log("Created Post", createdPost);
      dispatch(addPostToFeed(createdPost.payload));
      setFormData({ ...initialData });
      setImageUrl("");
      setIsOpen(false);
      toast.success("Created Post Successfully!");
    } catch (error) {
      toast.error("Failed to create Post");
    }
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
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="body">Caption</label>
            <textarea
              name="body"
              id="body"
              rows="5"
              required
              value={formData.body}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div className="form-control">
            <div className="upload-image">
              {isImageUploading ? (
                <Loader
                  type="Oval"
                  color="#6366f1"
                  height="2rem"
                  width="2rem"
                />
              ) : (
                <BsFillImageFill
                  onClick={() => hiddenFileInput.current.click()}
                />
              )}

              <input
                type="file"
                name="avatar"
                id="avatar"
                ref={hiddenFileInput}
                className="hidden-input"
                accept="image/jpeg, image/png, image/gif, image/jpg"
                onChange={handleImageUpload}
              />
            </div>

            <button type="submit" className="btn create-post">
              {postStatus === "loading" ? (
                <Loader type="Oval" color="#fff" height={14} width={14} />
              ) : (
                "Create Post"
              )}
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
    padding: 0.5rem 0.75rem;
    transition: none;
  }
`;

export default CreatePost;
