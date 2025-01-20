import React from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "../form/checkOutForm.css";
import axios from "axios";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";

const CheckoutForm = ({ sessionPayment }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

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
    } else if (paymentIntent.status === "succeeded") {
      console.log("Payment successful:", paymentIntent);
      const { data } = await axiosSecure.post(
        "/book-session",
        bookedSessionData
      );
      console.log(data);
    }
  };

  return (
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
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};

export default CheckoutForm;
