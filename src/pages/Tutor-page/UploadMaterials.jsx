import React from "react";
import UploadMaterialsCard from "../../components/UploadmaterialsCard";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading";

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
      <h2>UploadMaterials</h2>
      <div className="grid grid-cols-4 gap-5">
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
