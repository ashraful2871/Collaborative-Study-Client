import React from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading";

const ViewStudyMaterials = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: materials = [], isLoading } = useQuery({
    queryKey: ["session-materials", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/session-materials/${user?.email}`
      );
      return data;
    },
  });
  console.log(materials);
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div>
      <h2>i am ViewStudyMaterials</h2>
    </div>
  );
};

export default ViewStudyMaterials;
