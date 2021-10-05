import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//thunks

//create post
export const createPost = createAsyncThunk(
  "post/createPost",
  async (postData) => {
    try {
      const response = await axios.post("/posts", postData);
      if (response.data.success) {
        return response.data.post;
      }
      return {};
    } catch (error) {
      console.log("Couldn't create post", error);
    }
  }
);

//like/unlike post
export const toggleLike = createAsyncThunk(
  "post/toggleLike",
  async (postID) => {
    try {
      const response = await axios.patch(`/posts/${postID}/toggle-like`);
      if (response.data.success) {
        return response.data.isLiked;
      }
    } catch (error) {
      console.log("Toggle-like failed", error);
    }
  }
);

//deletepost
export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (postID) => {
    debugger;
    try {
      const response = await axios.delete(`/posts/${postID}`);
      if (response.data.success) {
        return response.data.message;
      }
    } catch (error) {
      console.log("Delete post failed", error);
    }
  }
);

//getPost

//add comment

//delete Comment

const initialPostState = {
  post: {},
  postStatus: "idle",
};
const postSlice = createSlice({
  name: "post",
  initialState: initialPostState,
  reducers: {
    resetPostSlice: (state) => {
      return initialPostState;
    },
    updatePostInSlice: (state, action) => {
      state.post = action.payload;
    },
  },
  extraReducers: {
    [createPost.pending]: (state, action) => {
      state.postStatus = "loading";
    },
    [createPost.fulfilled]: (state, action) => {
      state.postStatus = "success";
      state.post = action.payload;
    },
    [createPost.rejected]: (state, action) => {
      state.postStatus = "error";
    },
  },
});

export const { updatePostInSlice } = postSlice.actions;
export default postSlice.reducer;
