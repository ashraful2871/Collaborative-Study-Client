import React from "react";
import AllMaterialCard from "../../components/AllMaterialCard";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Loading from "../../components/Loading";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

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
    <div className="p-2">
      {materials.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {materials.map((material) => (
            <AllMaterialCard
              key={material._id}
              material={material}
              refetch={refetch}
            ></AllMaterialCard>
          ))}
        </div>
      ) : (
        <div className="flex  flex-col items-center space-y-4 mt-96">
          <p className=" text-blue-700 font-bold text-4xl">no material found</p>
          <Link to="/dashboard/upload-materials">
            <button className="btn bg-blue-500 hover:bg-blue-600  font-semibold text-white text-lg">
              Upload Materials
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ViewAllMaterials;
