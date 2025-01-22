import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import Loading from "../Loading";
import useRole from "../../hooks/useRole";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import toast from "react-hot-toast";

const SessionDetails = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { id } = useParams();
  const [role] = useRole();
  const navigate = useNavigate();
  const { data: session = {}, isLoading } = useQuery({
    queryKey: ["session-details", id],
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
    _id,
    reviews,
  } = session;

  //check is registration time is over
  const start = new Date(registrationStart);
  const end = new Date(registrationEnd);
  const status =
    new Date() >= start && new Date() <= end ? "Ongoing" : "Closed";

  //calculate average rating
  const averageRating =
    reviews?.length > 0
      ? reviews.reduce((sum, review) => sum + Number(review.rating), 0)
      : 0;

  //booked now
  const bookedSessionData = {
    image,
    sessionTitle,
    description,
    classStart,
    classEnd,
    duration,
    tutor,
    registrationFee,
    sessionId: _id,
    studentEmail: user?.email,
    studentName: user?.displayName,
  };
  const handleBookedNow = async () => {
    const { data } = await axiosSecure.post("/book-session", bookedSessionData);
    // console.log(data);
    toast.success("Registration Successfully");
    navigate("/dashboard/view-book-session");
  };

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
          className="w-full md:h-[500px] object-cover  rounded-lg"
        />
      </div>

      {/* Title and Description */}
      <h1 className="text-2xl font-bold mb-3">{sessionTitle}</h1>
      <p className="text-gray-600 mb-5">{description}</p>

      {/* Details Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 space-y-4">
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
          <p className="font-semibold flex gap-2 items-center">
            Average Rating:{" "}
            <span className="font-normal flex gap-2 items-center">
              <Rating
                style={{ maxWidth: 100 }}
                value={averageRating}
                readOnly
              />{" "}
              ({averageRating})
            </span>
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-center font-semibold text-3xl text-blue-500">
          Reviews
        </h2>

        {reviews.length > 0 ? (
          <div className="flex justify-center mt-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5 w-full max-w-4xl rounded-lg">
              {reviews?.map((review) => (
                <div
                  key={review._id}
                  className="flex items-start gap-4 border-b-2 pb-4 mb-4"
                >
                  {/* User Avatar */}
                  <img
                    className="rounded-full h-12 w-12"
                    referrerPolicy="no-referrer"
                    src={review.photo}
                    alt={`${review.name}'s avatar`}
                  />

                  {/* Review Details */}
                  <div>
                    <div className="font-bold text-lg">{review.name}</div>
                    <p className="text-base flex gap-2 items-center">
                      Rating:{" "}
                      <Rating
                        style={{ maxWidth: 100 }}
                        value={review.rating}
                        readOnly
                      />{" "}
                      ({review.rating})
                    </p>
                    <p className="text-base">Review: {review.review}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <h2 className="text-center my-8 text-2xl font-semibold text-red-500">
            no review available now
          </h2>
        )}
      </div>

      <div className="card-actions justify-center ">
        {status === "Closed" ? (
          <button disabled className="btn btn-primary text-red-500">
            Registration Closed
          </button>
        ) : role === "admin" || role === "tutor" ? (
          <button disabled className="btn btn-primary">
            Book Now
          </button>
        ) : registrationFee > 0 ? (
          <Link to={`/payment/${_id}`}>
            {" "}
            <button className="btn btn-primary bg-blue-500 hover:bg-blue-600  font-semibold text-white text-lg">
              Book Now
            </button>
          </Link>
        ) : (
          <button
            onClick={handleBookedNow}
            className="btn btn-primary bg-blue-500 hover:bg-blue-600  font-semibold text-white text-lg"
          >
            Book For Free
          </button>
        )}
      </div>
    </div>
  );
};

export default SessionDetails;
