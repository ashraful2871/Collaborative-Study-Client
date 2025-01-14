import React from "react";
import { Outlet } from "react-router-dom";
import TutorMenu from "../../components/sidebar/tutor/Tutormenu";

const Dashboard = () => {
  return (
    <div className="flex">
      {/* Left Side: Sidebar Component */}
      <div className="w-64 p-4 min-h-screen bg-orange-400">
        <TutorMenu></TutorMenu>
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
