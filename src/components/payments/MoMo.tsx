import React, { useState } from "react";

import styles from "../../styles/Payment.module.css";

interface CreditCardProps {
  amount: number;
  description: string;
}

const MoMo: React.FC<CreditCardProps> = ({ amount, description }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [payProcess, setPayProcess] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");

 
  const onSubmit = async () => {

  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Orange Money Payment</h2>
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Customer Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Phone</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg transition duration-300 ease-in-out hover:bg-blue-700"
        >
          Pay ${amount.toFixed(2)}
        </button>
      </form>
      {payProcess && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <p className="text-gray-700">{payProcess}</p>
        </div>
      )}
    </div>
  );
};

export default MoMo;
