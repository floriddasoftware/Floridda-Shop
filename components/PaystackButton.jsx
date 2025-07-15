"use client";
import { useState, useEffect } from "react";
import Script from "next/script";
import { useRouter } from "next/navigation";

export default function PaystackButton({ amount, email, onSuccess, onClose }) {
  const [paystackLoaded, setPaystackLoaded] = useState(false);
  const router = useRouter();

  const handlePayment = () => {
    if (!paystackLoaded || !email || !amount) {
      alert("Please ensure all fields are filled and Paystack is loaded.");
      return;
    }

    const handler = window.PaystackPop.setup({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
      email: email,
      amount: amount * 100, 
      currency: "NGN",
      callback: (response) => {
        onSuccess(response);
        router.push(`/confirmation?orderId=${response.reference}`);
      },
      onClose: () => {
        onClose();
        alert("Payment window closed.");
      },
    });
    handler.openIframe();
  };

  return (
    <>
      <Script
        src="https://js.paystack.co/v1/inline.js"
        onLoad={() => setPaystackLoaded(true)}
        onError={() => alert("Failed to load Paystack script.")}
      />
      <button
        onClick={handlePayment}
        disabled={!paystackLoaded || !email || !amount}
        className={`w-full py-3 rounded-lg transition duration-300 ${
          !paystackLoaded || !email || !amount
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
      >
        {paystackLoaded ? "Pay with Paystack" : "Loading Paystack..."}
      </button>
    </>
  );
}