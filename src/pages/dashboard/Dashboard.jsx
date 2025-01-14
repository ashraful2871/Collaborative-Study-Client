import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import TutorMenu from "../../components/sidebar/tutor/Tutormenu";

const Dashboard = () => {
  return (
    <div className="flex">
      {/* Left Side: Sidebar Component */}
      <div className="space-y-5">
        <div className="w-64 p-4 min-h-screen bg-orange-400">
          <TutorMenu></TutorMenu>
          <hr />
          <ul className="menu">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
          </ul>
        </div>
      </div>

      {/* Right Side: Dashboard Dynamic Content */}

      <div className="flex-1  p-8">
        {/* Outlet for dynamic contents */}
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
