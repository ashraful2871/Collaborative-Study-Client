import React, { useContext, useState } from "react";
import { ThemeContext } from "../../provider/themeProvider";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import toast from "react-hot-toast";

const ReviewSection = () => {
  const { theme } = useContext(ThemeContext);
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData(e.target);
    const userEmail = user?.email;
    const description = formData.get("description");
    const reviewData = {
      userEmail,
      description,
    };
    console.log(reviewData);

    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/reviews`,
      reviewData
    );
    if (data.insertedId) {
      e.target.reset();
    }
    toast.success("/Review Sent successfully");
    setLoading(false);
  };
  return (
    <div className="flex justify-center bg-base-100">
      <div className="card w-full  p-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">
            Give Your <span className="text-blue-500">Review</span>
          </h1>
        </div>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto w-full">
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">
              your Email:
            </label>
            <input
              value={user?.email}
              readOnly
              type="email"
              className={`input input-bordered w-full ${
                theme === "light" && "bg-gray-100"
              }`}
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-1">
              Review Description:
            </label>
            <textarea
              placeholder="Review Description"
              name="description"
              className={`textarea textarea-bordered w-full ${
                theme === "light" && "bg-gray-100"
              }`}
              rows="4"
              required
            ></textarea>
          </div>
          <div className="text-center">
            {loading ? (
              <button className="btn btn-primary w-full bg-blue-500 hover:bg-blue-600 font-bold text-white text-base">
                <span className="loading loading-spinner"></span>
              </button>
            ) : (
              <button className="btn btn-primary w-full bg-blue-500 hover:bg-blue-600 font-bold text-white text-base">
                Send Review
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewSection;
