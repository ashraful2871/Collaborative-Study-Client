import ApprovedSessionTableRow from "./ApprovedSessionTableRow";

const ApprovedSession = ({ approvedSession, refetch }) => {
  return (
    <div>
      <h2 className="text-4xl font-bold">
        Approved Session: <span>{approvedSession.length}</span>
      </h2>

      {approvedSession.length > 0 ? (
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
