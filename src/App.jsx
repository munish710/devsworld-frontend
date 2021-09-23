import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import { Footer, Navbar } from "./components";
import {
  Home,
  Login,
  PageNotFound,
  PostDetail,
  Profile,
  Signup,
} from "./pages";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/signup" exact>
          <Signup />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/profile" exact>
          <Profile />
        </Route>
        <Route path="/posts/:postID" exact>
          <PostDetail />
        </Route>
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
    </Router>
  );
};

export default App;
