import React from "react";
import { useParams } from "react-router-dom";

const Payment = () => {
  const { id } = useParams();
  return (
    <div>
      <h2>i am payment page</h2>
    </div>
  );
};

export default Payment;
