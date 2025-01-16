import React from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import Loading from "../Loading";

const SessionDetails = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { id } = useParams();
  const { data: session = {}, isLoading } = useQuery({
    queryKey: ["/session-details/:id"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/session-details/${id}`);
      return data;
    },
  });
  console.log(session);
  const {
    image,
    sessionTitle,
    description,
    classStart,
    classEnd,
    duration,
    tutor,
    registrationFee,
    registrationStart,
    registrationEnd,
  } = session;

  const start = new Date(registrationStart);
  const end = new Date(registrationEnd);

  const status =
    new Date() >= start && new Date() <= end ? "Ongoing" : "Closed";

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div className="card bg-base-100 shadow-lg p-5 space-y-4">
      {/* Image Section */}
      <div className="w-full mb-5">
        <img
          src={image}
          alt={sessionTitle}
          className="w-full h-[500px] object-cover  rounded-lg"
        />
      </div>

      {/* Title and Description */}
      <h1 className="text-2xl font-bold mb-3">{sessionTitle}</h1>
      <p className="text-gray-600 mb-5">{description}</p>

      {/* Details Section */}
      <div className="grid grid-cols-2 gap-4 space-y-4">
        {/* Column 1 */}
        <div className="space-y-4">
          <p className="font-semibold">
            Student Name:{" "}
            <span className="font-normal">{user?.displayName}</span>
          </p>
          <p className="font-semibold">
            Student Email: <span className="font-normal">{user?.email}</span>
          </p>
          <p className="font-semibold">
            Class Start Time: <span className="font-normal">{classStart}</span>
          </p>
          <p className="font-semibold">
            Session Duration:{" "}
            <span className="font-normal">
              {duration.hour} hour {duration.minute} min
            </span>
          </p>
        </div>

        {/* Column 2 */}
        <div className="space-y-4">
          <p className="font-semibold">
            Tutor Name: <span className="font-normal">{tutor?.name}</span>
          </p>
          <p className="font-semibold">
            Tutor Email: <span className="font-normal">{tutor?.email}</span>
          </p>
          <p className="font-semibold">
            Class End Time: <span className="font-normal">{classEnd}</span>
          </p>
          <p className="font-semibold">
            Registration fee:{" "}
            <span className="font-normal">${registrationFee}</span>
          </p>
        </div>
      </div>

      <div className="card-actions justify-center ">
        {status === "Closed" ? (
          <button disabled className="btn btn-primary text-red-500">
            Registration Closed
          </button>
        ) : (
          <button className="btn btn-primary">Book Now</button>
        )}
      </div>
    </div>
  );
};

export default SessionDetails;
