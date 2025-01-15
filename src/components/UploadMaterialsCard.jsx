import React, { useState, useEffect } from "react";
import UploadMaterialModal from "./modal/UploadMaterialModal";

const UploadMaterialsCard = ({ material }) => {
  const [selectedMaterial, setSelectedMaterial] = useState(null);

  useEffect(() => {
    if (selectedMaterial) {
      const modal = document.getElementById("upload_material_modal");
      if (modal) {
        modal.showModal();
      }
    }
  }, [selectedMaterial]);

  const openModal = () => {
    setSelectedMaterial(material);
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
          onClose={() => setSelectedMaterial(null)}
        />
      )}
    </div>
  );
};

export default UploadMaterialsCard;
