import store from "../app/store";

import { logout } from "../app/features/authenticationSlice";
import { resetFeed } from "../app/features/feedSlice";
import { resetProfile } from "../app/features/profileSlice";
import { resetPostSlice } from "../app/features/postSlice";

export const logoutUser = () => {
  store.dispatch(logout());
  store.dispatch(resetFeed());
  store.dispatch(resetProfile());
  store.dispatch(resetPostSlice());
};
