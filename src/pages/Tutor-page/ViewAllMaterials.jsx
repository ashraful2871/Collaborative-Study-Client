import React from "react";
import AllMaterialCard from "../../components/AllMaterialCard";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Loading from "../../components/Loading";
import { useQuery } from "@tanstack/react-query";

const ViewAllMaterials = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: materials = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-materials", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `${import.meta.env.VITE_API_URL}/all-materials/${user?.email}`
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
      <h2>ViewAllMaterials</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {materials.map((material) => (
          <AllMaterialCard
            key={material._id}
            material={material}
            refetch={refetch}
          ></AllMaterialCard>
        ))}
      </div>
    </div>
  );
};

export default ViewAllMaterials;
