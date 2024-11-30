import { Navigate, useLocation } from "react-router-dom";
import { Fragment } from "react";

function RouteGuard({ authenticated, user, element }) {
  const location = useLocation();

  console.log(authenticated, user, "useruser");

  if (!authenticated && 
    !location.pathname.includes("/auth") && 
    location.pathname !== "/" &&
    location.pathname !== "/about"
  ) {
    return <Navigate to="/auth" />;
  }

  if (
    authenticated &&
    user?.role !== "instructor" &&
    user?.role !== "admin" &&
    (location.pathname.includes("instructor") ||
      location.pathname.includes("/auth") ||
      location.pathname.includes("/admin")
    )
  ) {
    return <Navigate to="/home" />;
  }

  if (
    authenticated &&
    user.role === "instructor" &&
    !location.pathname.includes("instructor")
  ) {
    return <Navigate to="/instructor" />;
  }

  if (
    authenticated &&
    user?.role === "admin" &&
    !location.pathname.includes("admin")
  ) {
    return <Navigate to="/admin" />;
  }

  return <Fragment>{element}</Fragment>;
}

export default RouteGuard;
