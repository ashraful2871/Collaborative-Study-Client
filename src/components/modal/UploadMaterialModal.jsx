import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_upload_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UploadMaterialModal = ({ material, onClose }) => {
  const navigate = useNavigate();
  const { sessionTitle, _id } = material;
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData(e.target);
    const image = formData.get("image");
    const driveLink = formData.get("drive-link");

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
        if (response.data.success) {
          imageUrl = response.data.data.display_url;
        }
      } catch (error) {
        console.error("Image upload failed:", error);
        return;
      }
    }

    const uploadMaterialData = {
      sessionTitle,
      materialId: _id,
      image: imageUrl,
      driveLink,
      tutorEmail: user?.email,
    };

    const { data } = await axiosSecure.post(
      `${import.meta.env.VITE_API_URL}/upload-material`,
      uploadMaterialData
    );
    // console.log(data);
    toast.success("Uploaded Successfully");
    onClose();
    setLoading(false);
    navigate("/dashboard/view-all-materials");
  };

  return (
    <dialog id="upload_material_modal" className="modal">
      <form
        method="dialog"
        className="modal-box w-11/12 max-w-5xl p-6 space-y-4 rounded-lg shadow-lg"
        onSubmit={handleSubmit}
      >
        <button
          type="button"
          className="btn btn-sm btn-circle absolute right-2 top-2"
          onClick={onClose}
        >
          ✕
        </button>
        <h3 className="text-center text-xl font-bold">Upload Your Material</h3>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Session Title</span>
          </label>
          <input
            defaultValue={sessionTitle}
            readOnly
            type="text"
            name="title"
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Study Session ID</span>
          </label>
          <input
            defaultValue={_id}
            readOnly
            type="text"
            name="id"
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Tutor Email</span>
          </label>
          <input
            defaultValue={user?.email}
            readOnly
            type="email"
            name="email"
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Material Image:</span>
          </label>
          <input
            type="file"
            name="image"
            className="input input-bordered w-full"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Google Drive Link:</span>
          </label>
          <input
            type="url"
            name="drive-link"
            placeholder="Google Drive Link"
            className="input input-bordered w-full"
            required
          />
        </div>
        <div className="form-control mt-4">
          {loading ? (
            <button className="btn btn-primary w-full bg-blue-500 hover:bg-blue-600  font-semibold text-white">
              <span className="loading loading-spinner"></span>
            </button>
          ) : (
            <button
              type="submit"
              className="btn btn-primary w-full bg-blue-500 hover:bg-blue-600  font-semibold text-white"
            >
              Upload Material
            </button>
          )}
        </div>
      </form>
    </dialog>
  );
};

export default UploadMaterialModal;
