'use client'

import React, { useEffect, useState } from "react";

import Head from "next/head";
import { useRouter } from "next/navigation";

import Header from "../../components/Header";
import CreditCard from "../../components/payments/CreditCard";
import OM from "../../components/payments/OM";
import MoMo from "../../components/payments/MoMo";
import Footer from "../../components/Footer";

export default function Cart() {
  const [paymentOption, setPaymentOption] = useState(0);
  const totalJSON = localStorage.getItem("totalPayment");
  const totalNumber = totalJSON ? JSON.parse(totalJSON) : 0;
  const [total, setTotal] = useState(totalNumber);
  const [checkoutID, setCheckoutID] = useState("");
  const router = useRouter();

  const displayPaymentForm = (paymentOption: number) => {
    const description = checkoutID;
    if (paymentOption == 0) {
      return <CreditCard amount={total} description={description} />;
    } else if (paymentOption == 1) {
      return <OM amount={total} description={description} />;
    } else if (paymentOption == 2) {
      return <MoMo amount={total} description={description} />;
    }
  };

  // Getting the Checkout Information
  useEffect(() => {
    const totalJSON = localStorage.getItem("totalPayment");
    const totalNumber = !!totalJSON ? JSON.parse(totalJSON) : 0;
    setTotal(totalNumber);

    const checkoutIDJSON = localStorage.getItem("checkoutID");
    const checkoutIDString = !!checkoutIDJSON ? JSON.parse(checkoutIDJSON) : "";
    setCheckoutID(checkoutIDString);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Head>
        <title>Payment Page</title>
      </Head>
      <Header />
      <div className="container mx-auto p-4 flex-grow">
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Payment</h1>
            <button
              onClick={() => router.push("/")}
              className="bg-transparent border border-blue-500 text-blue-500 px-4 py-2 rounded-lg transition duration-300 ease-in-out hover:bg-blue-500 hover:text-white"
            >
              Back to Home
            </button>
          </div>
          <div className="flex justify-around flex-wrap mb-4">
            <div className="w-full max-w-xs bg-white rounded-lg shadow-md p-4 m-2">
              <input
                type="radio"
                id="creditCard"
                name="paymentOption"
                value="0"
                checked={paymentOption === 0}
                onChange={() => setPaymentOption(0)}
                className="mr-2"
              />
              <label htmlFor="creditCard" className="cursor-pointer">
                Credit Card
              </label>
            </div>
            <div className="w-full max-w-xs bg-white rounded-lg shadow-md p-4 m-2">
              <input
                type="radio"
                id="gcash"
                name="paymentOption"
                value="1"
                checked={paymentOption === 1}
                onChange={() => setPaymentOption(1)}
                className="mr-2"
              />
              <label htmlFor="gcash" className="cursor-pointer">
                Mobile Money
              </label>
            </div>
            <div className="w-full max-w-xs bg-white rounded-lg shadow-md p-4 m-2">
              <input
                type="radio"
                id="grabPay"
                name="paymentOption"
                value="2"
                checked={paymentOption === 2}
                onChange={() => setPaymentOption(2)}
                className="mr-2"
              />
              <label htmlFor="grabPay" className="cursor-pointer">
                Orange Money
              </label>
            </div>
          </div>
          <div className="flex flex-wrap justify-center items-center">
            {displayPaymentForm(paymentOption)}
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
