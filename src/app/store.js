import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "./features/authenticationSlice";
import feedReducer from "./features/feedSlice";

export default configureStore({
  reducer: {
    authentication: authenticationReducer,
    feed: feedReducer,
  },
});
