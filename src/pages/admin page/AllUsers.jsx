import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/users");
      return data;
    },
  });
  console.log(users);

  const handleMAkeAdmin = async (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to make admin this ${user?.name}!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Admin it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await axiosSecure.patch(`/user/role/${user?.email}`, {
          role: "admin",
        });
        console.log(data);
        refetch();
        Swal.fire({
          title: "Success!",
          text: `${user.name} is admin now`,
          icon: "success",
        });
      }
    });
  };

  //make tutor
  const handleMakeTutor = async (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to make admin this ${user?.name}!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Tutor it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await axiosSecure.patch(`/user/role/${user?.email}`, {
          role: "tutor",
        });
        console.log(data);
        refetch();
        Swal.fire({
          title: "Success!",
          text: `${user.name} is tutor now`,
          icon: "success",
        });
      }
    });
  };
  return (
    <div>
      <h2>all user: {users.length}</h2>
      <input
        type="text"
        placeholder="Search by Email"
        className="input input-bordered w-full max-w-xs"
      />
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text-center">
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {users.map((user, idx) => (
              <tr key={user._id} className="hover text-center">
                <th>{idx + 1}</th>
                <td className="">
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          className="rounded-full"
                          src={user.photo}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.name}</div>
                    </div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>
                  {user.role === "admin" || user.role === "tutor"
                    ? user.role
                    : "student"}
                </td>
                <th>
                  <button
                    onClick={() => handleMAkeAdmin(user)}
                    className="btn hover:bg-blue-600 bg-blue-500 text-white btn-sm"
                  >
                    Make Admin
                  </button>
                  <button
                    onClick={() => handleMakeTutor(user)}
                    className="btn  btn-neutral btn-sm"
                  >
                    Make Tutor
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
