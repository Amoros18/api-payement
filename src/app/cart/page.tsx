'use client'

import React, { use, useEffect, useState } from "react";

import Head from "next/head";
import { useRouter } from "next/navigation";
import {CartItem} from "../../lib/definitions";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function Cart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [total, setTotal] = useState<number>(() => {
    if (typeof window !== "undefined") {
      const totalJSON = localStorage.getItem("totalPayment");
      return totalJSON ? JSON.parse(totalJSON) : 0;
    }
    return 0;
  });
  const [checkoutID, setCheckoutID] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const checkoutIDJSON = localStorage.getItem("checkoutID");
      const checkoutIDString = checkoutIDJSON ? JSON.parse(checkoutIDJSON) : "";
      setCheckoutID(checkoutIDString);
    }
  }, []);

  // Getting the Cart
  useEffect(() => {
    if (typeof window !== "undefined") {
      const cartItemsJSON = localStorage.getItem("cartItems");
      const cartItems: CartItem[] = cartItemsJSON ? JSON.parse(cartItemsJSON) : [];
      setCart(cartItems);
    }
  }, []);

  // Updating Total Price
  useEffect(() => {
    if (typeof window !== "undefined") {
      const interval = setInterval(() => {
        const cartItemsJSON = localStorage.getItem("cartItems");
        const cartItems: CartItem[] = cartItemsJSON ? JSON.parse(cartItemsJSON) : [];
        setCart(cartItems);
        const newTotal = cartItems.reduce((acc, item) => acc + item.quantity * item.product.price, 0);
        setTotal(newTotal);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [cart]);

  const ProceedPayment = (total: number) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("totalPayment", JSON.stringify(total));
      localStorage.setItem("checkoutID", JSON.stringify(`${Date.now()}-Guide`));
      router.push("/payment");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Head>
        <title>Cart Page</title>
      </Head>
      <Header/>
      <div className="container mx-auto p-4 flex-grow">
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Your Cart</h1>
            <button
              onClick={() => router.push("/")}
              className="bg-transparent border border-blue-500 text-blue-500 px-4 py-2 rounded-lg transition duration-300 ease-in-out hover:bg-blue-500 hover:text-white"
            >
              Continue Shopping
            </button>
          </div>
          <ul className="list-none overflow-x-auto mb-4">
            <li className="flex justify-between items-center font-semibold mb-2">
              <p className="w-1/4">Product</p>
              <p className="w-1/4">Quantity</p>
              <p className="w-1/4">Price</p>
              <p className="w-1/4">Total</p>
            </li>
            {cart && cart.map((item, index) => (
              <li key={index} className="flex justify-between items-center mb-2">
                <p className="w-1/4">{item.product.name}</p>
                <p className="w-1/4">{item.quantity}</p>
                <p className="w-1/4">{item.product.price.toFixed(2)} F</p>
                <p className="w-1/4">{(item.quantity * item.product.price).toFixed(2)} F</p>
              </li>
            ))}
          </ul>
          <div className="flex justify-between items-center mt-4">
            <p className="text-xl font-bold">Total: <span>{total.toFixed(2)} F</span></p>
            <button
              onClick={() => ProceedPayment(total)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg transition duration-300 ease-in-out hover:bg-blue-700"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
