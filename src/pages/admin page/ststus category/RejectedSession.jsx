import React from "react";
import { FaTrashRestoreAlt } from "react-icons/fa";
import { FcApproval } from "react-icons/fc";

const RejectedSession = ({ rejectedSession }) => {
  return (
    <div>
      <div>
        <h2 className="text-4xl font-bold">
          Rejected Session: {rejectedSession.length}
        </h2>
        {rejectedSession.length > 0 ? (
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
                          <div className="font-bold">
                            {session.sessionTitle}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{session.tutor.name}</td>
                    <td> {session.tutor.email}</td>
                    <td>
                      <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-sm font-bold shadow-md transition-colors">
                        <span className="h-2 w-2 rounded-full bg-red-500"></span>
                        <span className="text-red-600">{session.status}</span>
                      </div>
                    </td>
                    <th>
                      <span className="text-red-500 font-bold text-lg">
                        Actions not allowed
                      </span>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="my-7 text-center">
            <span className="text-red-500 font-bold text-2xl">
              no rejected session available
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default RejectedSession;
