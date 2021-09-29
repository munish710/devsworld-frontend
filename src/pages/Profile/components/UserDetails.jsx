import React, { useState } from "react";
import styled from "styled-components";
import { ImCog, ImExit } from "react-icons/im";

import Avatar from "../../../components/Avatar/Avatar";
import EditProfile from "./EditProfile";

import Followers from "./UserProfilesModal";
import Following from "./UserProfilesModal";

const UserDetails = ({ user }) => {
  const { name, username, followers, following, link, bio, avatarUrl } = user;
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);

  return (
    <div>
      <Wrapper>
        <div className="user-image">
          <Avatar size="large" url={avatarUrl} />
        </div>
        <div className="user-details">
          <div className="main-info">
            <h4>@{username}</h4>
            <div className="btn-container">
              <button className="btn">
                <ImCog />
                Edit
              </button>
              <button className="btn">
                <ImExit /> Logout
              </button>
            </div>
          </div>
          <div className="profile-info">
            <button onClick={() => setShowFollowers(true)}>
              <p>{followers.length} followers</p>
            </button>
            <button onClick={() => setShowFollowing(true)}>
              <p>{following.length} following</p>
            </button>
          </div>
          <div className="user-info">
            <h5>{name}</h5>
            <p>{bio}</p>
            <a href={link} target="_blank">
              {link}
            </a>
          </div>
        </div>
      </Wrapper>
      <EditProfile />

      {followers && (
        <Followers
          showModal={showFollowers}
          usersData={followers}
          setShowModal={setShowFollowers}
          title="followers"
        />
      )}

      {following && (
        <Following
          showModal={showFollowing}
          usersData={following}
          setShowModal={setShowFollowing}
          title="following"
        />
      )}
    </div>
  );
};

const Wrapper = styled.article`
  /* background: var(--clr-white); */
  background: transparent;
  border-bottom: 1px solid var(--clr-primary-8);
  padding: 1rem;
  .user-image {
    margin-bottom: 1rem;
  }
  .user-details {
    display: grid;
    place-items: center;
  }
  @media screen and (min-width: 768px) {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    .user-image {
      margin-bottom: 0;
    }
    .user-details {
      display: block;
    }
  }
  h4 {
    font-weight: 400;
    text-transform: lowercase;
    letter-spacing: normal;
    margin-bottom: 0;
  }
  h5 {
    font-weight: 500;
    /* text-transform: lowercase; */
    letter-spacing: normal;
    margin-bottom: 0.5rem;
  }

  p {
    margin-bottom: 0rem;
  }

  .user-details {
    min-width: 70%;
  }

  .main-info {
    display: flex;
    align-items: center;
    gap: 2rem;
    margin-bottom: 1rem;
    /* justify-content: space-between; */
    .btn-container {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    button {
      box-shadow: none;
      letter-spacing: normal;
      padding: 0.4rem 1rem;
      svg {
        vertical-align: middle;
        margin-right: 0.35rem;
      }
    }
  }

  .profile-info {
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 0.75rem;
    button {
      background: transparent;
      border: none;
      cursor: pointer;
      font-size: 1.05rem;
      font-weight: 500;
      color: var(--clr-grey-3);
    }
  }

  .profile-info > button :hover {
    color: var(--clr-primary-5);
    /* text-decoration: underline; */
  }

  .user-info {
    margin-bottom: 0.5rem;
  }
  a {
    color: var(--clr-primary-4);
    text-decoration: underline;
  }
  a:hover {
    color: var(--clr-primary-6);
  }
`;
export default UserDetails;
