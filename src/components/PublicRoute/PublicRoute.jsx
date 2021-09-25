import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router";

const PublicRoute = ({ children, ...rest }) => {
  const { token } = useSelector((state) => state.authentication);
  return (
    <Route
      {...rest}
      render={() => {
        return token ? <Redirect to="/" /> : children;
      }}
    />
  );
};

export default PublicRoute;
