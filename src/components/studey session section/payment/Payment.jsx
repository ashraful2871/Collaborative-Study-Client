import React from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import CheckoutForm from "./form/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Loading from "../../Loading";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const Payment = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { data: sessionPayment = {}, isLoading } = useQuery({
    queryKey: ["session-details", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/session-details/${id}`);
      return data;
    },
  });
  console.log(sessionPayment);
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-center ">Pay now </h2>
      <Elements stripe={stripePromise}>
        <CheckoutForm sessionPayment={sessionPayment} />
      </Elements>
    </div>
  );
};

export default Payment;
