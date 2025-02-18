import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import AllStudySessionCard from "../../components/studey session section/AllStudySessionCard";
import Loading from "../../components/Loading";

const AllSession = () => {
  const { data: studySessions = [], isLoading } = useQuery({
    queryKey: ["all-approved-study-session"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/all-approved-study-session`
      );
      return data;
    },
  });
  console.log(studySessions);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="space-y-8">
      <h2 className="text-4xl font-bold text-center">All Study Session</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {studySessions.map((study) => (
          <AllStudySessionCard key={study._id} study={study} />
        ))}
      </div>
    </div>
  );
};

export default AllSession;
