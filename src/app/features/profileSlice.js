import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//thunks

//getuserData
export const getUserData = createAsyncThunk(
  "profile/getUserData",
  async (userID) => {
    try {
      const response = await axios.get(`/users/${userID}`);
      if (response.data.success) {
        return response.data.user;
      }
      return {};
    } catch (error) {
      console.log("Error, can't get user details", error);
    }
  }
);

//updateuserData
export const updateUserData = createAsyncThunk(
  "profile/updateUserData",
  async (updateData) => {
    const { userID, payloadData } = updateData;
    try {
      const response = await axios.post(`/users/${userID}`, payloadData);
      if (response.data.success) {
        return response.data.user;
      }
      return {};
    } catch (error) {
      console.log("Error, can't get user details", error);
    }
  }
);

//getUserPosts
export const getUserPosts = createAsyncThunk(
  "profile/getUserPosts",
  async (userID) => {
    try {
      const response = await axios.get(`/users/${userID}/posts`);
      if (response.data.success) {
        return response.data.posts;
      }
      return [];
    } catch (error) {
      console.log("Error, can't get user posts", error);
    }
  }
);

//followUser

//unfollowUser

const initialProfileState = {
  userData: {},
  userPosts: [],
  userDataStatus: "idle",
  userPostsStatus: "idle",
};

const profileSlice = createSlice({
  name: "profile",
  initialState: initialProfileState,
  reducers: {
    resetProfile: (state, action) => {
      return initialProfileState;
    },

    addPostToProfile: (state, action) => {
      state.userPosts.unshift(action.payload);
    },

    updatePostInProfile: (state, action) => {
      const updatedPost = action.payload;
      const { _id: postID } = updatedPost;
      let indexInUserPosts = state.userPosts.findIndex(
        (post) => post._id === postID
      );
      if (indexInUserPosts > -1) {
        state.userPosts[indexInUserPosts] = updatedPost;
      }
    },

    removePostFromProfile: (state, action) => {
      const postID = action.payload;
      let indexInUserPosts = state.userPosts.findIndex(
        (post) => post._id === postID
      );
      if (indexInUserPosts > -1) {
        state.userPosts.splice(indexInUserPosts, 1);
      }
    },
  },
  extraReducers: {
    [getUserData.pending]: (state, action) => {
      state.userDataStatus = "loading";
    },
    [getUserData.fulfilled]: (state, action) => {
      state.userDataStatus = "success";
      state.userData = action.payload;
    },
    [getUserData.rejected]: (state, action) => {
      state.userDataStatus = "error";
    },
    [updateUserData.pending]: (state, action) => {
      state.userDataStatus = "loading";
    },
    [updateUserData.fulfilled]: (state, action) => {
      state.userData = action.payload;
      state.userDataStatus = "success";
    },
    [updateUserData.rejected]: (state, action) => {
      state.userDataStatus = "error";
    },
    [getUserPosts.pending]: (state, action) => {
      state.userPostsStatus = "loading";
    },
    [getUserPosts.fulfilled]: (state, action) => {
      state.userPosts = action.payload;
      state.userPostsStatus = "success";
    },
    [getUserPosts.rejected]: (state, action) => {
      state.userPostsStatus = "error";
    },
  },
});

export const {
  resetProfile,
  addPostToProfile,
  updatePostInProfile,
  removePostFromProfile,
} = profileSlice.actions;
export default profileSlice.reducer;
