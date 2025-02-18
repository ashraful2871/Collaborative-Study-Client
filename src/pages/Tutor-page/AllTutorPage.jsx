import React from "react";
import Loading from "../../components/Loading";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import AllTutorCard from "../../components/tutor/AllTutorCard";

const AllTutorPage = () => {
  const { data: tutors = [], isLoading } = useQuery({
    queryKey: ["tutors"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/tutors`
      );
      return data;
    },
  });
  console.log(tutors);
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div className="space-y-5">
      <h2 className="text-4xl font-bold text-center">All Tutor</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {tutors.map((tutor) => (
          <AllTutorCard key={tutor._id} tutor={tutor}></AllTutorCard>
        ))}
      </div>
    </div>
  );
};

export default AllTutorPage;
