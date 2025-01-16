import React, { useState } from "react";

interface CreditCardProps {
  amount: number;
  description: string;
}

const CreditCard: React.FC<CreditCardProps> = ({ amount,description }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [cardHolder, setCardHolder] = useState("");
  const [number, setNumber] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [code, setCode] = useState("");

  const [paymentStatus, setPaymentStatus] = useState("");


  const onSubmit = async () => {

  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Credit Card Payment</h2>
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
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
        <div className="mb-4">
          <label className="block text-gray-700">Card Holder</label>
          <input
            type="text"
            value={cardHolder}
            onChange={(e) => setCardHolder(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Card Number</label>
          <input
            type="text"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4 flex space-x-4">
          <div className="w-1/2">
            <label className="block text-gray-700">Expiry Month</label>
            <input
              type="text"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="w-1/2">
            <label className="block text-gray-700">Expiry Year</label>
            <input
              type="text"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">CVV</label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
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
      {paymentStatus && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <p className="text-gray-700">{paymentStatus}</p>
        </div>
      )}
    </div>
  );
};

export default CreditCard;
