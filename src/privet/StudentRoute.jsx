import React from "react";
import { Navigate } from "react-router-dom";
import Loading from "../components/Loading";
import useRole from "../hooks/useRole";

const StudentRoute = ({ children }) => {
  const [role, isLoading] = useRole();
  if (isLoading) {
    return <Loading></Loading>;
  }
  if (role === "student") {
    return children;
  }
  return (
    <Navigate
      to={
        (role === "admin" && "/dashboard/all-users") ||
        (role === "tutor" && "/dashboard/view-all-study")
      }
      replace="true"
    ></Navigate>
  );
};

export default StudentRoute;
