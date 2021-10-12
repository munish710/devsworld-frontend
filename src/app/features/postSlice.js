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
export const getPost = createAsyncThunk("post/getPost", async (postID) => {
  try {
    const response = await axios.get(`/posts/${postID}`);
    if (response.data.success) {
      return response.data.post;
    }
  } catch (error) {
    console.log("Can't get post", error);
  }
});

//add comment
export const addComment = createAsyncThunk(
  "post/addComment",
  async (commentData) => {
    const { postID, comment } = commentData;
    try {
      const response = await axios.patch(`/posts/${postID}/comment`, {
        comment,
      });
      if (response.data.success) {
        return response.data.post;
      }
    } catch (error) {
      console.log("Can't add comment", error);
    }
  }
);

//delete Comment
export const deleteComment = createAsyncThunk(
  "post/deleteComment",
  async (commentData) => {
    const { postID, commentID } = commentData;
    try {
      const response = await axios.post(`/posts/${postID}/comment`, {
        commentID,
      });
      if (response.data.success) {
        return response.data.message;
      }
    } catch (error) {
      console.log("Delete comment failed", error);
    }
  }
);

const initialPostState = {
  post: {},
  postStatus: "idle",
  fetchPostStatus: "idle",
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
    [getPost.pending]: (state, action) => {
      state.fetchPostStatus = "loading";
    },
    [getPost.fulfilled]: (state, action) => {
      state.fetchPostStatus = "success";
      state.post = action.payload;
    },
    [getPost.rejected]: (state, action) => {
      state.fetchPostStatus = "error";
    },
    [deletePost.fulfilled]: (state, action) => {
      state.fetchPostStatus = "deleted";
    },
  },
});

export const { updatePostInSlice, resetPostSlice } = postSlice.actions;
export default postSlice.reducer;
