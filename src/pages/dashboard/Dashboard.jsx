import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import TutorMenu from "../../components/sidebar/tutor/Tutormenu";
import AdminMenu from "../../components/sidebar/admin/AdminMenu";
import StudentMenu from "../../components/sidebar/admin/student/StudentMenu";
import useRole from "../../hooks/useRole";
import Footer from "../../components/Footer";
import { LuLogOut } from "react-icons/lu";
import useAuth from "../../hooks/useAuth";
import { TiThMenu } from "react-icons/ti";

const Dashboard = () => {
  const [role, isLoading] = useRole();
  const { signOutUser } = useAuth();

  return (
    <>
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        <div className="w-full lg:w-64 p-4 bg-gray-100 flex flex-col justify-between lg:min-h-screen">
          <div className="hidden lg:block">
            <div className="mb-6 text-center">
              <Link to="/" className="text-xl font-bold text-green-700">
                Collaborative Study
              </Link>
            </div>

            {/* Sidebar Menus */}
            {role === "admin" && <AdminMenu />}
            {role === "tutor" && <TutorMenu />}
            {role === "student" && <StudentMenu />}
          </div>
          <div className="drawer z-50 block lg:hidden">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              {/* Page content here */}
              <label
                htmlFor="my-drawer"
                className="btn btn-primary bg-blue-500 hover:bg-blue-600  font-semibold text-white text-lg"
              >
                <TiThMenu />
              </label>
            </div>
            <div className="drawer-side">
              <label
                htmlFor="my-drawer"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                <div className="mb-6 text-center">
                  <Link to="/" className="text-xl font-bold text-green-700">
                    Collaborative Study
                  </Link>
                </div>
                {role === "admin" && <AdminMenu />}
                {role === "tutor" && <TutorMenu />}
                {role === "student" && <StudentMenu />}
              </ul>
              <div className="mt-auto">
                <ul className="menu">
                  <li>
                    <button
                      onClick={signOutUser}
                      className="flex items-center p-2 text-base font-bold"
                    >
                      Logout
                      <LuLogOut />
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-auto hidden lg:block">
            <ul className="menu">
              <li>
                <button
                  onClick={signOutUser}
                  className="flex items-center p-2 text-base font-bold"
                >
                  Logout
                  <LuLogOut />
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-2">
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
