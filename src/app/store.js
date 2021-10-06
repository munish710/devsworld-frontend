import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "./features/authenticationSlice";
import feedReducer from "./features/feedSlice";
import postReducer from "./features/postSlice";
import profileReducer from "./features/profileSlice";

export default configureStore({
  reducer: {
    authentication: authenticationReducer,
    feed: feedReducer,
    post: postReducer,
    profile: profileReducer,
  },
});
