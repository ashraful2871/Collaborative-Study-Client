import React from "react";
import AllStudySessionCard from "./AllStudySessionCard";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const StudySession = () => {
  const axiosSecure = useAxiosSecure();

  const { data: allStudy = [] } = useQuery({
    queryKey: ["all-approved-study-session"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/all-approved-study-session");
      return data;
    },
  });
  console.log(allStudy);

  return (
    <div className="space-y-8">
      <h2 className="text-4xl font-bold">Study Session</h2>
      <div className="grid grid-cols-3 gap-6">
        {allStudy.map((study) => (
          <AllStudySessionCard
            key={study._id}
            study={study}
          ></AllStudySessionCard>
        ))}
      </div>
    </div>
  );
};

export default StudySession;
