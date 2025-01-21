import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_upload_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const CreateStudy = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData(e.target);
    const sessionTitle = formData.get("title");
    const image = formData.get("image");
    const registrationStart = formData.get("registration-start");
    const registrationEnd = formData.get("registration-end");
    const classStart = formData.get("class-start");
    const classEnd = formData.get("class-end");
    const hour = formData.get("duration-hours");
    const minute = formData.get("duration-minutes");
    const registrationFee = formData.get("registration-fee");
    const description = formData.get("description");

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
        toast.error("Image upload failed:", error);
        return;
      }
    }

    const createData = {
      tutor: {
        name: user?.displayName,
        email: user?.email,
      },
      sessionTitle,
      image: imageUrl,
      registrationStart,
      registrationEnd,
      classStart,
      classEnd,
      duration: { hour, minute },
      registrationFee,
      description,
      status: "Pending",
    };
    console.log(createData);
    const { data } = await axiosSecure.post(
      `${import.meta.env.VITE_API_URL}/create-study`,
      createData
    );
    // console.log(data);

    setLoading(false);
    toast.success("study create successfully");
    navigate("/dashboard/view-all-study");
  };

  return (
    <div className="my-12">
      <h2 className="text-center text-4xl font-semibold">
        Create Study Session
      </h2>
      <div className="card bg-base-100 w-full  border-2">
        <form
          onSubmit={handleSubmit}
          className="card-body grid grid-cols-1 md:grid-cols-2 gap-5 w-full"
        >
          <div className="form-control">
            <label className="label">
              <span className="label-text">Session Title</span>
            </label>
            <input
              type="text"
              name="title"
              placeholder="Session Title"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              value={user?.displayName}
              readOnly
              type="text"
              name="name"
              placeholder="name"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              value={user?.email}
              readOnly
              type="email"
              name="email"
              placeholder="email"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Session Image</span>
            </label>
            <input
              type="file"
              name="image"
              placeholder="Image url"
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Registration start date</span>
            </label>
            <input
              type="date"
              name="registration-start"
              placeholder="Start Date"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Registration end date</span>
            </label>
            <input
              type="date"
              name="registration-end"
              placeholder="End Date"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Class Start date</span>
            </label>
            <input
              type="date"
              name="class-start"
              placeholder="Start Date"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Class End date</span>
            </label>
            <input
              type="date"
              name="class-end"
              placeholder="End Date"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Session duration</span>
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                name="duration-hours"
                placeholder="Hours"
                className="input input-bordered w-1/2"
                min="0"
                required
              />
              <input
                type="number"
                name="duration-minutes"
                placeholder="Minutes"
                className="input input-bordered w-1/2"
                min="0"
                max="59"
                required
              />
            </div>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Registration Fee</span>
            </label>
            <input
              value={0}
              readOnly
              type="number"
              name="registration-fee"
              placeholder="registration-fee"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Session Description</span>
            </label>
            <textarea
              name="description"
              placeholder="Description"
              className="textarea textarea-bordered"
            ></textarea>
          </div>

          <div className="form-control mt-6 md:col-span-2">
            {loading ? (
              <button className="btn btn-primary bg-blue-500 hover:bg-blue-600  font-semibold text-white text-lg w-full">
                <span className="loading loading-spinner"></span>
              </button>
            ) : (
              <button className="btn btn-primary bg-blue-500 hover:bg-blue-600  font-semibold text-white text-lg">
                Create{" "}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateStudy;
