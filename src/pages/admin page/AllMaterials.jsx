import React from "react";
import AdminMaterialCard from "./card/AdminMaterialCard";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading";

const AllMaterials = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: materials = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-materials"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/all-materials");
      return data;
    },
  });
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div className="p-2">
      {materials.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {materials.map((material) => (
            <AdminMaterialCard
              key={material._id}
              material={material}
              refetch={refetch}
            ></AdminMaterialCard>
          ))}
        </div>
      ) : (
        <p className="flex justify-center mt-96 text-blue-700 font-bold text-4xl">
          no material found
        </p>
      )}
    </div>
  );
};

export default AllMaterials;
