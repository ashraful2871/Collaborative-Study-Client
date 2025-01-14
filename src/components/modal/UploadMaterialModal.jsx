import React from "react";
import useAuth from "../../hooks/useAuth";

const UploadMaterialModal = ({ sessionTitle, _id }) => {
  const { user } = useAuth();
  return (
    <div>
      {/* Button to open the modal */}
      <button
        className="btn btn-primary"
        onClick={() =>
          document.getElementById("upload_material_modal").showModal()
        }
      >
        Upload Material
      </button>

      {/* Modal */}
      <dialog id="upload_material_modal" className="modal">
        <form
          method="dialog"
          className="modal-box w-11/12 max-w-5xl p-6 space-y-4 bg-white rounded-lg shadow-lg"
          onSubmit={(e) => {
            e.preventDefault();
            // Handle form submission here
          }}
        >
          {/* Close Button */}
          <button
            type="button"
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={() =>
              document.getElementById("upload_material_modal").close()
            }
          >
            ✕
          </button>
          {/* Session Info */}
          <div className="space-y-1 text-sm">
            <p>
              <strong>Session Name:</strong>{" "}
              <span className="text-blue-600">{sessionTitle}</span>
            </p>
            <p>
              <strong>Session ID:</strong> {_id}
            </p>
            <p>
              <strong>Tutor Email:</strong> {user?.email}
            </p>
          </div>
          {/* Modal Title */}
          <h3 className="text-center text-xl font-bold">
            Upload Your Material
          </h3>

          {/* Material Image Upload */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Material Image:</span>
            </label>
            <input
              type="file"
              name="material-image"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Google Drive Link */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Google Drive Link:</span>
            </label>
            <input
              type="url"
              name="google-drive-link"
              placeholder="Google Drive Link"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="form-control mt-4">
            <button type="submit" className="btn btn-primary w-full">
              Upload Material
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
};

export default UploadMaterialModal;
