import React, { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Loading from "../../components/Loading";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const {
    data: usersData = { users: [], totalUsers: 0 },
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users", search, currentPage],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/users?search=${search}&page=${currentPage}`
      );
      return data;
    },
  });

  const { users, totalUsers } = usersData;

  const totalPages = Math.ceil(totalUsers / rowsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Make admin
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

        refetch();
        if (data.modifiedCount > 0) {
          Swal.fire({
            title: "Success!",
            text: `${user.name} is tutor now`,
            icon: "success",
          });
        }
      }
    });
  };

  // Make tutor
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

        refetch();
        if (data.modifiedCount > 0) {
          Swal.fire({
            title: "Success!",
            text: `${user.name} is tutor now`,
            icon: "success",
          });
        }
      }
    });
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div>
      <input
        type="email"
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by Email"
        className="input input-bordered w-full max-w-xs"
      />
      <div className="overflow-x-auto">
        <table className="table">
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
            {users.map((user, idx) => (
              <tr key={user._id} className="hover text-center">
                <th>{(currentPage - 1) * rowsPerPage + idx + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          referrerPolicy="no-referrer"
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
                <td>{user.role}</td>
                <th>
                  <button
                    onClick={() => handleMAkeAdmin(user)}
                    className="btn hover:bg-blue-600 bg-blue-500 text-white btn-sm"
                  >
                    Make Admin
                  </button>
                  <button
                    onClick={() => handleMakeTutor(user)}
                    className="btn btn-neutral btn-sm"
                  >
                    Make Tutor
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-4">
        {[...Array(totalPages).keys()].map((page) => (
          <button
            key={page + 1}
            onClick={() => handlePageChange(page + 1)}
            className={`btn btn-sm mx-1 ${
              currentPage === page + 1
                ? "btn hover:bg-blue-600 bg-blue-500 text-white"
                : "btn-outline hover:bg-blue-600"
            }`}
          >
            {page + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllUsers;
