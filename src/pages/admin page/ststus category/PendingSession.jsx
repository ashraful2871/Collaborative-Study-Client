import React, { useEffect, useState } from "react";
import { FaTrashRestoreAlt } from "react-icons/fa";
import { FcApproval } from "react-icons/fc";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import ApproveModal from "../../../components/modal/ApproveModal";

const PendingSession = ({ pendingSession, refetch }) => {
  const [approve, setApprove] = useState(null);
  const axiosSecure = useAxiosSecure();
  const handleStatusChange = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to change this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, reject it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await axiosSecure.patch(`/change-status/${id}`, {
          status: "Rejected",
        });
        console.log(data);
        refetch();
        Swal.fire({
          title: "Reject!",
          text: "Tutor status has been Rejected.",
          icon: "success",
        });
      }
    });
  };

  useEffect(() => {
    if (approve) {
      const modal = document.getElementById("upload_material_modal");
      if (modal) {
        modal.showModal();
      }
    }
  }, [approve]);

  const openModal = (session) => {
    setApprove(session);
  };

  return (
    <div>
      <h2 className="text-4xl font-bold">
        Pending Session: {pendingSession.length}
      </h2>
      {pendingSession.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Section Title-Image</th>
                <th>Tutor Name</th>
                <th>Tutor Email</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="border-2 w-full">
              {pendingSession.map((session, idx) => (
                <tr key={session._id}>
                  <th>{idx + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={session.image}
                            alt="Avatar Tailwind CSS Component"
                          />
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
                      <span className="h-2 w-2 rounded-full bg-yellow-500"></span>
                      <span className="text-yellow-600">{session.status}</span>
                    </div>
                  </td>
                  <th>
                    <div className="flex justify-center gap-4">
                      <button
                        onClick={() => openModal(session)}
                        //disabled={booking.status === "Canceled"}
                        className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition-all flex gap-1 items-center shadow-md disabled:bg-gray-500 disabled:cursor-not-allowed"
                      >
                        <FcApproval /> Approve
                      </button>
                      <button
                        onClick={() => handleStatusChange(session._id)}
                        //disabled={booking.status === "Canceled"}
                        className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-all flex gap-1 items-center shadow-md disabled:bg-gray-500 disabled:cursor-not-allowed"
                      >
                        <FaTrashRestoreAlt /> Reject
                      </button>
                    </div>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="my-7 text-center">
          <span className="text-yellow-500 font-bold text-2xl">
            no pending session available
          </span>
        </div>
      )}

      {approve && (
        <ApproveModal
          approve={approve}
          onClose={() => setApprove(null)}
          refetch={refetch}
        ></ApproveModal>
      )}
    </div>
  );
};

export default PendingSession;
