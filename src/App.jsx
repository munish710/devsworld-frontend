import React from "react";
import { Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import { Footer, Navbar, PrivateRoute, PublicRoute } from "./components";
import {
  Home,
  Login,
  PageNotFound,
  PostDetail,
  Profile,
  Signup,
} from "./pages";

const App = () => {
  const auth = useSelector((state) => state.authentication);
  return (
    <>
      {auth.token && <Navbar />}
      <Switch>
        <PrivateRoute path="/" exact>
          <Home />
        </PrivateRoute>
        <PublicRoute path="/signup" exact>
          <Signup />
        </PublicRoute>
        <PublicRoute path="/login" exact>
          <Login />
        </PublicRoute>
        <PrivateRoute path="/profile/:userID" exact>
          <Profile />
        </PrivateRoute>
        <PrivateRoute path="/posts/:postID" exact>
          <PostDetail />
        </PrivateRoute>
        <Route path="*" exact>
          <PageNotFound />
        </Route>
      </Switch>
      <Footer />
      <ToastContainer
        pauseOnHover={false}
        position="bottom-right"
        autoClose={3000}
        transition={Slide}
      />
    </>
  );
};

export default App;
