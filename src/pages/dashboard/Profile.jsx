import React from "react";
import { NavLink } from "react-router-dom";

const Profile = () => {
  return (
    <div>
      <ul>
        <div className="divider"></div>
        <li className="text-base font-bold">
          <NavLink to="/dashboard/profile">Profile</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Profile;
