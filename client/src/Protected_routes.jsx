import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ allowedRoles, element }) {
  const details = JSON.parse(sessionStorage.getItem("userDetails"));
  const userRole = details.user.role;

  if (allowedRoles.includes(userRole)) {
    return element;
  } else {
    return <Navigate to="*" />;
  }
}

export default PrivateRoute;
