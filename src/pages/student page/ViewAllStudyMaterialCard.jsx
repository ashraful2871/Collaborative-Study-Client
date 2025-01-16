import React from "react";
import { Link } from "react-router-dom";

const ViewAllStudyMaterialCard = ({ material }) => {
  const {
    bookingImage,
    sessionTitle,
    materialImage,
    materialId,
    tutorEmail,
    driveLink,
  } = material;
  return (
    <div>
      <div className="card  bg-white shadow-xl border rounded-lg overflow-hidden">
        {/* Image Section */}
        <img
          src={bookingImage}
          alt="Study Session"
          className="w-full h-48 object-cover"
        />

        {/* Card Body */}
        <div className="p-4">
          <h2 className="card-title">{sessionTitle}</h2>
          {/* Study Session Material ID */}
          {/* <p className="text-gray-700 text-sm mb-2">
            <span className="font-semibold">
              Study Session Material Id:{materialId}
            </span>{" "}
          </p> */}

          {/* Material Link */}
          {/* <Link target="_blank" className="btn-link">
            <span className="font-semibold">Material Link</span>{" "}
          </Link> */}
          {/* <p className="text-gray-700 text-sm my-3">
            <span className="font-semibold">{tutorEmail}</span>{" "}
          </p> */}

          {/* Buttons */}
          <div className="flex justify-between mt-2 borders">
            <button className="btn btn-primary ">View Material</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAllStudyMaterialCard;
