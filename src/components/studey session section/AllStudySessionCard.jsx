import React from "react";
import { Link } from "react-router-dom";

const AllStudySessionCard = ({ study }) => {
  const {
    sessionTitle,
    description,
    image,
    registrationEnd,
    registrationStart,
    _id,
  } = study;

  const start = new Date(registrationStart);
  const end = new Date(registrationEnd);

  const status =
    new Date() >= start && new Date() <= end ? "Ongoing" : "Closed";

  return (
    <div className="flex flex-col h-full">
      <div className="card bg-base-100 shadow-xl flex flex-col h-full">
        <figure>
          <img
            src={image}
            className="w-full h-48 object-cover"
            alt={sessionTitle}
          />
        </figure>
        <div className="card-body flex flex-col flex-grow">
          <h2 className="card-title">{sessionTitle}</h2>
          <div className="font-semibold space-y-2 mb-2 flex-grow">
            <p>{description}</p>
            <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-sm font-bold shadow-md transition-colors">
              <span
                className={`h-2 w-2 rounded-full ${
                  status === "Ongoing" ? "bg-green-500" : "bg-red-500"
                }`}
              ></span>
              <span
                className={`${
                  status === "Ongoing" ? "text-green-600" : "text-red-600"
                }`}
              >
                {status}
              </span>
            </div>
          </div>
          <div className="card-actions justify-end mt-auto">
            <Link to={`/session-details/${_id}`}>
              {" "}
              <button className="btn btn-primary ">Read More</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllStudySessionCard;
