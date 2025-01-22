import React from "react";
import useAuth from "../../hooks/useAuth";
import { FaGithubAlt } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const GitHubLogin = () => {
  const { githubLogin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const handleGitHubLogin = () => {
    //gitHub login
    githubLogin()
      .then((result) => {
        console.log(result.user);
        const userInfo = {
          email: result.user?.email,
          name: result.user?.displayName,
          photo: result?.user?.photoURL,
          role: "student",
        };
        axios.post(`${import.meta.env.VITE_API_URL}/users`, userInfo);
        toast.success("Successfully login");
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        console.log(error);
        // toast.error("Invalid Email & Password");
      });
  };
  return (
    <div className="flex justify-center font-semibold">
      <button
        onClick={handleGitHubLogin}
        className="flex items-center gap-2 text-lg btn border border-black btn-ghost"
      >
        <span className="mt-1 text-2xl">
          <FaGithubAlt />
        </span>
        Login With GitHub
      </button>
    </div>
  );
};

export default GitHubLogin;
