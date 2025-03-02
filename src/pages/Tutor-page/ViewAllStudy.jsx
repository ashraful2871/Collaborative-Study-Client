import React from "react";
import StudySessionCard from "../../components/StudySessionCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../../components/Loading";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const ViewAllStudy = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: allStudy = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["create-all-study", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `${import.meta.env.VITE_API_URL}/create-all-study/${user?.email}`
      );
      return data;
    },
  });
  // console.log(allStudy);
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {allStudy.map((study) => (
          <StudySessionCard
            key={study._id}
            study={study}
            refetch={refetch}
          ></StudySessionCard>
        ))}
      </div>
    </div>
  );
};

export default ViewAllStudy;
