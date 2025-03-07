import React, { useState } from "react";
import { FaEdit, FaTrashRestoreAlt } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const ApprovedSessionTableRow = ({ session, idx, refetch }) => {
  const [openModal, setOpenModal] = useState(false);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [reason, setReason] = useState("");
  const [feedback, setFeedback] = useState("");
  const axiosSecure = useAxiosSecure();
  console.log(reason, feedback);
  const handleViewModal = () => {
    console.log("modal");
    setOpenModal(true);
  };

  //update status by admin
  const handleUpdateStatus = async (id, status, reason, feedback) => {
    if (!status) {
      toast.error("Please select a status before updating.", {
        style: {
          fontWeight: "bold",
        },
      });
      return;
    }
    if (status === "Rejected") {
      if (!reason) {
        toast.error("Please select a rejection reason before updating.", {
          style: {
            fontWeight: "bold",
          },
        });
        return;
      }

      if (!feedback) {
        toast.error("Please input a rejection feedback before updating.", {
          style: {
            fontWeight: "bold",
          },
        });
        return;
      }
    }
    setLoading(true);
    const { data } = await axiosSecure.patch(`/change-status/${id}`, {
      status: status,
      reason,
      feedback,
    });
    if (data.modifiedCount > 0) {
      refetch();
      Swal.fire({
        title: "Updated!",
        text: "Session status has been Updated.",
        icon: "success",
      });
    }
    setOpenModal(false);
    setLoading(false);
    setStatus("");
    setReason("");
    setFeedback("");
  };

  // delete session by admin
  const handleDelete = async (id) => {
    console.log(id);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to change this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await axiosSecure.delete(
          `/delete/admin/session/${id}`
        );
        console.log(data);
        if (data.deletedCount > 0) {
          refetch();
          Swal.fire({
            title: "Delete!",
            text: "Tutor Session has been Deleted.",
            icon: "success",
          });
        }
      }
    });
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setStatus("");
    setReason("");
    setFeedback("");
  };

  return (
    <>
      <tr className="border border-gray-300 text-xs md:text-base">
        <th className="border border-gray-300">{idx + 1}</th>
        <td className="border border-gray-300">
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img src={session.image} alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">{session.sessionTitle}</div>
            </div>
          </div>
        </td>
        <td className="border border-gray-300 text-center">
          {session.tutor.name}
        </td>
        <td className="border border-gray-300 text-center">
          {session.tutor.email}
        </td>
        <td className="flex justify-center">
          <div className="inline-flex items-center px-3 py-1 mt-3 rounded-full gap-x-2 text-sm font-bold shadow-md transition-colors">
            <span className="h-2 w-2 rounded-full bg-green-500"></span>
            <span className="text-green-600">{session.status}</span>
          </div>
        </td>
        <th className="border border-gray-300">
          <div className="flex justify-center gap-4">
            <button
              onClick={handleViewModal}
              className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition-all flex gap-1 items-center shadow-md disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
              <FaEdit /> Update
            </button>
            <button
              onClick={() => handleDelete(session._id)}
              className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-all flex gap-1 items-center shadow-md disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
              <FaTrashRestoreAlt /> Delete
            </button>
          </div>
        </th>
      </tr>

      {openModal && (
        <dialog
          id="upload_material_modal"
          className="modal fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          open
          onClose={handleCloseModal}
        >
          <div className="modal-box border-2 p-6 space-y-6 bg-base-200 rounded-lg w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
            <h3 className="text-center text-2xl font-bold text-blue-500">
              Update Approved Status
            </h3>

            <div className="flex flex-col items-center justify-center w-full">
              <select
                onChange={(e) => setStatus(e.target.value)}
                value={status}
                className="select select-bordered w-full max-w-xs"
                required
              >
                <option value="" disabled>
                  Select Status
                </option>
                <option>Pending</option>
                <option>Rejected</option>
              </select>

              {status === "Rejected" && (
                <div className="w-full flex flex-col items-center">
                  <div className="w-full max-w-xs">
                    <label className="label">
                      <span className="label-text ">Select Reason</span>
                    </label>
                    <select
                      onChange={(e) => setReason(e.target.value)}
                      value={reason}
                      className="select select-bordered w-full max-w-xs"
                      required
                    >
                      <option value="" disabled>
                        Select reason
                      </option>
                      <option value="Spam">Spam</option>
                      <option value="Not Authorized">Not Authorized</option>
                    </select>
                  </div>
                  <div className="w-full max-w-xs">
                    <label className="label">
                      <span className="label-text text-center">Feedback</span>
                    </label>
                    <textarea
                      className="textarea textarea-bordered w-full max-w-xs"
                      placeholder="Feedback"
                      required
                      onChange={(e) => setFeedback(e.target.value)}
                    ></textarea>
                  </div>
                </div>
              )}
            </div>

            <div className="card-actions justify-between">
              <button
                type="button"
                className="btn btn-error bg-red-500 hover:bg-red-600  font-semibold text-white text-lg"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              {loading ? (
                <button
                  type="button"
                  className="btn btn-primary bg-blue-500 hover:bg-blue-600  font-semibold text-white text-lg"
                >
                  <span className="loading loading-spinner"></span>
                </button>
              ) : (
                <button
                  onClick={() =>
                    handleUpdateStatus(session._id, status, reason, feedback)
                  }
                  type="button"
                  className="btn btn-primary bg-blue-500 hover:bg-blue-600  font-semibold text-white text-lg"
                >
                  Update
                </button>
              )}
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};

export default ApprovedSessionTableRow;
