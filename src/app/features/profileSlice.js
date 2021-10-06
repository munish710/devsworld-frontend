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
    debugger;
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
  },
  extraReducers: {
    [getUserData.pending]: (state, action) => {
      state.userDataStatus = "loading";
    },
    [getUserData.fulfilled]: (state, action) => {
      state.userDataStatus = "success";
      state.userData = action.payload;
    },
    [getUserData.pending]: (state, action) => {
      state.userDataStatus = "error";
    },
    [updateUserData.pending]: (state, action) => {
      state.userDataStatus = "loading";
    },
    [updateUserData.fulfilled]: (state, action) => {
      state.userData = action.payload;
      state.userDataStatus = "success";
    },
    [updateUserData.pending]: (state, action) => {
      state.userDataStatus = "error";
    },
  },
});

export const { resetProfile } = profileSlice.actions;
export default profileSlice.reducer;
