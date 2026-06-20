"use client";

import { useEffect, useState } from "react";

export default function AdvertiseTicketsPage() {
  const [tickets, setTickets] = useState([]);

  const fetchTickets = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/advertisements`,
    );

    const data = await res.json();
    setTickets(data);
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleToggle = async (id) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/advertisements/${id}`,
      {
        method: "PATCH",
      },
    );

    const data = await res.json();

    if (!data.success) {
      alert(data.message);
      return;
    }

    fetchTickets();
  };

  return (
    <div className="w-full p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Advertise Tickets</h1>

      <div className="overflow-x-auto rounded-xl border border-[#c8a27a]/20">
        <table className="w-full">
          <thead className="bg-[#2a1a14]">
            <tr>
              <th className="p-4 text-left">Title</th>
              <th className="p-4 text-left">Route</th>
              <th className="p-4 text-left">Vendor</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Advertise</th>
            </tr>
          </thead>

          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket._id} className="border-t border-[#c8a27a]/10">
                <td className="p-4">{ticket.title}</td>

                <td className="p-4">
                  {ticket.from} → {ticket.to}
                </td>

                <td className="p-4">{ticket.vendorName}</td>

                <td className="p-4">${ticket.price}</td>

                <td className="p-4">
                  <button
                    onClick={() => handleToggle(ticket._id)}
                    className={`px-4 py-2 rounded-lg font-semibold ${
                      ticket.isAdvertised ? "bg-red-600" : "bg-green-600"
                    }`}
                  >
                    {ticket.isAdvertised ? "Unadvertise" : "Advertise"}
                  </button>
                </td>
              </tr>
            ))}

            {tickets.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-10 text-gray-400">
                  No approved tickets found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-sm text-[#c8a27a]">
        Maximum 6 tickets can be advertised at a time.
      </p>
    </div>
  );
}
