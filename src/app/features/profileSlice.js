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
  },
});

export const { resetProfile } = profileSlice.actions;
export default profileSlice.reducer;
