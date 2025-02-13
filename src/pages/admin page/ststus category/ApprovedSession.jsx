import ApprovedSessionTableRow from "./ApprovedSessionTableRow";

const ApprovedSession = ({ approvedSession, refetch }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl md:text-3xl font-bold">
        Approved Session: <span>{approvedSession.length}</span>
      </h2>

      {approvedSession.length > 0 ? (
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
            <tbody className="border-2 w-full ">
              {approvedSession.map((session, idx) => (
                <ApprovedSessionTableRow
                  key={idx}
                  session={session}
                  idx={idx}
                  refetch={refetch}
                ></ApprovedSessionTableRow>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="my-7 text-center">
          <span className="text-green-500 font-bold text-2xl">
            no approved session available
          </span>
        </div>
      )}
    </div>
  );
};

export default ApprovedSession;
