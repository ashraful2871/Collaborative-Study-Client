import React from "react";
import ManagePersonalNoteCart from "./ManagePersonalNoteCart";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading";

const ManagePersonalNotes = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: notes = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["note", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/student/note/${user?.email}`);
      return data;
    },
  });
  console.log(notes);
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div>
      {notes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {notes.map((note) => (
            <ManagePersonalNoteCart
              key={note._id}
              note={note}
              refetch={refetch}
            ></ManagePersonalNoteCart>
          ))}
        </div>
      ) : (
        <p className="flex justify-center mt-96 text-blue-700 font-bold text-4xl">
          no notes found
        </p>
      )}
    </div>
  );
};

export default ManagePersonalNotes;
