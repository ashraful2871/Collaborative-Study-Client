import React from "react";
import { NavLink } from "react-router-dom";
import Profile from "../../../../pages/dashboard/Profile";

const StudentMenu = () => {
  return (
    <div>
      <ul className="menu font-semibold text-base text-base-content">
        {" "}
        <li>
          <NavLink to="/dashboard/view-book-session">
            View booked session
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/create-note">Create note</NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/personal-note">Manage personal notes</NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/all-study-materials">
            View all study materials
          </NavLink>
        </li>
        <Profile></Profile>
      </ul>
    </div>
  );
};

export default StudentMenu;
