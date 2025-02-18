import React from "react";
import AllStudySessionCard from "./studey session section/AllStudySessionCard";
import Loading from "./Loading";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const FeaturedSession = () => {
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
      <h2 className="text-4xl font-bold">Featured Session</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {studySessions.slice(3, 6).map((study) => (
          <AllStudySessionCard key={study._id} study={study} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedSession;
