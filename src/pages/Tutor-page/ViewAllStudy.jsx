import React from "react";
import StudySessionCard from "../../components/StudySessionCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../../components/Loading";

const ViewAllStudy = () => {
  const { data: allStudy = [], isLoading } = useQuery({
    queryKey: ["create-all-study"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/create-all-study`
      );
      return data;
    },
  });
  console.log(allStudy);
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div>
      <h2>view all study</h2>
      <div className="grid grid-cols-4 gap-5">
        {allStudy.map((study) => (
          <StudySessionCard key={study._id}></StudySessionCard>
        ))}
      </div>
    </div>
  );
};

export default ViewAllStudy;
