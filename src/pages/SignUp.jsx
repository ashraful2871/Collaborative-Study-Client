import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import GitHubLogin from "./git-hub/GitHubLogin";
import { useQueryClient } from "@tanstack/react-query";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_upload_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const SignUp = () => {
  const queryClient = useQueryClient();
  const { signUpUser, setUser, updateUserProfile, googleLogin } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userRole, SetUserRole] = useState(null);

  const handleSignUp = async (e) => {
    setLoading(true);
    e.preventDefault();

    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const image = formData.get("image");
    const password = formData.get("password");

    let imageUrl = "";
    if (image) {
      const imgFormData = new FormData();
      imgFormData.append("image", image);

      try {
        const response = await axios.post(image_upload_api, imgFormData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(response.data.data.display_url);
        if (response.data.success) {
          imageUrl = response.data.data.display_url;
        }
      } catch (error) {
        console.log(error);
        toast.error("Image upload failed:", error);
        return;
      }
    }

    const signUPInfo = { name, email, photo: imageUrl, password };
    // return console.log(signUPInfo);

    const hasUppercase = /[A-Z]/;
    const hasLowercase = /[a-z]/;
    const hasMinLength = /.{6,}/;
    const hasMinLengthName = /.{5,}/;

    if (!hasMinLengthName.test(name)) {
      toast.error("Name at least 5 character or longer");
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
      .then((result) => {
        updateUserProfile(name, imageUrl);
        setUser({ ...result.user, photoURL: imageUrl, displayName: name });

        const userInfo = {
          email: result?.user?.email,
          name,
          photo: imageUrl,
          role: userRole, // Set the role from the dropdown
        };

        // Save user to the database
        axios
          .post(`${import.meta.env.VITE_API_URL}/users`, userInfo)
          .then(() => {
            // Invalidate the query so the role is refetched
            queryClient.invalidateQueries(["role", email]);
            toast.success("Signed Up Successfully");
            navigate("/");
          });
      })
      .catch((error) => {
        console.error(error);
        toast.error("Signup failed");
      })
      .finally(() => setLoading(false));
  };
  //google login
  const handleGoogleSignUP = () => {
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
            navigate("/");
          });
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
            <span className="text-blue-600">Sign Up</span> Now
          </h2>
        </div>
        <form onSubmit={handleSignUp} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="email"
              name="name"
              className="input input-bordered"
              required
            />
          </div>
          {/* select image */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Photo</span>
            </label>
            <input
              type="file"
              placeholder="Photo"
              name="image"
              className="input input-bordered pt-2"
              required
            />
          </div>

          {/* select role */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">User Role</span>
            </label>
            <select
              onChange={(e) => SetUserRole(e.target.value)}
              className="select select-bordered w-full max-w-xs"
            >
              <option disabled selected>
                Select Role
              </option>
              <option>student</option>
              <option>tutor</option>
            </select>
          </div>

          {/* email */}
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
            {loading ? (
              <button className="btn bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition duration-300 text-base btn-primary w-full">
                <span className="loading loading-spinner"></span>
              </button>
            ) : (
              <button className="btn bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition duration-300 text-base">
                Sign Up{" "}
              </button>
            )}
          </div>
        </form>
        <div>
          <div className="divider -mt-1">or</div>
          <div className="flex justify-center my-4 font-semibold">
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
          <GitHubLogin></GitHubLogin>
        </div>
        <div className="text-center  my-6">
          <h2 className="text-lg">
            Already Have an Account?{" "}
            <span className="text-blue-500 font-semibold">
              <Link to="/login"> Login</Link>
            </span>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
