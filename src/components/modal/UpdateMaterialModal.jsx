import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import axios from "axios";
import toast from "react-hot-toast";
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_upload_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const UpdateMaterialModal = ({ onClose, materialData, refetch }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const { image, materialId, sessionTitle, tutorEmail, driveLink, _id } =
    materialData;
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData(e.target);
    const image = formData.get("image");
    const driveLink = formData.get("drive-link");

    let imageUrl = materialData.image;
    if (image && image.size > 0) {
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

    const updateMaterialData = {
      sessionTitle,
      materialId,
      image: imageUrl,
      driveLink,
      tutorEmail,
    };

    const { data } = await axiosSecure.put(
      `${import.meta.env.VITE_API_URL}/update-material/${_id}`,
      updateMaterialData
    );
    console.log(data);
    onClose();
    setLoading(false);
    toast.success("update successful");
    refetch();
  };

  return (
    <dialog id="upload_material_modal" className="modal">
      <form
        method="dialog"
        className="modal-box w-11/12 max-w-5xl p-6 space-y-4 e rounded-lg shadow-lg"
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
            defaultValue={materialId}
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
            defaultValue={tutorEmail}
            readOnly
            type="email"
            name="email"
            className="input input-bordered w-full"
          />
        </div>
        {/* Display the current image */}
        <div>
          <label>Current Photo:</label>
          <img src={image} alt="Current material" className="h-12 w-12 mt-5" />
        </div>

        {/* Hidden input for default image URL */}
        <input type="hidden" name="default-image" value={image} />
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Material Image:</span>
          </label>
          <input
            type="file"
            name="image"
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Google Drive Link:</span>
          </label>
          <input
            defaultValue={driveLink}
            type="url"
            name="drive-link"
            placeholder="Google Drive Link"
            className="input input-bordered w-full"
            required
          />
        </div>
        <div className="form-control mt-4">
          {loading ? (
            <button className="btn btn-primary w-full bg-blue-500 hover:bg-blue-600  font-semibold text-white ">
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

export default UpdateMaterialModal;
