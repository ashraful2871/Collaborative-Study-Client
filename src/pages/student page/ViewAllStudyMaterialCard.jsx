import React, { useState } from "react";
import { Link } from "react-router-dom";

const ViewAllStudyMaterialCard = ({ material }) => {
  const [openModal, setOpenModal] = useState(false);
  const { bookingImage, sessionTitle, materialImage, materialId, driveLink } =
    material;

  const handleViewModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleDownloadImage = async () => {
    try {
      const response = await fetch(materialImage, {
        mode: "cors",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch the image");
      }
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "StudyMaterial.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading the image:", error);
    }
  };

  return (
    <div>
      <div className="card bg-white shadow-xl border rounded-lg overflow-hidden">
        <img
          src={bookingImage}
          alt="Study Session"
          className="w-full h-48 object-cover"
        />

        <div className="p-4">
          <h2 className="card-title">{sessionTitle}</h2>

          <div className="flex justify-between mt-2">
            <button className="btn btn-primary" onClick={handleViewModal}>
              View Material
            </button>
          </div>
        </div>
      </div>

      {openModal && (
        <dialog
          id="upload_material_modal"
          className="modal"
          open
          onClose={handleCloseModal}
        >
          <div
            method="dialog"
            className="modal-box border-2 p-6 space-y-6 bg-base-200 rounded-lg"
            style={{ width: "600px", maxWidth: "90%" }}
          >
            <button
              type="button"
              className="btn btn-sm btn-circle absolute right-2 top-2"
              onClick={handleCloseModal}
            >
              ✕
            </button>
            <h3 className="text-center text-2xl font-bold text-blue-500">
              Get your Material Provide by Tutor
            </h3>

            <div className="flex justify-center">
              <div className="card w-96 bg-white space-y-5 border rounded-lg overflow-hidden">
                <img
                  src={materialImage}
                  alt="Study Material"
                  className="w-full h-48 object-cover"
                />

                <div className="p-4 space-y-3">
                  <p>
                    <span>study Session ID: {materialId}</span>
                  </p>
                  <Link target="_blank" to={driveLink} className="btn-link">
                    <span className="font-semibold">Material Link</span>{" "}
                  </Link>
                  <div>
                    <button
                      onClick={handleDownloadImage}
                      className="btn btn-sm bg-blue-500 hover:bg-blue-600 font-bold text-white"
                    >
                      Download Image
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ViewAllStudyMaterialCard;
