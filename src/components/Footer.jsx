import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import useRole from "../hooks/useRole";

const Footer = () => {
  const [role] = useRole();
  return (
    <footer className="bg-base-200 text-base-content border-t">
      <div className="">
        <div className="p-10 grid grid-cols-1 md:flex md:justify-evenly gap-8 bg-base-200 text-base-content">
          <div className="space-y-2">
            <h3 className="font-bold text-lg">Car Rent</h3>
            <p>Contact: costudy@contact.com</p>
            <img
              className="h-28 w-32 object-cover"
              src="https://i.ibb.co.com/ckLVRx4/educative-logo.png"
              alt=""
            />
          </div>
          <div>
            <h3 className="font-bold text-lg">Navigate</h3>
            <ul className="list-none mt-2 space-y-1">
              <li>
                <Link to="/">Home</Link>
              </li>
              {role === "admin" && (
                <li>
                  <Link to="/dashboard/all-users">Dashboard</Link>
                </li>
              )}
              {role === "tutor" && (
                <li>
                  <Link to="/dashboard/view-all-study">Dashboard</Link>
                </li>
              )}
              {role === "student" && (
                <li>
                  <Link to="/dashboard/view-book-session">Dashboard</Link>
                </li>
              )}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg">Benefits</h3>
            <ul className="list-none mt-2 space-y-1">
              <li>Exclusive Study Session and Classes</li>
              <li>Community Forums</li>
              <li>24/7 Support</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg">Social Media</h3>
            <div className="flex gap-3 mt-2">
              <a
                className="text-2xl"
                href="https://x.com/ashraful72871"
                target="_blank"
              >
                <FaTwitter />
              </a>
              <a
                className="text-2xl"
                href="https://www.facebook.com/ashraful2871"
                target="_blank"
              >
                <FaFacebook></FaFacebook>
              </a>
              <a
                className="text-2xl"
                href="https://www.instagram.com/ashrafulislam2871/"
                target="_blank"
              >
                <FaInstagram></FaInstagram>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-base-200 p-4 text-center">
        <p>
          Copyright © {new Date().getFullYear()} Car Rent. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
