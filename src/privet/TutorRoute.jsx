import React from "react";
import { Navigate } from "react-router-dom";
import useRole from "../hooks/useRole";
import Loading from "../components/Loading";

const TutorRoute = ({ children }) => {
  const [role, isLoading] = useRole();
  if (isLoading) {
    return <Loading></Loading>;
  }
  if (role === "tutor") {
    return children;
  }
  return (
    <Navigate
      to={
        (role === "admin" && "/dashboard/all-users") ||
        (role === "student" && "/dashboard/view-book-session")
      }
      replace="true"
    ></Navigate>
  );
};

export default TutorRoute;
