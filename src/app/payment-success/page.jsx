"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function PaymentSuccessPage() {
  const params = useSearchParams();
  const router = useRouter();

  const bookingId = params.get("bookingId");
  const sessionId = params.get("session_id");

  const [status, setStatus] = useState("Processing payment...");

  useEffect(() => {
    const confirmPayment = async () => {
      if (!bookingId || !sessionId) return;

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/payments/confirm`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ bookingId, sessionId }),
          },
        );

        const data = await res.json();

        if (data.success) {
          setStatus("Payment successful 🎉 Redirecting...");

          // ✅ delay redirect to avoid 404 flash
          setTimeout(() => {
            router.replace("/dashboard/user/my-booked-tickets");
          }, 2000);
        } else {
          setStatus("Payment verification failed");
        }
      } catch (err) {
        console.error(err);
        setStatus("Something went wrong");
      }
    };

    confirmPayment();
  }, [bookingId, sessionId, router]);

  return (
    <div className="text-white p-10 text-center">
      <h1 className="text-2xl font-bold mb-3">Payment Status</h1>
      <p>{status}</p>
    </div>
  );
}
