import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import Loading from "../Loading";
import AllStudySessionCard from "./AllStudySessionCard";

const StudySession = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = useQuery({
    queryKey: ["all-approved-study-session", currentPage],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/all-approved-study-session`,
        { params: { page: currentPage, limit: 6 } }
      );
      return data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  const { studySessions = [], totalItems = 0, totalPages = 1 } = data;

  const handlePageChange = (direction) => {
    setCurrentPage((prevPage) => {
      let newPage = prevPage + direction;
      if (newPage > totalPages) newPage = totalPages;
      if (newPage < 1) newPage = 1;
      window.scrollTo({ top: 0, behavior: "smooth" });
      return newPage;
    });
  };

  return (
    <div className="space-y-8">
      <h2 className="text-4xl font-bold">Study Session</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {studySessions.map((study) => (
          <AllStudySessionCard key={study._id} study={study} />
        ))}
      </div>

      <div className="flex justify-center mt-6 gap-5">
        <button
          onClick={() => handlePageChange(-1)}
          disabled={currentPage === 1}
          className="join-item btn btn-primary bg-blue-500 hover:bg-blue-600  font-semibold text-white text-lg"
        >
          «
        </button>
        <span className="join-item btn border-2 border-blue-700 hover:border-blue-700 text-base font-semibold">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === totalPages}
          className="join-item btn btn-primary bg-blue-500 hover:bg-blue-600  font-semibold text-white text-lg"
        >
          »
        </button>
      </div>
    </div>
  );
};

export default StudySession;
