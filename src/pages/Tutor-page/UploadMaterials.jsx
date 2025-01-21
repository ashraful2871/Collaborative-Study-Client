import React from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading";
import UploadMaterialsCard from "../../components/UploadMaterialsCard";

const UploadMaterials = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: materials = [], isLoading } = useQuery({
    queryKey: ["create-all-study", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `${import.meta.env.VITE_API_URL}/create-all-study/${user?.email}`
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
      <div className="grid grid-cols-1  md:grid-cols-2 xl:grid-cols-4 gap-5">
        {materials.map((material) => (
          <UploadMaterialsCard
            key={material._id}
            material={material}
          ></UploadMaterialsCard>
        ))}
      </div>
    </div>
  );
};

export default UploadMaterials;
