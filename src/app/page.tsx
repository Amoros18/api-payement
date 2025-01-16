'use client'

import React, { useState } from "react";

import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/navigation";

import Header from "../components/Header";
import Footer from "@/components/Footer";
import plainT from "../assets/plainT.png";
import { Product } from "../lib/definitions";

// Product Placeholder
// Normally this is an API Call to pull data from db
const product = {
  id: "1",
  name: "Plain White T-Shirt",
  description: "A simple plain white t-shirt",
  price: 1250.0,
  stock: 15,
};


export default function Home() {
  const [quantity, setQuantity] = useState(0);
  const router = useRouter();

  // Add to Cart Placeholder
  // Normally this is an API Call to push data to the db and updating the cart
  // We simulate this by saving to local storage
  const AddToCart = (product: Product, quantity : number) => {
    if (quantity > 0 && quantity <= product.stock) {
      const cartItems = [];
      cartItems.push({
        product,
        quantity,
      });
      localStorage.setItem("cartItems", JSON.stringify(cartItems));  
       // Calculate total and store it in localStorage
       const total = cartItems.reduce((acc, item) => acc + item.quantity * item.product.price, 0);
       localStorage.setItem("totalPayment", JSON.stringify(total));
 
      router.push("/cart");
    }
    if(quantity > product.stock){
      alert(`Only ${product.stock} items left in stock`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Product Page</title>
      </Head>
      <Header/>
      <div className="container mx-auto p-4">
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex">
            <div className="w-1/2">
              <Image src={plainT} alt={product.name} className="rounded-lg" />
            </div>
            <div className="w-1/2 pl-6">
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              <p className="text-gray-700 mb-4">{product.description}</p>
              <p className="text-2xl font-semibold mb-4">${product.price}</p>
              <div className="flex items-center mb-4">
                <label className="mr-2">Quantity:</label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="border rounded-lg p-2 w-20"
                  min="1"
                  max={product.stock}
                />
              </div>
              <button
                onClick={() => AddToCart(product, quantity)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
