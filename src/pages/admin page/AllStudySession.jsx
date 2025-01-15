import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading";
import PendingSession from "./ststus category/PendingSession";
import ApprovedSession from "./ststus category/ApprovedSession";
import RejectedSession from "./ststus category/RejectedSession";

const AllStudySession = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: AllStudySession = [],
    isLoading,
    refetch,
  } = useQuery({
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
    <div className="space-y-5">
      {/* pending session */}
      <PendingSession
        pendingSession={pendingSession}
        refetch={refetch}
      ></PendingSession>

      {/* approved session */}
      <ApprovedSession approvedSession={approvedSession}></ApprovedSession>

      {/* rejected session */}
      <RejectedSession rejectedSession={rejectedSession}></RejectedSession>
    </div>
  );
};

export default AllStudySession;
