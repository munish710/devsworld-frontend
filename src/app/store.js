import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "./features/authenticationSlice";
import feedReducer from "./features/feedSlice";
import postReducer from "./features/postSlice";

export default configureStore({
  reducer: {
    authentication: authenticationReducer,
    feed: feedReducer,
    post: postReducer,
  },
});
