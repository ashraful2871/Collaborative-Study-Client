import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import TutorMenu from "../../components/sidebar/tutor/Tutormenu";
import AdminMenu from "../../components/sidebar/admin/AdminMenu";
import StudentMenu from "../../components/sidebar/admin/student/StudentMenu";
import useRole from "../../hooks/useRole";
import Footer from "../../components/Footer";
import { LuLogOut } from "react-icons/lu";

const Dashboard = () => {
  const [role, isLoading] = useRole();

  return (
    <>
      <div className="flex">
        {/* Left Side: Sidebar Component */}
        <div className="space-y-3">
          <div className="w-64 p-4 h-full min-h-screen bg-gray-100 flex flex-col justify-between">
            <div>
              {/* Logo */}
              <div className="mb-6 text-center">
                <Link to="/" className="text-xl font-bold text-green-700">
                  Collaborative Study
                </Link>
              </div>

              {/* Role-Specific Menus */}
              {role === "admin" && <AdminMenu />}
              {role === "tutor" && <TutorMenu />}
              {role === "student" && <StudentMenu />}
            </div>

            <div>
              <div className="divider"></div>
              {/* Bottom Section */}
              <ul className="menu">
                <li>
                  <NavLink
                    to="/logout"
                    className="flex items-center p-2 text-base font-bold"
                  >
                    Logout
                    <LuLogOut />
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Side: Dashboard Dynamic Content */}
        <div className="flex-1 p-8">
          {/* Outlet for dynamic contents */}
          <Outlet />
        </div>
      </div>
      <div className="mt-6">
        <Footer />
      </div>
    </>
  );
};

export default Dashboard;
