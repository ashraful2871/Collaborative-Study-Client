import React from "react";
import { FaTrashRestoreAlt } from "react-icons/fa";
import { FcApproval } from "react-icons/fc";

const RejectedSession = ({ rejectedSession }) => {
  return (
    <div>
      <div>
        <h2 className="text-4xl font-bold">Rejected Session:</h2>
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
              {rejectedSession.map((session, idx) => (
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
                  <th>
                    <button className="btn btn-ghost btn-xs">
                      {session.status}
                    </button>
                  </th>
                  <th>
                    <div className="flex justify-center gap-4">
                      <button
                        //disabled={booking.status === "Canceled"}
                        className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition-all flex gap-1 items-center shadow-md disabled:bg-gray-500 disabled:cursor-not-allowed"
                      >
                        <FcApproval /> Approve
                      </button>
                      <button
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
      </div>
    </div>
  );
};

export default RejectedSession;
