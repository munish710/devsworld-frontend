import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

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
    </Router>
  );
};

export default App;
