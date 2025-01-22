import React from "react";
import { LuGitPullRequestArrow } from "react-icons/lu";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";

const StudySessionCard = ({ study, refetch }) => {
  const axiosSecure = useAxiosSecure();
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
    reason,
    feedback,
    _id,
  } = study;
  const handleRequestSend = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to change this status!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Send it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await axiosSecure.patch(
          `change-study-status/tutor/${id}`,
          {
            status: "Pending",
          }
        );
        console.log(data);
        if (data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            title: "success!",
            text: "Your Request has been Sent Successfully.",
            icon: "success",
          });
        }
      }
    });
  };
  return (
    <div className="card bg-white shadow-md rounded-lg max-w-md mx-auto border border-gray-300">
      <figure>
        <img
          src={image}
          alt="Advanced English Communication"
          className="rounded-t-lg w-96 h-56"
        />
      </figure>
      <div className="card-body p-4">
        <div className="flex items-center gap-3">
          <div>
            <h2 className="text-xl font-bold text-gray-800">{sessionTitle}</h2>
          </div>
          <div className="mt-2">
            {status === "Pending" && (
              <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-sm font-bold shadow-md transition-colors  mb-2">
                <span className="h-2 w-2 rounded-full bg-yellow-500"></span>
                <span className="text-yellow-600">{status}</span>
              </div>
            )}
            {status === "Success" && (
              <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-sm font-bold shadow-md transition-colors  mb-2">
                <span className="h-2 w-2 rounded-full bg-green-500"></span>
                <span className="text-green-600">{status}</span>
              </div>
            )}
            {status === "Rejected" && (
              <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-sm font-bold shadow-md transition-colors mb-2 border-2">
                <span className="h-2 w-2 rounded-full bg-red-500"></span>
                <span className="text-red-600">{status}</span>
              </div>
            )}
          </div>
        </div>
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
          {status === "Approved" && (
            <span className="text-sm font-semibold text-green-500">
              Your study session request has been Approved.
            </span>
          )}

          {status === "Rejected" && (
            <div>
              <span className="text-sm font-semibold text-red-500">
                Your study session request has been Rejected.
              </span>
              <p className="font-semibold text-red-500">
                <small>Reason: {reason}</small>
              </p>
              <p className="font-semibold text-red-500">
                <small>Feedback: {feedback}</small>
              </p>
            </div>
          )}
        </div>
        <div className="flex justify-between items-center mt-3">
          {status === "Rejected" && (
            <div>
              <button
                //disabled={booking.status === "Canceled"}
                onClick={() => handleRequestSend(_id)}
                className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600 transition-all flex gap-1 items-center shadow-md font-semibold"
              >
                <LuGitPullRequestArrow className="font-semibold" /> Send Request
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudySessionCard;
