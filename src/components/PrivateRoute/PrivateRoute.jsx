import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router";

const PrivateRoute = ({ children, ...rest }) => {
  const { token } = useSelector((state) => state.authentication);
  return (
    <Route
      {...rest}
      render={() => {
        return token ? children : <Redirect to="/login" />;
      }}
    />
  );
};

export default PrivateRoute;
