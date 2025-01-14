import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <div>
      <ul className="menu">
        {" "}
        <li>
          <NavLink to="/dashboard/all-users">View all users</NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/all-study-session">
            View all study session
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/all-materials">View all materials</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default AdminMenu;
