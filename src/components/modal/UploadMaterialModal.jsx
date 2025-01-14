import React from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_upload_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UploadMaterialModal = ({ material, onClose }) => {
  const { sessionTitle, _id } = material;
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const handleSubmit = async (e) => {
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
    console.log(data);
    onClose(); // Close modal after submission
  };

  return (
    <dialog id="upload_material_modal" className="modal">
      <form
        method="dialog"
        className="modal-box w-11/12 max-w-5xl p-6 space-y-4 bg-white rounded-lg shadow-lg"
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
          <button type="submit" className="btn btn-primary w-full">
            Upload Material
          </button>
        </div>
      </form>
    </dialog>
  );
};

export default UploadMaterialModal;
