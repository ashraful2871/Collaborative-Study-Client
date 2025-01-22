import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import GitHubLogin from "./git-hub/GitHubLogin";
import { useQueryClient } from "@tanstack/react-query";
import Loading from "../components/Loading";

const Login = () => {
  const queryClient = useQueryClient();
  const { signInUser, googleLogin, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  if (loading) return <Loading></Loading>;
  const handleLogin = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    const loginInfo = {
      email,
      password,
    };
    console.log(loginInfo);

    //sign in user
    signInUser(email, password)
      .then((result) => {
        console.log(result.user);
        toast.success("Successfully login", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        toast.error((error.message = "Invalid Email & Password"), {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      });
  };
  const handleGoogleLogin = () => {
    //google login
    googleLogin()
      .then((result) => {
        console.log(result.user);
        const userInfo = {
          email: result.user?.email,
          name: result.user?.displayName,
          photo: result?.user?.photoURL,
          role: "student",
        };
        axios
          .post(`${import.meta.env.VITE_API_URL}/users`, userInfo)
          .then(() => {
            // Invalidate the query so the role is refetched
            queryClient.invalidateQueries(["role", result.user?.email]);
            toast.success("Signed Up Successfully");
            navigate(location?.state ? location.state : "/");
          });
      })
      .catch((error) => {
        console.log(error);
        toast.error("Invalid Email & Password");
      });
  };

  return (
    <div className="flex justify-center">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 border-2">
        <form onSubmit={handleLogin} className="card-body">
          {" "}
          <div className="mt-5">
            <h2 className="text-center text-4xl font-bold">
              <span className="text-blue-600">Login</span> Now
            </h2>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              name="email"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              name="password"
              className="input input-bordered"
              required
            />
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>
          <div className="form-control mt-6">
            <button className="btn bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition duration-300 text-base">
              Login
            </button>
          </div>
        </form>
        <div className="divider -mt-1">or</div>
        <div className="flex justify-center my-4 font-semibold">
          <button
            onClick={handleGoogleLogin}
            className="flex items-center gap-2 text-lg btn border border-black btn-ghost"
          >
            <span className="mt-1 text-2xl">
              <FcGoogle />
            </span>
            Login With Google
          </button>
        </div>
        <GitHubLogin></GitHubLogin>
        <div className="text-center  my-6">
          <h2 className="text-lg">
            Do not Have an Account?{" "}
            <span className="text-blue-500 font-semibold">
              <Link to="/sign-up"> Sign Up</Link>
            </span>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Login;
