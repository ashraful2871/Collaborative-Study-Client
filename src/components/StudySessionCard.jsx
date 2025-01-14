import React from "react";

const StudySessionCard = ({ study }) => {
  const {
    sessionTitle,
    description,
    image,
    registrationStart,
    registrationEnd,
    classStart,
    classEnd,
    registrationFee,
    duration,
    status,
  } = study;
  return (
    <div className="card bg-white shadow-md rounded-lg max-w-md mx-auto border border-gray-300">
      <figure>
        <img
          src={image}
          alt="Advanced English Communication"
          className="rounded-t-lg"
        />
      </figure>
      <div className="card-body p-4">
        <h2 className="text-xl font-bold text-gray-800">{sessionTitle}</h2>
        <p className="text-sm text-gray-600 mt-2">{description}</p>

        <div className="mt-4">
          <p className="text-sm">
            <span className="font-semibold text-gray-800">
              Registration Start Time:
            </span>{" "}
            <span className="text-orange-500">{registrationStart}</span>
          </p>
          <p className="text-sm">
            <span className="font-semibold text-gray-800">
              Registration End Time:
            </span>{" "}
            <span className="text-orange-500">{registrationEnd}</span>
          </p>
          <p className="text-sm">
            <span className="font-semibold text-gray-800">
              Class Start Time:
            </span>{" "}
            <span className="text-orange-500">{classStart}</span>
          </p>
          <p className="text-sm">
            <span className="font-semibold text-gray-800">Class End Time:</span>{" "}
            <span className="text-orange-500">{classEnd}</span>
          </p>
          <p className="text-sm">
            <span className="font-semibold text-gray-800">
              Session Duration:
            </span>{" "}
            <span className="text-orange-500">
              {duration.hour} hour {duration.minute} minute.
            </span>
          </p>
          <p className="text-sm">
            <span className="font-semibold text-gray-800">Fee:</span>{" "}
            <span className="text-green-500">${registrationFee}</span>
          </p>
        </div>

        <div className="mt-4">
          {status === "Pending" && (
            <span className="text-sm font-semibold text-yellow-500">
              Your study session request has been pending.
            </span>
          )}
          {status === "Success" && (
            <span className="text-sm font-semibold text-green-500">
              Your study session request has been success.
            </span>
          )}

          {status === "Rejected" && (
            <span className="text-sm font-semibold text-red-500">
              Your study session request has been Rejected.
            </span>
          )}
        </div>

        <div className="mt-2">
          {status === "Pending" && (
            <span className="badge badge-warning">Status: {status}</span>
          )}
          {status === "Success" && (
            <span className="badge badge-success">Status: {status}</span>
          )}
          {status === "Rejected" && (
            <span className="badge badge-error">Status: {status}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudySessionCard;
