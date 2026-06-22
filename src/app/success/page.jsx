"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    const confirmPayment = async () => {
      if (!sessionId) return;

      try {
        await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/bookings/payment-success`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ sessionId }),
          }
        );
      } catch (err) {
        console.error("Payment confirmation failed:", err);
      }
    };

    confirmPayment();
  }, [sessionId]);

  return (
    <div className="p-10 text-center">
      <h1 className="text-3xl font-bold text-green-500">
        Payment Successful 🎉
      </h1>
      <p className="mt-3">Your booking has been confirmed.</p>
    </div>
  );
}