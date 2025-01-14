import React from "react";

const StudySessionCard = () => {
  return (
    <div className="card bg-white shadow-md rounded-lg max-w-md mx-auto border border-gray-300">
      <figure>
        <img
          src="https://i.ibb.co/Y8d5CjQ/advanced-english-course.jpg"
          alt="Advanced English Communication"
          className="rounded-t-lg"
        />
      </figure>
      <div className="card-body p-4">
        <h2 className="text-xl font-bold text-gray-800">
          Advanced English Communication
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          This course is designed to enhance students' proficiency in English,
          focusing on advanced communication skills for academic, professional,
          and social contexts. It covers complex grammar structures,
        </p>

        <div className="mt-4">
          <p className="text-sm">
            <span className="font-semibold text-gray-800">
              Registration Start Time:
            </span>{" "}
            <span className="text-orange-500">2025-01-10</span>
          </p>
          <p className="text-sm">
            <span className="font-semibold text-gray-800">
              Registration End Time:
            </span>{" "}
            <span className="text-orange-500">2025-01-30</span>
          </p>
          <p className="text-sm">
            <span className="font-semibold text-gray-800">
              Class Start Time:
            </span>{" "}
            <span className="text-orange-500">07:00</span>
          </p>
          <p className="text-sm">
            <span className="font-semibold text-gray-800">Class End Time:</span>{" "}
            <span className="text-orange-500">10:00</span>
          </p>
          <p className="text-sm">
            <span className="font-semibold text-gray-800">
              Session Duration:
            </span>{" "}
            <span className="text-orange-500">3 hours and 0 minutes</span>
          </p>
          <p className="text-sm">
            <span className="font-semibold text-gray-800">Fee:</span>{" "}
            <span className="text-green-500">$100</span>
          </p>
        </div>

        <div className="mt-4">
          <span className="text-sm font-semibold text-green-500">
            Your study session request has been success.
          </span>
        </div>

        <div className="mt-2">
          <span className="badge badge-success">Status: success</span>
        </div>
      </div>
    </div>
  );
};

export default StudySessionCard;
