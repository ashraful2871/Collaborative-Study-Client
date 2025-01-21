import React, { useState } from "react";
import { FaEdit, FaTrashRestoreAlt } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ApprovedSessionTableRow = ({ session, idx, refetch }) => {
  const [openModal, setOpenModal] = useState(false);
  const [status, setStatus] = useState(session.status);
  const axiosSecure = useAxiosSecure();

  const handleViewModal = () => {
    console.log("modal");
    setOpenModal(true);
  };

  //update status by admin
  const handleUpdateStatus = async (id, status) => {
    const { data } = await axiosSecure.patch(`/change-status/${id}`, {
      status: status,
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
  };

  return (
    <>
      <tr>
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
                className="btn btn-error bg-red-500 hover:bg-red-600  font-semibold text-white text-lg"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button
                onClick={() => handleUpdateStatus(session._id, status)}
                type="button"
                className="btn btn-primary bg-blue-500 hover:bg-blue-600  font-semibold text-white text-lg"
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
