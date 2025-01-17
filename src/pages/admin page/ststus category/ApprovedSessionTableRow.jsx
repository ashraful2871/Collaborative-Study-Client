import React, { useState } from "react";
import { FaEdit, FaTrashRestoreAlt } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const ApprovedSessionTableRow = ({ session, idx, refetch }) => {
  const [openModal, setOpenModal] = useState(false);
  const [status, setStatus] = useState(session.status);
  const axiosSecure = useAxiosSecure();

  const handleViewModal = () => {
    setOpenModal(true);
  };

  const handleUpdateStatus = async (id, status) => {
    const { data } = await axiosSecure.patch(`/change-status/${id}`, {
      status: status,
    });
    console.log(data);
    if (data.modifiedCount > 0) {
      refetch();
      Swal.fire({
        title: "Updated!",
        text: "Session status has been Updated.",
        icon: "success",
      });
    }
    setOpenModal(false);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <tr className="border-2 border-red-500">
        <th>{idx + 1}</th>
        <td>
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
        <td>{session.tutor.name}</td>
        <td> {session.tutor.email}</td>
        <td>
          <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-sm font-bold shadow-md transition-colors">
            <span className="h-2 w-2 rounded-full bg-green-500"></span>
            <span className="text-green-600">{session.status}</span>
          </div>
        </td>
        <th>
          <div className="flex justify-center gap-4">
            <button
              onClick={handleViewModal}
              className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition-all flex gap-1 items-center shadow-md disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
              <FaEdit /> Update
            </button>
            <button className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-all flex gap-1 items-center shadow-md disabled:bg-gray-500 disabled:cursor-not-allowed">
              <FaTrashRestoreAlt /> Delete
            </button>
          </div>
        </th>
      </tr>
      {openModal && (
        <dialog
          id="upload_material_modal"
          className="modal"
          open
          onClose={handleCloseModal}
        >
          <div
            method="dialog"
            className="modal-box border-2 p-6 space-y-6 bg-base-200 rounded-lg"
            style={{ width: "600px", maxWidth: "90%" }}
          >
            <h3 className="text-center text-2xl font-bold text-blue-500">
              Update Approved Status
            </h3>

            <div className="flex justify-center">
              <select
                onChange={(e) => setStatus(e.target.value)}
                defaultValue={session.status}
                className="select select-bordered w-full max-w-xs"
              >
                <option>Approved</option>
                <option>Pending</option>
                <option>Rejected</option>
              </select>
            </div>
            <div className="card-actions justify-between">
              <button
                type="button"
                className="btn btn-error "
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button
                onClick={() => handleUpdateStatus(session._id, status)}
                type="button"
                className="btn btn-primary"
              >
                Update
              </button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};

export default ApprovedSessionTableRow;
