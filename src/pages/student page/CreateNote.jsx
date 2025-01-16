import React from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const CreateNote = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const handleSubmit = async (e) => {
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
  };
  return (
    <div className="flex justify-center  min-h-screen bg-base-100">
      <div className="card w-full  p-8 shadow-lg bg-white">
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
            ></textarea>
          </div>
          <div className="text-center">
            <button className="btn btn-primary w-full">Create Note</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNote;
