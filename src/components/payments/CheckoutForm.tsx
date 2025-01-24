"use client";

import { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { StripePaymentElementOptions } from "@stripe/stripe-js";

interface CheckoutFormProps {
  setConfirmed: (confirmed: boolean) => void;
  amount: number;
}

export default function CheckoutForm({ setConfirmed ,amount}: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();


  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // interface HandleSubmitEvent extends React.FormEvent<HTMLFormElement> {}

  interface StripeError {
    type: string;
    message?: string;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error }: { error?: StripeError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/payment",
      },
    });

    if (error?.type === "card_error" || error?.type === "validation_error") {
      setMessage(error.message ?? "An error occurred");
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
    setTimeout(() => {
      setConfirmed(true);
    }, 5000);
  };

  const paymentElementOptions: StripePaymentElementOptions = {
    layout: {
      type: "tabs",
    },
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>

      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button >
       
      </button>
      <button 
      disabled={isLoading || !stripe || !elements} 
      id="submit"
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg transition duration-300 ease-in-out hover:bg-blue-700"
        > <span id="button-text">
        {isLoading ? <div className="spinner" id="spinner"></div> : "Pay  " + amount.toFixed(2)+" F"}
         </span>
          </button>
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}