"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Calendar, Clock, MapPin } from "lucide-react";

export default function MyBookedTicketsPage() {
  const { data: session } = authClient.useSession();

  const [bookings, setBookings] = useState([]);
  const [countdowns, setCountdowns] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.email) {
      fetchBookings();
    }
  }, [session]);

  const fetchBookings = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/bookings/user/${session.user.email}`,
      );

      const data = await res.json();

      setBookings(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const newCountdowns = {};

      bookings.forEach((booking) => {
        if (booking.status === "rejected") return;

        const departure = new Date(
          `${booking.departureDate}T${booking.departureTime}`,
        ).getTime();

        const now = Date.now();

        const diff = departure - now;

        if (diff <= 0) {
          newCountdowns[booking._id] = "Departed";
          return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        newCountdowns[booking._id] =
          `${days}d ${hours}h ${minutes}m ${seconds}s`;
      });

      setCountdowns(newCountdowns);
    }, 1000);

    return () => clearInterval(interval);
  }, [bookings]);

  const handlePayNow = async (booking) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/stripe/checkout`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ booking }),
        },
      );

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url; // redirect to Stripe
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div className="text-white p-10">Loading bookings...</div>;
  }

  return (
    <div className="w-full p-6 text-white">
      <h1 className="text-3xl font-bold mb-8">My Booked Tickets</h1>

      {bookings.length === 0 ? (
        <div className="text-center py-20 text-[#c8a27a]">
          No bookings found
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {bookings.map((booking) => {
            const totalPrice = booking.unitPrice * booking.quantity;

            return (
              <div
                key={booking._id}
                className="bg-[#2a1a14] rounded-2xl overflow-hidden border border-[#c8a27a]/20"
              >
                <img
                  src={booking.image || "/placeholder.jpg"}
                  alt={booking.title}
                  className="w-full h-52 object-cover"
                />

                <div className="p-5">
                  <h2 className="text-xl font-bold mb-3">{booking.title}</h2>

                  <div className="space-y-2 text-sm text-[#e6d5c3]">
                    <p>
                      <span className="text-[#c8a27a]">Quantity:</span>
                      {booking.quantity}
                    </p>

                    <p>
                      <span className="text-[#c8a27a]">Total Price:</span> $
                      {totalPrice}
                    </p>

                    <p className="flex items-center gap-2">
                      <MapPin size={16} />
                      {booking.from} → {booking.to}
                    </p>

                    <p className="flex items-center gap-2">
                      <Calendar size={16} />
                      {booking.departureDate}
                    </p>

                    <p className="flex items-center gap-2">
                      <Clock size={16} />
                      {booking.departureTime}
                    </p>

                    <p>
                      <span className="text-[#c8a27a]">Status:</span>{" "}
                      <span
                        className={`font-semibold ${
                          booking.status === "accepted"
                            ? "text-green-400"
                            : booking.status === "rejected"
                              ? "text-red-400"
                              : booking.status === "paid"
                                ? "text-blue-400"
                                : "text-yellow-400"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </p>
                  </div>

                  {booking.status !== "rejected" && (
                    <div className="mt-4 p-3 rounded-xl bg-[#1c120d]">
                      <p className="text-xs text-[#c8a27a]">
                        Departure Countdown
                      </p>

                      <p className="font-bold mt-1">
                        {countdowns[booking._id]}
                      </p>
                    </div>
                  )}

                  {booking.status === "accepted" && (
                    <button
                      onClick={() => handlePayNow(booking)}
                      className="w-full mt-5 py-3 rounded-xl bg-gradient-to-r from-[#c8a27a] to-[#e6c29f] text-[#1c120d] font-semibold"
                    >
                      Pay Now
                    </button>
                  )}

                  {booking.status === "paid" && (
                    <div className="mt-5 text-center py-3 rounded-xl bg-green-600 text-white font-semibold">
                      Payment Completed
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
