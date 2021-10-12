import React, { Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import { Footer, Navbar, PrivateRoute, PublicRoute } from "./components";
import { Home } from "./pages";
const Login = React.lazy(() => import("./pages/Login/Login"));
const Signup = React.lazy(() => import("./pages/Signup/Signup"));
const Profile = React.lazy(() => import("./pages/Profile/Profile"));
const PostDetail = React.lazy(() => import("./pages/PostDetail/PostDetail"));
const PageNotFound = React.lazy(() =>
  import("./pages/PageNotFound/PageNotFound")
);

const App = () => {
  const auth = useSelector((state) => state.authentication);
  return (
    <>
      {auth.token && <Navbar />}
      <Suspense fallback={<div></div>}>
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
      </Suspense>
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
