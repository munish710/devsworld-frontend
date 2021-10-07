import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ImCog, ImExit } from "react-icons/im";
import { FaUserMinus, FaUserPlus } from "react-icons/fa";
import Loader from "react-loader-spinner";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import { Avatar } from "../../../components";
import EditProfile from "./EditProfile";
import {
  followUser,
  getUserData,
  unfollowUser,
} from "../../../app/features/profileSlice";
import { getUserFeed } from "../../../app/features/feedSlice";

import Followers from "./UserProfilesModal";
import Following from "./UserProfilesModal";

const UserDetails = () => {
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [showEditUser, setShowEditUser] = useState(false);
  const [isUserFollowed, setIsUserFollowed] = useState(false);
  const { userID } = useParams();
  const { userData, userDataStatus, userFollowerStatus } = useSelector(
    (state) => state.profile
  );
  const { _id: loggedInUserID } = useSelector((state) => state.authentication);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      if (userData._id !== userID) {
        await dispatch(getUserData(userID));
      }
    })();
  }, [userID, dispatch, userData._id]);

  useEffect(() => {
    if (userDataStatus === "success" && userData.followers.length > 0) {
      debugger;
      userData.followers.forEach((user) => {
        if (user._id === loggedInUserID) {
          setIsUserFollowed(true);
        }
      });
    } else {
      setIsUserFollowed(false);
    }
  }, [userDataStatus, userData.followers, loggedInUserID]);

  const handleFollowUser = async () => {
    await dispatch(followUser(userData._id));
    dispatch(getUserFeed());
  };

  const handleUnfollowUser = async () => {
    await dispatch(unfollowUser(userData._id));
    dispatch(getUserFeed());
  };

  return (
    <MainWrapper>
      {(userDataStatus === "loading" || userDataStatus === "idle") && (
        <Loader
          type="Oval"
          color="#6366f1"
          height="3rem"
          width="3rem"
          className="loader"
        />
      )}
      {userDataStatus === "success" && userData._id === userID && (
        <div>
          <Wrapper>
            <div className="user-image">
              <Avatar size="large" url={userData.avatarUrl} />
            </div>
            <div className="user-details">
              <div className="main-info">
                <h4>@{userData.username}</h4>

                {userData._id === loggedInUserID ? (
                  <div className="btn-container">
                    <button
                      className="btn"
                      onClick={() => setShowEditUser(true)}
                    >
                      <ImCog />
                      Edit
                    </button>
                    <button className="btn">
                      <ImExit /> Logout
                    </button>
                  </div>
                ) : (
                  <div className="btn-container">
                    {isUserFollowed ? (
                      <button
                        className="btn follow-btn"
                        onClick={handleUnfollowUser}
                        disabled={userFollowerStatus === "loading"}
                      >
                        {userFollowerStatus === "loading" ? (
                          <Loader
                            type="Oval"
                            color="#fff"
                            height={14}
                            width={14}
                          />
                        ) : (
                          <>
                            <FaUserMinus />
                            Unfollow
                          </>
                        )}
                      </button>
                    ) : (
                      <button
                        className="btn follow-btn"
                        onClick={handleFollowUser}
                        disabled={userFollowerStatus === "loading"}
                      >
                        {userFollowerStatus === "loading" ? (
                          <Loader
                            type="Oval"
                            color="#fff"
                            height={14}
                            width={14}
                          />
                        ) : (
                          <>
                            <FaUserPlus />
                            Follow
                          </>
                        )}
                      </button>
                    )}
                  </div>
                )}
              </div>
              <div className="profile-info">
                <button onClick={() => setShowFollowers(true)}>
                  <p>{userData.followers.length} followers</p>
                </button>
                <button onClick={() => setShowFollowing(true)}>
                  <p>{userData.following.length} following</p>
                </button>
              </div>
              <div className="user-info">
                <h5>{userData.name}</h5>
                <p>{userData.bio}</p>
                <a
                  href={userData.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {userData.link}
                </a>
              </div>
            </div>
          </Wrapper>
          <EditProfile
            showEditUser={showEditUser}
            setShowEditUser={setShowEditUser}
          />

          {userData.followers && userFollowerStatus !== "loading" && (
            <Followers
              showModal={showFollowers}
              usersData={userData.followers}
              setShowModal={setShowFollowers}
              title="followers"
            />
          )}

          {userData.following && userFollowerStatus !== "loading" && (
            <Following
              showModal={showFollowing}
              usersData={userData.following}
              setShowModal={setShowFollowing}
              title="following"
            />
          )}
        </div>
      )}
    </MainWrapper>
  );
};

const MainWrapper = styled.div`
  min-height: 12rem;
  border-bottom: 1px solid var(--clr-primary-8);
  margin-bottom: 3rem;
  .loader {
    margin: 3rem 0;
    margin-left: 40%;
  }
`;

const Wrapper = styled.article`
  background: transparent;
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
    .btn-container {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    button {
      box-shadow: none;
      letter-spacing: normal;
      padding: 0.4rem 1rem;
    }
    svg {
      vertical-align: middle;
      margin-right: 0.35rem;
    }
    .follow-btn {
      padding: 0.45rem 1rem;
      width: 9rem;
      font-size: 0.9rem;
      display: flex;
      align-items: center;
      justify-content: center;
      letter-spacing: 0.1rem;
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
