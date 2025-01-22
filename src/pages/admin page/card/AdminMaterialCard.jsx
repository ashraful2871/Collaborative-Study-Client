import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import AdminUpdateMaterial from "./AdminUpdateMaterial";

const AdminMaterialCard = ({ material, refetch }) => {
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const axiosSecure = useAxiosSecure();
  const { image, materialId, driveLink, tutorEmail, _id } = material;

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

  // Delete material handler
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
        const { data } = await axiosSecure.delete(
          `/delete-admin-material/${id}`
        );
        if (data.deletedCount > 0) {
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "Tutor material has been deleted.",
            icon: "success",
          });
        }
      }
    });
  };

  return (
    <div>
      <div className="card bg-white shadow-xl border rounded-lg overflow-hidden h-full flex flex-col">
        {/* Image Section */}
        <img
          src={image}
          alt="Study Session"
          className="w-full h-48 object-cover"
        />

        {/* Card Body */}
        <div className="p-4 flex flex-col flex-grow">
          {/* Study Session Material ID */}
          <p className="text-gray-700 text-sm mb-2">
            <span className="font-semibold">Study Session Material Id:</span>{" "}
            {materialId}
          </p>

          {/* Material Link */}
          <div className="mb-3">
            <Link target="_blank" to={driveLink} className="btn-link ">
              <span className="font-semibold">Material Link</span>
            </Link>
          </div>
          {/* Tutor Email */}
          <p className="text-gray-700 text-sm mb-4">
            <span className="font-semibold">{tutorEmail}</span>
          </p>

          {/* Buttons */}
          <div className="mt-auto flex justify-between items-center border-t pt-4">
            <button
              onClick={openModal}
              className="btn btn-primary bg-blue-500 hover:bg-blue-600  font-semibold text-white text-lg"
            >
              Update
            </button>
            <button
              onClick={() => handleDelete(_id)}
              className="btn btn-error bg-red-500 hover:bg-red-600  font-semibold text-white text-lg"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      {selectedMaterial && (
        <AdminUpdateMaterial
          refetch={refetch}
          materialData={material}
          material={selectedMaterial}
          onClose={() => setSelectedMaterial(null)}
        />
      )}
    </div>
  );
};

export default AdminMaterialCard;
