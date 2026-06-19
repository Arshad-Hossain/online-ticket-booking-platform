"use client";

import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";

export default function VendorBookingRequestsPage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // FETCH BOOKINGS
  useEffect(() => {
    if (!user?.email) return;

    const fetchBookings = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/bookings/vendor/${user.email}`,
        );

        const data = await res.json();
        setBookings(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  // ACCEPT / REJECT
  const handleStatus = async (id, status) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status } : b)),
      );
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return <p className="text-white p-6">Loading...</p>;
  }

  return (
    <div className="w-full min-h-screen bg-[#1c120d] text-white p-6">
      <h1 className="text-2xl font-bold mb-6">Requested Bookings</h1>

      <div className="overflow-x-auto">
        <table className="w-full border border-white/10">
          <thead className="bg-[#2a1a14]">
            <tr>
              <th className="p-3 text-left">User</th>
              <th className="p-3 text-left">Ticket</th>
              <th className="p-3 text-left">Quantity</th>
              <th className="p-3 text-left">Total Price</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((b) => (
              <tr key={b._id} className="border-t border-white/10">
                <td className="p-3">
                  <p>{b.userName}</p>
                  <p className="text-xs text-gray-400">{b.userEmail}</p>
                </td>

                <td className="p-3">{b.ticketTitle}</td>

                <td className="p-3">{b.quantity}</td>

                <td className="p-3">${b.unitPrice * b.quantity}</td>

                <td className="p-3 capitalize">{b.status || "pending"}</td>

                <td className="p-3 flex gap-2">
                  <button
                    disabled={b.status === "rejected"}
                    onClick={() => handleStatus(b._id, "accepted")}
                    className="px-3 py-1 bg-green-600 rounded disabled:opacity-40"
                  >
                    Accept
                  </button>

                  <button
                    disabled={b.status === "rejected"}
                    onClick={() => handleStatus(b._id, "rejected")}
                    className="px-3 py-1 bg-red-600 rounded disabled:opacity-40"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {bookings.length === 0 && (
          <p className="text-gray-400 mt-6">No booking requests yet.</p>
        )}
      </div>
    </div>
  );
}
