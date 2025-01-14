import React from "react";
import useAuth from "../../hooks/useAuth";

const CreateStudy = () => {
  const { user } = useAuth();
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const registrationStart = formData.get("registration-start");
    const registrationEnd = formData.get("registration-end");
    const classStart = formData.get("class-start");
    const classEnd = formData.get("class-end");
    const duration = formData.get("duration");
    const registrationFee = formData.get("registration-fee");
    const description = formData.get("description");
    const createData = {
      registrationStart,
      registrationEnd,
      classStart,
      classEnd,
      duration,
      registrationFee,
      description,
      status: "Pending",
    };
    console.log(createData);
  };

  return (
    <div className="my-12">
      <h2 className="text-center text-4xl font-semibold">
        Create Study Session
      </h2>
      <div className="card bg-base-100 w-full shrink-0 shadow-2xl">
        <form
          onSubmit={handleSubmit}
          className="card-body grid grid-cols-2 gap-5"
        >
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              value={user?.displayName}
              readOnly
              type="text"
              name="name"
              placeholder="name"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              value={user?.email}
              readOnly
              type="email"
              name="email"
              placeholder="email"
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Registration start date</span>
            </label>
            <input
              type="date"
              name="registration-start"
              placeholder="Start Date"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Registration end date</span>
            </label>
            <input
              type="date"
              name="registration-end"
              placeholder="End Date"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Class Start date</span>
            </label>
            <input
              type="date"
              name="class-start"
              placeholder="Start Date"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Class End date</span>
            </label>
            <input
              type="date"
              name="class-end"
              placeholder="End Date"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Session duration</span>
            </label>
            <input
              type="text"
              name="duration"
              placeholder="Session duration"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Registration Fee</span>
            </label>
            <input
              value={0}
              type="number"
              name="registration-fee"
              placeholder="registration-fee"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control col-span-2">
            <label className="label">
              <span className="label-text">Session Description</span>
            </label>
            <textarea
              name="description"
              placeholder="Description"
              className="textarea textarea-bordered"
            ></textarea>
          </div>

          <div className="form-control mt-6 col-span-2">
            <button className="btn btn-primary">Create </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateStudy;
