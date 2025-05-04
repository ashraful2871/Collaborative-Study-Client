import React from "react";
import { NavLink } from "react-router-dom";
import Profile from "../../../pages/dashboard/Profile";

const AdminMenu = () => {
  return (
    <div>
      <ul className="menu font-semibold text-base text-base-content">
        <li>
          <NavLink to="/dashboard/overview">Overview</NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/all-study-session">
            View all study session
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/all-users">View all users</NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/all-materials">View all materials</NavLink>
        </li>
        <Profile></Profile>
      </ul>
    </div>
  );
};

export default AdminMenu;
