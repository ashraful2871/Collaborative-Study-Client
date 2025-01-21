import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateNote = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData(e.target);
    const studentEmail = user?.email;
    const title = formData.get("title");
    const description = formData.get("description");
    const noteData = {
      studentEmail,
      title,
      description,
    };
    console.log(noteData);

    const { data } = await axiosSecure.post("/crete-note", noteData);
    console.log(data);
    toast.success("/Note Create successfully");
    setLoading(false);
    navigate("/dashboard/personal-note");
  };
  return (
    <div className="flex justify-center  min-h-screen bg-base-100">
      <div className="card w-full  p-4  bg-white">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">
            Create Your <span className="text-blue-500">Personal Note</span>
          </h1>
          <p className="text-gray-500 mt-2">
            A space to track my progress in personal development activities,
            such as skill-building, mindfulness practices, and self-improvement
            exercises.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto w-full">
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">
              Student Email:
            </label>
            <input
              value={user?.email}
              readOnly
              type="email"
              className="input input-bordered w-full bg-gray-100"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">
              Note Title:
            </label>
            <input
              type="text"
              name="title"
              placeholder="Note Title"
              className="input input-bordered w-full bg-gray-100"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-1">
              Note Description:
            </label>
            <textarea
              placeholder="Note Description"
              name="description"
              className="textarea textarea-bordered w-full bg-gray-100"
              rows="4"
              required
            ></textarea>
          </div>
          <div className="text-center">
            {loading ? (
              <button className="btn btn-primary">
                <span className="loading loading-spinner"></span>
              </button>
            ) : (
              <button className="btn btn-primary w-full bg-blue-500 hover:bg-blue-600  font-semibold text-white text-lg">
                Create Note
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNote;
