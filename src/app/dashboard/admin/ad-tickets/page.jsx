"use client";

import { useEffect, useState } from "react";

export default function AdvertiseTicketsPage() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/advertisements`,
      );

      const data = await res.json();
      setTickets(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (ticketId) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/advertisements/${ticketId}`,
        {
          method: "PATCH",
        },
      );

      const data = await res.json();

      if (!data.success) {
        alert(data.message);
        return;
      }

      setTickets((prev) =>
        prev.map((ticket) =>
          ticket._id === ticketId
            ? {
                ...ticket,
                isAdvertised: !ticket.isAdvertised,
              }
            : ticket,
        ),
      );
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <div className="p-8 text-white">Loading tickets...</div>;
  }

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Advertise Tickets</h1>

      <div className="overflow-x-auto rounded-xl border border-[#c8a27a]/20">
        <table className="w-full">
          <thead className="bg-[#2a1a14]">
            <tr>
              <th className="p-4 text-left">Image</th>
              <th className="p-4 text-left">Title</th>
              <th className="p-4 text-left">Transport</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Quantity</th>
              <th className="p-4 text-left">Advertise</th>
            </tr>
          </thead>

          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket._id} className="border-t border-[#c8a27a]/10">
                <td className="p-4">
                  <img
                    src={ticket.image}
                    alt={ticket.title}
                    className="w-20 h-14 rounded object-cover"
                  />
                </td>

                <td className="p-4">{ticket.title}</td>

                <td className="p-4">{ticket.transportType}</td>

                <td className="p-4">${ticket.price}</td>

                <td className="p-4">{ticket.quantity}</td>

                <td className="p-4">
                  <button
                    onClick={() => handleToggle(ticket._id)}
                    className={`px-4 py-2 rounded-lg font-medium ${
                      ticket.isAdvertised ? "bg-red-600" : "bg-green-600"
                    }`}
                  >
                    {ticket.isAdvertised ? "Unadvertise" : "Advertise"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
