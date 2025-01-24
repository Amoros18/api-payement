'use client';

import React, { useState, useEffect  } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "../payments/CheckoutForm";
import CompletePage from "../payments/CompletePage";

if(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}
interface CreditCardProps {
  amount: number;
  description: string;
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const CreditCard: React.FC<CreditCardProps> = ({ amount,description }) => {
  const [clientSecret, setClientSecret] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  
    useEffect(() => {
      // Create PaymentIntent as soon as the page loads
      fetch("/api/stripe/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: amount}),
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret));
    }, [amount]);
  
    const appearance: { theme: 'stripe' | 'flat' | 'night' } = {
      theme: 'stripe',
    };
    const options = {
      clientSecret,
      appearance,
    };

  useEffect(() => {
    const paymentIntentClientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );
    setConfirmed(paymentIntentClientSecret !== null);
  },[clientSecret]);

    return (
      <div className="App">
         {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          {confirmed ? (
            <CompletePage />
          ) : (
            <CheckoutForm setConfirmed={setConfirmed} amount={amount} />
          )}
        </Elements>
      )}
      </div>
    );


};

export default CreditCard;
