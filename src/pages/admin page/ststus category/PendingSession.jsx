import React, { useState } from "react";

import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import ApproveModal from "../../../components/modal/ApproveModal";
import PendingSessionTableTow from "./PendingSessionTableTow";

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
        if (data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            title: "Reject!",
            text: "Tutor status has been Rejected.",
            icon: "success",
          });
        }
      }
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl md:text-3xl font-bold">
        Pending Session: {pendingSession.length}
      </h2>
      {pendingSession.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table font-semibold">
            {/* head */}
            <thead className="border border-gray-300 text-center text-sm md:text-lg text-blue-600">
              <tr>
                <th className="border border-gray-300">#</th>
                <th className="border border-gray-300">Section Title-Image</th>
                <th className="border border-gray-300">Tutor Name</th>
                <th className="border border-gray-300">Tutor Email</th>
                <th className="border border-gray-300">Status</th>
                <th className="border border-gray-300">Action</th>
              </tr>
            </thead>
            <tbody className="border-2 w-full">
              {pendingSession.map((session, idx) => (
                <PendingSessionTableTow
                  key={session._id}
                  session={session}
                  idx={idx}
                  handleStatusChange={handleStatusChange}
                  approve={approve}
                  setApprove={setApprove}
                  refetch={refetch}
                ></PendingSessionTableTow>
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
