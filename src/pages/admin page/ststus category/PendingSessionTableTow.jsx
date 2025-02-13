import React, { useEffect, useState } from "react";
import { FaTrashRestoreAlt } from "react-icons/fa";
import { FcApproval } from "react-icons/fc";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PendingSessionTableTow = ({
  idx,
  session,
  approve,
  setApprove,
  refetch,
}) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    if (approve) {
      const modal = document.getElementById("upload_material_modal");
      if (modal) {
        modal.showModal();
      }
    }
  }, [approve]);

  const openModal = (session) => {
    console.log(session);
    setApprove(session);
  };
  const handleViewModal = () => {
    setIsOpenModal(true);
  };

  //handle reject status and give feedback
  const handleReject = async (e, id) => {
    e.preventDefault();
    console.log(id);
    const formData = new FormData(e.target);
    const reason = formData.get("reason");
    const feedback = formData.get("feedback");
    const rejectedData = { reason, feedback, status: "Rejected" };
    console.log(rejectedData);
    const { data } = await axiosSecure.patch(`/change-status/${id}`, {
      reason,
      feedback,
      status: "Rejected",
    });
    console.log(data);
    setIsOpenModal(false);
    refetch();
    if (data.modifiedCount > 0) {
      Swal.fire({
        title: "Reject!",
        text: "Tutor status has been Rejected.",
        icon: "success",
      });
    }
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  return (
    <>
      <tr className="border border-gray-300">
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

        <td className="text-center border border-gray-300">
          {session.tutor.name}
        </td>
        <td className="text-center border border-gray-300">
          {session.tutor.email}
        </td>
        <td className="flex justify-center ">
          <div className="inline-flex items-center px-3 py-1 mt-2 rounded-full gap-x-2 text-sm font-bold shadow-md transition-colors">
            <span className="h-2 w-2 rounded-full bg-yellow-500"></span>
            <span className="text-yellow-600">{session.status}</span>
          </div>
        </td>
        <th className="border border-gray-300">
          <div className="flex justify-center gap-4">
            <button
              onClick={() => openModal(session)}
              className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition-all flex gap-1 items-center shadow-md disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
              <FcApproval /> Approve
            </button>
            <button
              type="button"
              onClick={handleViewModal}
              className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-all flex gap-1 items-center shadow-md disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
              <FaTrashRestoreAlt /> Reject
            </button>
          </div>
        </th>
      </tr>

      {isOpenModal && (
        <dialog
          id="upload_material_modal"
          className="modal"
          open
          onClose={handleCloseModal}
        >
          <div
            method="dialog"
            className="modal-box border-2 p-6 space-y-6 bg-base-100 rounded-lg"
            style={{ width: "600px", maxWidth: "90%" }}
          >
            <button
              type="button"
              className="btn btn-sm btn-circle absolute right-2 top-2"
              onClick={handleCloseModal}
            >
              ✕
            </button>
            <h3 className="text-center text-2xl font-bold text-blue-500">
              Select <span className="text-red-500">Rejection</span> Reason
            </h3>
            <div className="flex justify-center">
              <div className="card bg-base-100 w-full  shrink-0 ">
                <form
                  onSubmit={(e) => handleReject(e, session._id)}
                  className="card-body"
                >
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Select Reason</span>
                    </label>
                    <select
                      name="reason"
                      // onChange={(e) => setReason(e.target.value)}
                      required
                      className="select select-bordered w-full"
                    >
                      <option disabled selected>
                        select reason
                      </option>
                      <option>Spam</option>
                      <option>Not Authorized</option>
                    </select>
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Feedback</span>
                    </label>
                    <textarea
                      name="feedback"
                      className="textarea textarea-bordered"
                      placeholder="Feedback"
                    ></textarea>
                  </div>
                  <div className="form-control mt-6">
                    <button className="btn btn-primary">Sent Feedback</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};

export default PendingSessionTableTow;
