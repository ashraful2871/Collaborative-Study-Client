import React, { useContext } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import TutorMenu from "../../components/sidebar/tutor/Tutormenu";
import AdminMenu from "../../components/sidebar/admin/AdminMenu";
import StudentMenu from "../../components/sidebar/admin/student/StudentMenu";
import useRole from "../../hooks/useRole";
import { LuLogOut } from "react-icons/lu";
import useAuth from "../../hooks/useAuth";
import { TiThMenu } from "react-icons/ti";
import { ThemeContext } from "../../provider/themeProvider";

const Dashboard = () => {
  const [role, isLoading] = useRole();
  const { signOutUser } = useAuth();
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <div className="lg:flex lg:h-screen overflow-hidden">
        {/* Sidebar */}
        <div
          className={`lg:w-64 ${theme === "light" && "bg-gray-100"}  ${
            theme === "dark" && "border border-blue-500 rounded-xl"
          } flex flex-col justify-between lg:h-full`}
        >
          <div className="hidden lg:block lg:h-full overflow-y-auto">
            <div className="mb-6 text-center p-4">
              <Link to="/" className="text-xl font-bold text-green-700">
                Collaborative Study
              </Link>
            </div>

            <div>
              {/* Sidebar Menus */}
              {role === "admin" && <AdminMenu />}
              {role === "tutor" && <TutorMenu />}
              {role === "student" && <StudentMenu />}
            </div>
          </div>
          <div className="drawer z-50 block lg:hidden">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              {/* Responsive Drawer Toggle */}
              <label
                htmlFor="my-drawer"
                className="btn btn-primary bg-blue-500 hover:bg-blue-600 font-semibold text-white text-lg m-2"
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
              <ul className="menu bg-base-200 text-base-content h-full w-80 p-4">
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
                      className="flex items-center p-2 text-base font-bold text-white"
                    >
                      Logout
                      <LuLogOut />
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-auto hidden lg:block p-4">
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
        <div className="flex-1 h-full overflow-y-auto p-4 bg-base-100">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
