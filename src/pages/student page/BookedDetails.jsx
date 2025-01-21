import React from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading";
import useAuth from "../../hooks/useAuth";

const BookedDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: bookedData = {}, isLoading } = useQuery({
    queryKey: ["booked-details", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/booked-details/${id}`);
      return data;
    },
  });
  console.log(bookedData);
  const {
    image,
    sessionTitle,
    description,
    classStart,
    classEnd,
    duration,
    tutor,
    studentEmail,
    studentName,
    sessionId,
  } = bookedData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const rating = formData.get("rating");
    const review = formData.get("review");
    const photo = user?.photoURL;

    const reviewData = { name, email, photo, rating, review, sessionId };
    console.log(reviewData);

    const { data } = await axiosSecure.post("/reviews", reviewData);
    console.log(data);
  };

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div>
      <div className="min-h-screen bg-base-100 p-5">
        {/* Header Section */}
        <div className="text-center mb-10 ">
          <div>
            <h1 className="text-3xl font-bold">
              <span className="text-black">View Your </span>
              <span className="text-primary">Booked Study Session Details</span>
            </h1>
            <p className="text-gray-600 mt-3">
              Feeling overwhelmed by upcoming exams and projects? Juggling a
              busy schedule can make it tough to keep track of your booked study
              sessions. This guide is here to help! Designed specifically for
              students, it will show you how to easily view and manage all your
              booked study sessions, ensuring you stay on top of your academic
              commitments.
            </p>
          </div>
          <div className="flex justify-center items-center mt-5">
            <span className="animate-pulse h-3 w-3 bg-primary rounded-full mx-1"></span>
            <span className="animate-pulse h-3 w-3 bg-primary rounded-full mx-1"></span>
            <span className="animate-pulse h-3 w-3 bg-primary rounded-full mx-1"></span>
          </div>
        </div>

        <div className="card bg-base-100 shadow-md md:p-5 mb-10">
          <figure className="mb-5">
            <img
              src={image}
              alt="Course"
              className="rounded-lg md:mx-auto w-full lg:h-[800px]"
            />
          </figure>

          <div className="card-body">
            <h2 className="card-title text-primary text-center">
              {sessionTitle}
            </h2>
            <p className="text-gray-700 mb-5">{description}</p>
            <div className="grid md:grid-cols-2 gap-4">
              <p>
                <strong>Student Name: </strong> {studentName}
              </p>
              <p>
                <strong>Student Email: </strong>
                {studentEmail}
              </p>
              <p>
                <strong>Tutor Name: </strong> {tutor.name}
              </p>
              <p>
                <strong>Tutor Email:</strong> {tutor.email}
              </p>
              <p>
                <strong>Class Start Time: </strong> {classStart}
              </p>
              <p>
                <strong>Class End Time: </strong> {classEnd}
              </p>
              <p>
                <strong>Session Duration:</strong> {duration.hour} hours and{" "}
                {duration.minute} minutes
              </p>
            </div>
          </div>
        </div>

        {/* Review and Rating Form */}
        <div className="card bg-base-100 shadow-md p-5">
          <h3 className="text-xl font-bold text-center text-primary mb-5">
            Please Provide Your Review & Rating
          </h3>
          <p className="text-gray-600 text-center mb-8">
            Feeling overwhelmed by upcoming exams and projects? Juggling a busy
            schedule can make it tough to keep track of your booked study
            sessions. This guide is here to help!
          </p>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-4 max-w-lg mx-auto w-full "
          >
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-semibold">
                  Name:
                </span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Student Name"
                className="input input-bordered w-full bg-base-200"
                defaultValue={user?.displayName}
                readOnly
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-semibold">
                  Email:
                </span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Student Email"
                className="input input-bordered w-full bg-base-200"
                defaultValue={user?.email}
                readOnly
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-semibold">
                  Rating:
                </span>
              </label>
              <input
                type="number"
                name="rating"
                placeholder="Your Rating (out of 5)"
                className="input input-bordered w-full bg-base-200"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-semibold">
                  Review:
                </span>
              </label>
              <textarea
                placeholder="Your Review"
                name="review"
                className="textarea textarea-bordered w-full h-24 bg-base-200"
                required
              ></textarea>
            </div>
            <button className="btn btn-primary mt-4 bg-blue-500 hover:bg-blue-600  font-semibold text-white text-lg ">
              Send Review & Rating
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookedDetails;
