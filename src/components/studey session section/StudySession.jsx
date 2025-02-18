import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import Loading from "../Loading";
import AllStudySessionCard from "./AllStudySessionCard";
import { Link } from "react-router-dom";

const StudySession = () => {
  const [currentPage, setCurrentPage] = useState(1);
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
      <h2 className="text-4xl font-bold">Study Session</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {studySessions.slice(0, 3).map((study) => (
          <AllStudySessionCard key={study._id} study={study} />
        ))}
      </div>
      <Link to="/all-sessions">
        <button className="btn bg-blue-500 hover:bg-blue-600 font-bold text-white text-sm mt-4">
          See More
        </button>
      </Link>
    </div>
  );
};

export default StudySession;
