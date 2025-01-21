import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "../form/checkOutForm.css";
import axios from "axios";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CheckoutForm = ({ sessionPayment }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [processing, setProcessing] = useState(false);

  const {
    registrationFee,
    image,
    sessionTitle,
    description,
    classStart,
    classEnd,
    duration,
    tutor,
    _id,
  } = sessionPayment;

  //booked now
  const bookedSessionData = {
    image,
    sessionTitle,
    description,
    classStart,
    classEnd,
    duration,
    tutor,
    registrationFee,
    sessionId: _id,
    studentEmail: user?.email,
    studentName: user?.displayName,
  };

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    setProcessing(true);
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { data } = await axiosSecure.post("/create-payment-intent", {
      price: registrationFee,
    });
    console.log(data);

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }

    // confirm payment
    const { clientSecret } = data;
    const { error: confirmError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
        },
      });

    if (confirmError) {
      console.log("[Error during confirmation]", confirmError);
      //setPaymentStatus("Payment failed. Please try again.");
      setProcessing(false);
      toast.error("Payment failed. Please try again.");
    } else if (paymentIntent.status === "succeeded") {
      //   console.log("Payment successful:", paymentIntent);
      const { data } = await axiosSecure.post(
        "/book-session",
        bookedSessionData
      );
      //   console.log(data);
      toast.success("Payment successful");
      navigate("/dashboard/view-book-session");
      setProcessing(false);
    }
  };

  return (
    <div className=" w-1/2 mx-auto">
      <div>
        {" "}
        <form onSubmit={handleSubmit}>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
          {processing ? (
            <button className="btn btn-primary bg-blue-500 hover:bg-blue-600  font-semibold text-white text-lg">
              <span className="loading loading-spinner"></span>
            </button>
          ) : (
            <button
              disabled={!stripe || processing}
              className="btn btn-primary bg-blue-500 hover:bg-blue-600  font-semibold text-white text-lg"
              type="submit"
            >
              Pay
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
