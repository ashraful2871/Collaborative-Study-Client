import React from "react";
import toast from "react-hot-toast";

const Newsletter = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Successfully Subscribe");
    e.target.reset();
  };
  return (
    <div className="flex items-center justify-center">
      <div className="text-center text-base-content">
        <h2 className="text-3xl font-bold text-blue-500">Newsletter</h2>
        <p className="mt-2">subscribe now for latest update</p>
        <form
          onSubmit={handleSubmit}
          className="mt-6 flex items-center  rounded-lg overflow-hidden w-96"
        >
          <input
            type="text"
            required
            placeholder="Enter Your Email"
            className="input input-bordered w-full border border-blue-500"
          />
          <button className="btn  bg-blue-500 hover:bg-blue-600 font-bold text-white text-base">
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Newsletter;
