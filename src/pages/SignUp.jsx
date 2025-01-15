import React from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../hooks/useAuth";
import axios from "axios";

const SignUp = () => {
  const { signUpUser, setUser, updateUserProfile, googleLogin } = useAuth();
  const navigate = useNavigate();
  const handleSignUp = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    // const data = Object.fromEntries(formData.entries());
    const name = formData.get("name");
    const email = formData.get("email");
    const photo = formData.get("photo");
    const password = formData.get("password");
    const signUPInfo = { name, email, photo, password };
    console.log(signUPInfo);

    const hasUppercase = /[A-Z]/;
    const hasLowercase = /[a-z]/;
    const hasMinLength = /.{6,}/;
    const hasMinLengthName = /.{5,}/;
    if (!hasMinLengthName.test(name)) {
      toast.error("Name at least 5 character or longer", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      return;
    }

    if (!hasMinLength.test(password)) {
      toast.error("password must be 6 character or longer", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      return;
    }

    if (!hasUppercase.test(password)) {
      toast.error("must be one uppercase letter", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      return;
    }

    if (!hasLowercase.test(password)) {
      toast.error("must be one lowercase letter", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      return;
    }

    //sign up user
    signUpUser(email, password)
      .then(async (result) => {
        console.log(result.user);
        await updateUserProfile(name, photo);
        setUser({ ...result.user, photoURL: photo, displayName: name });
        const userInfo = {
          email: result?.user?.email,
          name: name,
          photo: photo,
        };
        console.log(userInfo.name);
        axios.post(`${import.meta.env.VITE_API_URL}/users`, userInfo);

        toast.success("Signed Up Successfully! Login Now");
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleGoogleSignUP = () => {
    //google login
    googleLogin()
      .then((result) => {
        console.log(result.user);
        toast.success("Successfully Signed Up");
        const userInfo = {
          email: result.user?.email,
          name: result.user?.displayName,
          photo: result?.user?.photoURL,
        };
        axios.post(`${import.meta.env.VITE_API_URL}/users`, userInfo);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="flex justify-center">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 border-2">
        <div className="mt-5">
          <h2 className="text-center text-4xl font-bold">
            <span className="text-red-600">Sign Up</span> Now
          </h2>
        </div>
        <form onSubmit={handleSignUp} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Name"
              name="name"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Photo URL</span>
            </label>
            <input
              type="url"
              placeholder="Photo Url"
              name="photo"
              className="input input-bordered"
              required
            />
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
          </div>
          <div className="form-control mt-6">
            <button className="btn bg-blue-700 hover:bg-blue-600 text-white font-bold rounded-lg transition duration-300 text-base">
              Sign Up
            </button>
          </div>
        </form>
        <div>
          <div className="divider -mt-1">or</div>
          <div className="flex justify-center my-6 font-semibold">
            <button
              onClick={handleGoogleSignUP}
              className="flex items-center gap-2 text-lg btn border border-black btn-ghost"
            >
              <span className="mt-1 text-2xl">
                <FcGoogle />
              </span>
              Sign Up With Google
            </button>
          </div>
        </div>
        <div className="text-center  my-6">
          <h2 className="text-lg">
            Already Have an Account?{" "}
            <span className="text-red-500 font-semibold">
              <Link to="/login"> Login</Link>
            </span>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
