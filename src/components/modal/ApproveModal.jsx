import React, { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ApproveModal = ({ onClose, approve, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const [isPaid, setIsPaid] = useState(false);
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { data } = await axiosSecure.patch(
      `/approve-session/${approve._id}`,
      {
        amount: parseInt(amount),
        status: "Approved",
      }
    );
    if (data.modifiedCount > 0) {
      Swal.fire({
        title: "Session Approved",
        text: "Pending session is Approved.",
        icon: "success",
      });
      onClose();
      refetch();
    }
    setLoading(false);
    console.log(data);
  };

  return (
    <dialog id="upload_material_modal" className="modal">
      <form
        method="dialog"
        className="modal-box w-11/12 max-w-5xl p-6 space-y-4 rounded-lg shadow-lg"
        onSubmit={handleSubmit}
      >
        <button
          type="button"
          className="btn btn-sm btn-circle absolute right-2 top-2"
          onClick={onClose}
        >
          ✕
        </button>
        <h3 className="text-center text-xl font-bold">Upload Your Material</h3>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Session Type</span>
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="sessionType"
                value="free"
                checked={!isPaid}
                onChange={() => {
                  setIsPaid(false);
                  setAmount(0);
                }}
              />
              Free
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="sessionType"
                value="paid"
                checked={isPaid}
                onChange={() => setIsPaid(true)}
              />
              Paid
            </label>
          </div>
        </div>
        {isPaid && (
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Session Fee</span>
            </label>
            <input
              type="number"
              onChange={(e) => setAmount(e.target.value)}
              className="input input-bordered w-full"
              required
            />
          </div>
        )}

        <div className="form-control mt-4">
          {loading ? (
            <button className="btn btn-primary w-full bg-blue-500 hover:bg-blue-600  font-semibold text-white text-lg">
              <span className="loading loading-spinner"></span>
            </button>
          ) : (
            <button
              type="submit"
              className="btn btn-primary w-full bg-blue-500 hover:bg-blue-600  font-semibold text-white text-lg"
            >
              Approve Session
            </button>
          )}
        </div>
      </form>
    </dialog>
  );
};

export default ApproveModal;
