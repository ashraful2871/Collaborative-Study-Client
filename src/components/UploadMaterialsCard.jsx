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
      <figure>
        <img
          src={material.image}
          alt="Study Session"
          className="rounded-t-xl w-96 h-48"
        />
      </figure>

      <div className="card-body">
        <span className="badge badge-success">{material.status}</span>

        <h2 className="card-title flex-grow">{material.sessionTitle}</h2>

        <div className="card-actions justify-start">
          <button
            className="btn btn-primary bg-blue-500 hover:bg-blue-600  font-semibold text-white"
            onClick={openModal}
          >
            Upload Material
          </button>
        </div>
      </div>

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
