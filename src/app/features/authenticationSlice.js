import { createSlice } from "@reduxjs/toolkit";

const userInfo = {
  _id: localStorage.getItem("_id") ?? "",
  name: localStorage.getItem("name") ?? "",
  username: localStorage.getItem("username") ?? "",
  token: localStorage.getItem("token") ?? "",
  avatarUrl: localStorage.getItem("avatarUrl") ?? "",
};

const authenticationSlice = createSlice({
  name: "authentication",
  initialState: userInfo,
  reducers: {
    login: (state, action) => {
      const { userID, name, username, token, avatarUrl } = action.payload;
      localStorage.setItem("_id", userID);
      localStorage.setItem("name", name);
      localStorage.setItem("username", username);
      localStorage.setItem("token", token);
      localStorage.setItem("avatarUrl", avatarUrl);
      state._id = userID;
      state.name = name;
      state.username = username;
      state.token = token;
      state.avatarUrl = avatarUrl;
    },
    logout: (state, action) => {
      localStorage.setItem("_id", null);
      localStorage.setItem("name", null);
      localStorage.setItem("username", null);
      localStorage.setItem("token", null);
      localStorage.setItem("avatarUrl", null);
      state._id = "";
      state.name = "";
      state.username = "";
      state.token = "";
      state.avatarUrl = "";
    },
  },
});

export const { login, logout } = authenticationSlice.actions;
export default authenticationSlice.reducer;
