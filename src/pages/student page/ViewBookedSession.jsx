import React from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import ViewBookedSessionCard from "./ViewBookedSessionCard";
import Loading from "../../components/Loading";

const ViewBookedSession = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: bookedSessions = [], isLoading } = useQuery({
    queryKey: ["book-session", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/book-session/${user?.email}`);
      return data;
    },
  });
  console.log(bookedSessions);
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {bookedSessions.map((session) => (
          <ViewBookedSessionCard
            key={session._id}
            session={session}
          ></ViewBookedSessionCard>
        ))}
      </div>
    </div>
  );
};

export default ViewBookedSession;
