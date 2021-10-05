import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//thunks
export const getUserFeed = createAsyncThunk(
  "feed/getUserFeed",
  async (obj, { dispatch }) => {
    try {
      const response = await axios.get("/posts/myfeed");
      if (response.data.posts) {
        const { posts } = response.data;
        let userFeedPostsIds = [];
        if (posts.length > 0) {
          userFeedPostsIds = posts.map((post) => post._id);
        }
        if (posts.length > 0 && posts.length < 10) {
          dispatch(getGeneralFeed(userFeedPostsIds));
        }

        return posts;
      } else {
        return [];
      }
    } catch (error) {
      console.log("Fetch User Feed failed", error);
    }
  }
);

export const getGeneralFeed = createAsyncThunk(
  "feed/getGeneralFeed",
  async (postIdsToExclude) => {
    try {
      const response = await axios.get("/posts");
      if (response.data.posts) {
        const { posts } = response.data;
        let allPosts = posts;
        console.log("allPost", allPosts);
        if (postIdsToExclude && postIdsToExclude.length > 0) {
          allPosts = allPosts.filter((post) => {
            return !postIdsToExclude.includes(post._id);
          });
          console.log("allPost-2", allPosts);

          return allPosts;
        }
      }
      return [];
    } catch (error) {
      console.log("Can't get all posts", error);
    }
  }
);

export const getUsersData = createAsyncThunk("feed/getUsersData", async () => {
  try {
    const response = await axios.get("/users");
    if (response.data.users) {
      return response.data.users;
    }
    return [];
  } catch (error) {
    console.log("Can't get users", error);
  }
});

//slice
const feedState = {
  userFeed: [],
  generalFeed: [],
  usersData: [],
  userFeedStatus: "idle",
  generalFeedStatus: "idle",
  usersDataStatus: "idle",
};

const feedSlice = createSlice({
  name: "feed",
  initialState: feedState,
  reducers: {
    addPostToFeed: (state, action) => {
      state.userFeed.unshift(action.payload);
    },
    updatePostInFeed: (state, action) => {
      console.log("upfatePost in feed", action.payload);
      const updatedPost = action.payload;
      const { _id: postID } = updatedPost;
      let indexInUserFeed = state.userFeed.findIndex(
        (post) => post._id === postID
      );
      if (indexInUserFeed > -1) {
        state.userFeed[indexInUserFeed] = updatedPost;
      } else {
        let indexInGeneralFeed = state.generalFeed.findIndex(
          (post) => post._id === postID
        );
        if (indexInGeneralFeed > -1) {
          state.generalFeed[indexInGeneralFeed] = updatedPost;
        }
      }
    },
    removePostFromFeed: (state, action) => {
      const postID = action.payload;
      let indexInUserFeed = state.userFeed.findIndex(
        (post) => post._id === postID
      );
      if (indexInUserFeed > -1) {
        state.userFeed.splice(1, indexInUserFeed);
      } else {
        let indexInGeneralFeed = state.generalFeed.findIndex(
          (post) => post._id === postID
        );
        if (indexInGeneralFeed > -1) {
          state.generalFeed.splice(1, indexInGeneralFeed);
        }
      }
    },
    resetFeed: (state, action) => {
      state.userFeed = [];
      state.generalFeed = [];
      state.usersData = [];
      state.userFeedStatus = "idle";
      state.generalFeedStatus = "idle";
      state.usersDataStatus = "idle";
    },
  },
  extraReducers: {
    [getUserFeed.pending]: (state, action) => {
      state.userFeedStatus = "loading";
    },
    [getUserFeed.fulfilled]: (state, action) => {
      state.userFeedStatus = "success";
      state.userFeed = action.payload;
    },
    [getUserFeed.rejected]: (state, action) => {
      state.userFeedStatus = "error";
    },
    [getGeneralFeed.pending]: (state, action) => {
      state.generalFeedStatus = "loading";
    },
    [getGeneralFeed.fulfilled]: (state, action) => {
      state.generalFeedStatus = "success";
      state.generalFeed = action.payload;
    },
    [getGeneralFeed.rejected]: (state, action) => {
      state.generalFeedStatus = "error";
    },
    [getUsersData.pending]: (state, action) => {
      state.usersDataStatus = "loading";
    },
    [getUsersData.fulfilled]: (state, action) => {
      state.usersDataStatus = "success";
      state.usersData = action.payload;
    },
    [getUsersData.rejected]: (state, action) => {
      state.usersDataStatus = "error";
    },
  },
});

export const {
  resetFeed,
  addPostToFeed,
  updatePostInFeed,
  removePostFromFeed,
} = feedSlice.actions;
export default feedSlice.reducer;
