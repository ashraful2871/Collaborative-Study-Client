import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading";
import PendingSession from "./ststus category/PendingSession";
import ApprovedSession from "./ststus category/ApprovedSession";
import RejectedSession from "./ststus category/RejectedSession";

const AllStudySession = () => {
  const axiosSecure = useAxiosSecure();
  const { data: AllStudySession = [], isLoading } = useQuery({
    queryKey: ["all-study-session"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/all-study-session");
      return data;
    },
  });

  //pending session
  const pendingSession = AllStudySession.filter(
    (allStudy) => allStudy.status === "Pending"
  );
  console.log(pendingSession);

  //approved session
  const approvedSession = AllStudySession.filter(
    (allStudy) => allStudy.status === "Approved"
  );
  console.log(approvedSession);

  //rejected session
  const rejectedSession = AllStudySession.filter(
    (allStudy) => allStudy.status === "Rejected"
  );
  console.log(rejectedSession);

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div>
      <h2 className="text-4xl font-bold">Pending Session:</h2>
      {pendingSession.map((session) => (
        <PendingSession key={session._id} session={session}></PendingSession>
      ))}
      <h2 className="text-4xl font-bold">Approved Session:</h2>
      {approvedSession.map((session) => (
        <ApprovedSession key={session._id} session={session}></ApprovedSession>
      ))}
      <h2 className="text-4xl font-bold">Reject Session:</h2>
      {rejectedSession.map((session) => (
        <RejectedSession key={session._id} session={session}></RejectedSession>
      ))}
    </div>
  );
};

export default AllStudySession;
