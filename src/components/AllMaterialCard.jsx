import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";
import UpdateMaterialModal from "./modal/UpdateMaterialModal";

const AllMaterialCard = ({ material, refetch }) => {
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const axiosSecure = useAxiosSecure();
  const { image, materialId, sessionTitle, tutorEmail, driveLink, _id } =
    material;

  useEffect(() => {
    if (selectedMaterial) {
      const modal = document.getElementById("upload_material_modal");
      if (modal) {
        modal.showModal();
      }
    }
  }, [selectedMaterial]);

  const openModal = () => {
    setSelectedMaterial(material);
  };

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
    <div className="card  border-2 rounded-lg overflow-hidden">
      {/* Image Section */}
      <img
        src={image}
        alt="Study Session"
        className="w-full h-48 object-cover"
      />

      {/* Card Body */}
      <div className="p-4">
        {/* Study Session Material ID */}
        <div className="card-body">
          <p className="text-base-content text-sm mb-2">
            <span className="font-semibold">Study Session Material Id:</span>{" "}
            {materialId}
          </p>

          {/* Material Link */}
          <Link target="_blank" to={driveLink} className="btn-link">
            <span className="font-semibold">Material Link</span>{" "}
          </Link>
          <p className="text-base-content text-sm my-3">
            <span className="font-semibold">{tutorEmail}</span>{" "}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-2 borders">
          <button
            onClick={openModal}
            className="btn btn-primary bg-blue-500 hover:bg-blue-600  font-semibold text-white"
          >
            Update
          </button>
          <button
            onClick={() => handleDelete(_id)}
            className="btn btn-error bg-red-500 hover:bg-red-600  font-semibold text-white"
          >
            Delete
          </button>
        </div>
      </div>
      {selectedMaterial && (
        <UpdateMaterialModal
          refetch={refetch}
          materialData={material}
          material={selectedMaterial}
          onClose={() => setSelectedMaterial(null)}
        />
      )}
    </div>
  );
};

export default AllMaterialCard;
