import React from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading";
import ViewAllStudyMaterialCard from "./ViewAllStudyMaterialCard";

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
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        {materials.map((material) => (
          <ViewAllStudyMaterialCard
            key={material._id}
            material={material}
          ></ViewAllStudyMaterialCard>
        ))}
      </div>
    </div>
  );
};

export default ViewStudyMaterials;
