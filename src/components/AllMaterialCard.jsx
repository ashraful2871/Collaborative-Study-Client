import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";

const AllMaterialCard = ({ material, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const { image, materialId, sessionTitle, tutorEmail, driveLink, _id } =
    material;

  //delete material
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await axiosSecure.delete(`/delete-material/${id}`);
        console.log(data);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
      refetch();
    });
  };
  return (
    <div className="card  bg-white shadow-xl border rounded-lg overflow-hidden">
      {/* Image Section */}
      <img
        src={image}
        alt="Study Session"
        className="w-full h-48 object-cover"
      />

      {/* Card Body */}
      <div className="p-4">
        {/* Study Session Material ID */}
        <p className="text-gray-700 text-sm mb-2">
          <span className="font-semibold">Study Session Material Id:</span>{" "}
          {materialId}
        </p>

        {/* Material Link */}
        <Link target="_blank" to={driveLink} className="btn-link">
          <span className="font-semibold">Material Link</span>{" "}
        </Link>
        <p className="text-gray-700 text-sm my-3">
          <span className="font-semibold">{tutorEmail}</span>{" "}
        </p>

        {/* Buttons */}
        <div className="flex justify-between mt-2 borders">
          <button className="btn btn-primary ">Update</button>
          <button onClick={() => handleDelete(_id)} className="btn btn-error">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllMaterialCard;
