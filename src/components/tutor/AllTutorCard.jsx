import React from "react";

const AllTutorCard = ({ tutor }) => {
  const { name, photo } = tutor;
  return (
    <div className="flex items-center gap-3 border-2 p-3 rounded-xl">
      <div className="avatar">
        <div className="rounded-full h-12 w-12">
          <img
            referrerPolicy="no-referrer"
            src={photo}
            alt="Avatar Tailwind CSS Component"
          />
        </div>
      </div>
      <div>
        <div className="font-bold">{name}</div>
      </div>
    </div>
  );
};

export default AllTutorCard;
