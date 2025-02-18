import React from "react";
import AllTutorCard from "./AllTutorCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../Loading";
import { Link } from "react-router-dom";

const AllTutor = () => {
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
      <h2 className="text-4xl font-bold">All Tutor</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {tutors.slice(0, 10).map((tutor) => (
          <AllTutorCard key={tutor._id} tutor={tutor}></AllTutorCard>
        ))}
      </div>
      <Link to="/all-tutors">
        <button className="btn bg-blue-500 hover:bg-blue-600 font-bold text-white text-sm mt-4">
          See All Tutor
        </button>
      </Link>
    </div>
  );
};

export default AllTutor;
