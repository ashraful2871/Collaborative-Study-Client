import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_upload_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const SignUp = () => {
  const { signUpUser, setUser, updateUserProfile, googleLogin } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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
        console.log(result.user);
        updateUserProfile(name, imageUrl);
        setUser({ ...result.user, photoURL: imageUrl, displayName: name });
        const userInfo = {
          email: result?.user?.email,
          name: name,
          photo: imageUrl,
        };
        console.log(userInfo.name);
        axios.post(`${import.meta.env.VITE_API_URL}/users`, userInfo);
        toast.success("Signed Up Successfully");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
    setLoading(true);
  };
  const handleGoogleSignUP = () => {
    //google login
    googleLogin()
      .then((result) => {
        console.log(result.user);
        const userInfo = {
          email: result.user?.email,
          name: result.user?.displayName,
          photo: result?.user?.photoURL,
        };
        axios.post(`${import.meta.env.VITE_API_URL}/users`, userInfo);
        toast.success("Successfully Signed Up");
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
              placeholder="email"
              name="name"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Photo</span>
            </label>
            <input
              type="file"
              placeholder="Photo"
              name="image"
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
            {loading ? (
              <button className="btn btn-primary w-full">
                <span className="loading loading-spinner"></span>
              </button>
            ) : (
              <button className="btn btn-primary">Sign Up </button>
            )}
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
