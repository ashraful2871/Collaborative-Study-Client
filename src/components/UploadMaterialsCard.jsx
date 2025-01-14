import React, { useState, useEffect } from "react";
import UploadMaterialModal from "./modal/UploadMaterialModal";

const UploadMaterialsCard = ({ material }) => {
  const [selectedMaterial, setSelectedMaterial] = useState(null);

  useEffect(() => {
    // Show the modal after it has been rendered
    if (selectedMaterial) {
      const modal = document.getElementById("upload_material_modal");
      if (modal) {
        modal.showModal();
      }
    }
  }, [selectedMaterial]); // Trigger effect whenever `selectedMaterial` changes

  const openModal = () => {
    setSelectedMaterial(material); // Pass the current material to the modal
  };

  return (
    <div className="card w-full bg-base-100 shadow-xl">
      {/* Card Image */}
      <figure>
        <img
          src={material.image}
          alt="Study Session"
          className="rounded-t-xl"
        />
      </figure>

      {/* Card Body */}
      <div className="card-body">
        {/* Status */}
        <span className="badge badge-success">{material.status}</span>

        {/* Title */}
        <h2 className="card-title">{material.sessionTitle}</h2>

        {/* Upload Button */}
        <div className="card-actions justify-start">
          <button className="btn btn-primary" onClick={openModal}>
            Upload Material
          </button>
        </div>
      </div>

      {/* Render Modal */}
      {selectedMaterial && (
        <UploadMaterialModal
          material={selectedMaterial}
          onClose={() => setSelectedMaterial(null)} // Reset state on close
        />
      )}
    </div>
  );
};

export default UploadMaterialsCard;
