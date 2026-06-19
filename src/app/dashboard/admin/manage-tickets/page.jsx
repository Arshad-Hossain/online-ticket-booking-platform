"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function ManageTicketsPage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  // FETCH TICKETS
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/tickets`,
        );

        const data = await res.json();
        setTickets(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  // UPDATE STATUS
  const handleStatus = async (id, status) => {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/tickets/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        },
      );

      setTickets((prev) =>
        prev.map((t) =>
          t._id === id ? { ...t, verificationStatus: status } : t,
        ),
      );
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return <p className="text-white p-6">Loading tickets...</p>;
  }

  return (
    <div className="w-full min-h-screen bg-[#1c120d] text-white p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Tickets</h1>

      <div className="overflow-x-auto">
        <table className="w-full border border-white/10">
          <thead className="bg-[#2a1a14]">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Vendor</th>
              <th className="p-3 text-left">Route</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {tickets.map((t) => (
              <tr key={t._id} className="border-t border-white/10">
                <td className="p-3">{t.title}</td>

                <td className="p-3">
                  <p>{t.vendorName}</p>
                  <p className="text-xs text-gray-400">{t.vendorEmail}</p>
                </td>

                <td className="p-3">
                  {t.from} → {t.to}
                </td>

                <td className="p-3">${t.price}</td>

                <td className="p-3 capitalize">
                  {t.verificationStatus || "pending"}
                </td>

                <td className="p-3 flex gap-2">
                  <button
                    disabled={t.verificationStatus === "rejected"}
                    onClick={() => handleStatus(t._id, "approved")}
                    className="px-3 py-1 bg-green-600 rounded disabled:opacity-40"
                  >
                    Approve
                  </button>

                  <button
                    disabled={t.verificationStatus === "approved"}
                    onClick={() => handleStatus(t._id, "rejected")}
                    className="px-3 py-1 bg-red-600 rounded disabled:opacity-40"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {tickets.length === 0 && (
          <p className="text-gray-400 mt-6">No tickets found</p>
        )}
      </div>
    </div>
  );
}
