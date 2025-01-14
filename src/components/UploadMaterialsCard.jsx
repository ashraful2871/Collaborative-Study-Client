import React from "react";
import UploadMaterialModal from "./modal/UploadMaterialModal";

const UploadMaterialsCard = ({ material }) => {
  const { image, status, sessionTitle, _id } = material;
  return (
    <div className="card w-full bg-base-100 shadow-xl">
      {/* Card Image */}
      <figure>
        <img src={image} alt="Study Session" className="rounded-t-xl" />
      </figure>

      {/* Card Body */}
      <div className="card-body">
        {/* Status */}
        <span className="badge badge-success">{status}</span>

        {/* Title */}
        <h2 className="card-title">{sessionTitle}</h2>

        {/* Upload Button */}
        <div className="card-actions justify-start">
          <UploadMaterialModal
            sessionTitle={sessionTitle}
            _id={_id}
          ></UploadMaterialModal>
        </div>
      </div>
    </div>
  );
};

export default UploadMaterialsCard;
