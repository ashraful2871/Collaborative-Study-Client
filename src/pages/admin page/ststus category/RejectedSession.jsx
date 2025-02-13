import React from "react";

const RejectedSession = ({ rejectedSession }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl md:text-3xl font-bold">
        Rejected Session: {rejectedSession.length}
      </h2>
      {rejectedSession.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table font-semibold">
            {/* head */}
            <thead className="text-center text-sm md:text-lg text-blue-600 ">
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
              {rejectedSession.map((session, idx) => (
                <tr
                  key={session._id}
                  className="border border-gray-300 text-base text-xs md:text-base"
                >
                  <th className="border border-gray-300">{idx + 1}</th>
                  <td className="border border-gray-300">
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
                        <div>{session.sessionTitle}</div>
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
                      <span className="h-2 w-2 rounded-full bg-red-500"></span>
                      <span className="text-red-600">{session.status}</span>
                    </div>
                  </td>
                  <th className="border border-gray-300 text-center">
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
  );
};

export default RejectedSession;
