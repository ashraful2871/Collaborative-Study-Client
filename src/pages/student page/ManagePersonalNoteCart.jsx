import React, { useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ManagePersonalNoteCart = ({ note, refetch }) => {
  const { title, description, _id } = note;
  const axiosSecure = useAxiosSecure();
  const [openModal, setOpenModal] = useState(false);

  //delete note
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete your note!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await axiosSecure.delete(`/note/${id}`);
        console.log(data);
        if (data.deletedCount > 0) {
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "Your Note has been deleted.",
            icon: "success",
          });
        }
      }
    });
  };

  //update note

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get("title");
    const description = formData.get("description");
    const noteData = {
      title,
      description,
    };
    console.log(noteData);

    const { data } = await axiosSecure.patch(`/update/note/${_id}`, noteData);
    console.log(data);
    setOpenModal(false);

    if (data.modifiedCount > 0) {
      refetch();
      Swal.fire({
        title: "Updated!",
        text: "Your Note has been Updated.",
        icon: "success",
      });
    }
  };

  const handleUpdate = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  return (
    <div>
      <div className="card bg-base-100 border">
        <div className="card-body flex flex-grow">
          <div className="flex-grow">
            <h2 className="card-title">{title} </h2>
            <p>{description}</p>
          </div>
        </div>
        <div className="card-actions justify-between m-3">
          <button
            onClick={handleUpdate}
            className="btn btn-sm bg-blue-600 hover:bg-blue-700 text-white font-bold"
          >
            <FaEdit></FaEdit> Update
          </button>
          <button
            onClick={() => handleDelete(_id)}
            className="btn btn-sm bg-red-600 hover:bg-red-700 text-white font-bold"
          >
            <FaTrashAlt></FaTrashAlt> Delete
          </button>
        </div>
      </div>

      {/* modal */}
      {openModal && (
        <dialog
          id="upload_material_modal"
          className="modal "
          open
          onClose={handleCloseModal}
        >
          <form
            method="dialog"
            className="modal-box  border-2  p-6 space-y-4 bg-white rounded-lg "
            onSubmit={handleSubmit}
          >
            <button
              type="button"
              className="btn btn-sm btn-circle absolute right-2 top-2"
              onClick={handleCloseModal}
            >
              ✕
            </button>
            <h3 className="text-center text-xl font-bold">Update Your Note</h3>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1">
                Note Title:
              </label>
              <input
                defaultValue={title}
                type="text"
                name="title"
                placeholder="Note Title"
                className="input input-bordered w-full bg-gray-100"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-1">
                Note Description:
              </label>
              <textarea
                defaultValue={description}
                placeholder="Note Description"
                name="description"
                className="textarea textarea-bordered w-full bg-gray-100"
                rows="4"
                required
              ></textarea>
            </div>

            <div className="form-control mt-4">
              <button type="submit" className="btn btn-primary w-full">
                Update Note
              </button>
            </div>
          </form>
        </dialog>
      )}
    </div>
  );
};

export default ManagePersonalNoteCart;
