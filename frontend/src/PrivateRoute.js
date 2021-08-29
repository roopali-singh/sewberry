import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useStateValue } from "./StateProvider";

function PrivateRoute({ children, ...rest }) {
  const [{ userInfo }] = useStateValue();
  return (
    <Route
      {...rest}
      render={() => (userInfo?.token ? children : <Redirect to="/login" />)}
    />
  );
}

export default PrivateRoute;
