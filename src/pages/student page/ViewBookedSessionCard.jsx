import React from "react";
import { Link } from "react-router-dom";

const ViewBookedSessionCard = ({ session }) => {
  const { image, sessionTitle, description, tutor, registrationFee, _id } =
    session;
  return (
    <div className="card bg-base-100 shadow-md w-full max-w-lg mx-auto flex flex-col">
      <figure className="h-48 md:h-52 lg:h-64 w-full rounded-xl border">
        <img src={image} alt="Course" className="w-full h-full rounded-xl" />
      </figure>

      <div className="card-body p-5 space-y-3 flex flex-col flex-grow">
        <div className="flex justify-between items-center">
          <span className="text-sm ">Tutor: {tutor?.name}</span>
          <span className="text-lg font-semibold text-blue-500">
            ${registrationFee}
          </span>
        </div>

        <h2 className="card-title text-xl font-bold">{sessionTitle}</h2>

        <p className="text-sm flex-grow line-clamp-3">{description}</p>

        <div className="card-actions">
          <Link to={`/dashboard/booked-details/${_id}`}>
            <button className="btn btn-primary bg-blue-500 hover:bg-blue-600  font-semibold text-white text-lg">
              Read More
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ViewBookedSessionCard;
