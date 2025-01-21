import React from "react";
import useRole from "../hooks/useRole";
import Loading from "../components/Loading";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const [role, isLoading] = useRole();
  if (isLoading) {
    return <Loading></Loading>;
  }
  if (role === "admin") {
    return children;
  }
  return (
    <Navigate
      to={
        (role === "student" && "/dashboard/view-book-session") ||
        (role === "tutor" && "/dashboard/view-all-study")
      }
      replace="true"
    ></Navigate>
  );
};

export default AdminRoute;
