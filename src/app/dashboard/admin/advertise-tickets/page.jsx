"use client";

import { useEffect, useState } from "react";

export default function AdvertiseTicketsPage() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTickets = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/advertisements`,
      );

      const data = await res.json();

      if (Array.isArray(data)) {
        setTickets(data);
      } else {
        setTickets([]);
      }
    } catch (error) {
      console.error("Failed to load tickets:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleToggleAdvertisement = async (id) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/advertisements/${id}`,
        {
          method: "PATCH",
        },
      );

      const data = await res.json();

      if (!data.success) {
        alert(data.message || "Failed to update advertisement");
        return;
      }

      alert(data.message);

      fetchTickets();
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-white">
        <h1 className="text-3xl font-bold mb-6">Advertise Tickets</h1>
        <p>Loading tickets...</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#1c120d] text-white p-6">
      <h1 className="text-3xl font-bold mb-2">Advertise Tickets</h1>

      <p className="text-[#c8a27a] mb-8">
        Maximum 6 approved tickets can be advertised.
      </p>

      <div className="overflow-x-auto rounded-2xl border border-[#c8a27a]/20">
        <table className="w-full">
          <thead className="bg-[#2a1a14]">
            <tr>
              <th className="p-4 text-left">Title</th>
              <th className="p-4 text-left">Route</th>
              <th className="p-4 text-left">Transport</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Vendor</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket._id} className="border-t border-[#c8a27a]/10">
                <td className="p-4">{ticket.title}</td>

                <td className="p-4">
                  {ticket.from} → {ticket.to}
                </td>

                <td className="p-4">{ticket.transportType}</td>

                <td className="p-4">${ticket.price}</td>

                <td className="p-4">{ticket.vendorName}</td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      ticket.isAdvertised ? "bg-green-600" : "bg-gray-600"
                    }`}
                  >
                    {ticket.isAdvertised ? "Advertised" : "Not Advertised"}
                  </span>
                </td>

                <td className="p-4">
                  <button
                    onClick={() => handleToggleAdvertisement(ticket._id)}
                    className={`px-4 py-2 rounded-lg font-semibold transition ${
                      ticket.isAdvertised
                        ? "bg-red-600 hover:bg-red-700"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    {ticket.isAdvertised ? "Remove" : "Advertise"}
                  </button>
                </td>
              </tr>
            ))}

            {tickets.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-10 text-gray-400">
                  No approved tickets available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
