import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import TutorMenu from "../../components/sidebar/tutor/Tutormenu";
import AdminMenu from "../../components/sidebar/admin/AdminMenu";
import StudentMenu from "../../components/sidebar/admin/student/StudentMenu";
import useRole from "../../hooks/useRole";
import Footer from "../../components/Footer";

const Dashboard = () => {
  const [role, isLoading] = useRole();
  console.log(role);
  return (
    <>
      <div className="flex">
        {/* Left Side: Sidebar Component */}
        <div className="space-y-5">
          <div className="w-64 p-4 h-full min-h-screen bg-orange-400">
            {role === "admin" && <AdminMenu></AdminMenu>}
            {role === "tutor" && <TutorMenu></TutorMenu>}

            {role === "student" && <StudentMenu></StudentMenu>}
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
      <div className="mt-6">
        <Footer></Footer>
      </div>
    </>
  );
};

export default Dashboard;
