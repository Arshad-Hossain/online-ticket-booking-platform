"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function PaymentSuccessPage() {
  const params = useSearchParams();
  const router = useRouter();

  const bookingId = params.get("bookingId");
  const sessionId = params.get("session_id");

  useEffect(() => {
    const confirmPayment = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/payments/confirm`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              bookingId,
              sessionId,
            }),
          },
        );

        const data = await res.json();

        if (data.success) {
          router.push("/my-booked-tickets");
        }
      } catch (err) {
        console.error(err);
      }
    };

    if (bookingId && sessionId) {
      confirmPayment();
    }
  }, [bookingId, sessionId]);

  return <div className="text-white p-10">Processing payment...</div>;
}
