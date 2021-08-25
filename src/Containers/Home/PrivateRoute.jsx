import React from "react";
import { Route, Redirect } from "react-router";

/**
 * @author
 * @function PrivateRoute
 **/

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      component={() => {
        const token = localStorage.getItem("token");
        if (token) {
          return <Component />;
        } else {
          localStorage.clear();
          return <Redirect to="/Signin" />;
        }
      }}
    />
  );
};
export default PrivateRoute;
