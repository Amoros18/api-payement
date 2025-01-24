'use client';

import React, { useState, useEffect  } from "react";
import CompletePage from "@/components/payments/CompletePage";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

if(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
    throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
  }

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
export default function Test(){

     const [clientSecret, setClientSecret] = useState("");
      const [confirmed, setConfirmed] = useState(false);
      
        useEffect(() => {
          fetch("/api/stripe/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
          })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
        }, []);
      
        const appearance: { theme: 'stripe' | 'flat' | 'night' } = {
          theme: 'stripe',
        };
        const options = {
          clientSecret,
          appearance,
        };
  
    return (
        <Elements options={options}
           stripe={stripePromise}>
             <CompletePage />
          </Elements>
    );
}