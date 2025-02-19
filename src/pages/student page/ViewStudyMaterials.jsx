import React from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
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

  return (
    <div>
      {materials.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {materials.map((material) => (
            <ViewAllStudyMaterialCard
              key={material._id}
              material={material}
            ></ViewAllStudyMaterialCard>
          ))}
        </div>
      ) : (
        <p className="flex justify-center mt-96 text-blue-700 font-bold text-4xl">
          no study material found
        </p>
      )}
    </div>
  );
};

export default ViewStudyMaterials;
