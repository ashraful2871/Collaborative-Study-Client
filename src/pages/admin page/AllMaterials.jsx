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
    <div>
      <h2>i am all materials</h2>
      <div className="grid grid-cols-4 gap-5">
        {materials.map((material) => (
          <AdminMaterialCard
            key={material._id}
            material={material}
            refetch={refetch}
          ></AdminMaterialCard>
        ))}
      </div>
    </div>
  );
};

export default AllMaterials;
