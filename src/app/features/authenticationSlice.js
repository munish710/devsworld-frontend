import { createSlice } from "@reduxjs/toolkit";

const userInfo = {
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
      const { name, username, token, avatarUrl } = action.payload;
      localStorage.setItem("name", name);
      localStorage.setItem("username", username);
      localStorage.setItem("token", token);
      localStorage.setItem("avatarUrl", avatarUrl);
      state.name = name;
      state.username = username;
      state.token = token;
      state.avatarUrl = avatarUrl;
    },
    logout: (state, action) => {
      localStorage.setItem("name", null);
      localStorage.setItem("username", null);
      localStorage.setItem("token", null);
      localStorage.setItem("avatarUrl", null);
      state.name = "";
      state.username = "";
      state.token = "";
      state.avatarUrl = "";
    },
  },
});

export const { login, logout } = authenticationSlice.actions;
export default authenticationSlice.reducer;
