import React from "react";
import AllStudySessionCard from "./AllStudySessionCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../Loading";

const StudySession = () => {
  const { data: allStudy = [], isLoading } = useQuery({
    queryKey: ["all-approved-study-session"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/all-approved-study-session`
      );
      return data;
    },
  });
  console.log(allStudy);
  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="space-y-8">
      <h2 className="text-4xl font-bold">Study Session</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
