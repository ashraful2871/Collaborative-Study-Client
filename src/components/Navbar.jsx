import React from "react";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const Navbar = () => {
  const { user, signOutUser } = useAuth();
  const [role] = useRole();

  const DropDownLinks = (
    <>
      {user && role === "admin" && (
        <li>
          <NavLink to="/dashboard/all-study-session">Dashboard</NavLink>
        </li>
      )}
      {user && role === "tutor" && (
        <li>
          <NavLink to="/dashboard/view-all-study">Dashboard</NavLink>
        </li>
      )}
      {user && role === "student" && (
        <li>
          <NavLink to="/dashboard/view-book-session">Dashboard</NavLink>
        </li>
      )}
      {user ? (
        <>
          <li className="block md:hidden">
            <NavLink to="/all-tutors">All Tutors</NavLink>
          </li>
          <li className="block md:hidden">
            <NavLink to="/all-sessions">All Sessions</NavLink>
          </li>
          <li>
            <button
              className="bg-red-400 hover:bg-red-700 text-white block text-center font-bold mt-5"
              onClick={signOutUser}
            >
              Logout
            </button>
          </li>
        </>
      ) : (
        <>
          {" "}
          <li className="block md:hidden">
            <NavLink to="/all-tutors">All Tutors</NavLink>
          </li>
          <li className="block md:hidden">
            <NavLink to="/all-sessions">All Sessions</NavLink>
          </li>
          <li>
            <NavLink to="login">Sign In</NavLink>
          </li>
          <li>
            <NavLink to="sign-up">Sign Up</NavLink>
          </li>
        </>
      )}
    </>
  );
  const links = (
    <>
      <li className="hidden md:block">
        <NavLink to="/all-tutors">All Tutors</NavLink>
      </li>
      <li className="hidden md:block">
        <NavLink to="/all-sessions">All Sessions</NavLink>
      </li>
    </>
  );

  return (
    <div>
      <div className="navbar bg-base-100 flex items-center justify-between fixed z-50 max-w-7xl mx-auto -mt-5">
        <div className="flex items-center">
          <Link to="/">
            <div className="flex items-center">
              <img
                className="h-12 w-12"
                src="https://i.ibb.co/ckLVRx4/educative-logo.png"
                alt="Logo"
              />
              <span className="text-2xl font-bold ml-2">
                Collaborative Study
              </span>
            </div>
          </Link>
        </div>
        <div className="flex items-center">
          <ul className="menu menu-horizontal p-0 ">{links}</ul>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  referrerPolicy="no-referrer"
                  alt="Avatar"
                  src={
                    user
                      ? user.photoURL
                      : "https://i.ibb.co/5jL18Qz/avater.webp"
                  }
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
            >
              {DropDownLinks}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
