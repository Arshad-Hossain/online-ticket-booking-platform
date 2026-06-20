"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AllTicketsPage() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/tickets`,
      );

      const data = await res.json();
      setTickets(data);
    } catch (error) {
      console.error("Failed to fetch tickets:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1c120d] text-white flex items-center justify-center">
        <p className="text-lg">Loading tickets...</p>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#1c120d] text-white py-16">
      <div className="max-w-7xl mx-auto px-5">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold">All Tickets</h1>
          <p className="text-[#c8a27a] mt-3">
            Browse all admin-approved tickets
          </p>
        </div>

        {/* Tickets Grid */}
        {tickets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {tickets.map((ticket) => (
              <div
                key={ticket._id}
                className="bg-[#2a1a14] rounded-2xl overflow-hidden border border-[#c8a27a]/20 hover:border-[#c8a27a]/50 transition duration-300"
              >
                {/* Image */}
                <img
                  src={ticket.image}
                  alt={ticket.title}
                  className="w-full h-56 object-cover"
                />

                {/* Content */}
                <div className="p-5">
                  <h2 className="text-xl font-bold mb-3">{ticket.title}</h2>

                  <div className="space-y-2 text-sm text-[#e6d5c3]">
                    <p>
                      <span className="text-[#c8a27a] font-medium">Route:</span>{" "}
                      {ticket.from} → {ticket.to}
                    </p>

                    <p>
                      <span className="text-[#c8a27a] font-medium">
                        Transport:
                      </span>{" "}
                      {ticket.transportType}
                    </p>

                    <p>
                      <span className="text-[#c8a27a] font-medium">Price:</span>{" "}
                      ${ticket.price}
                    </p>

                    <p>
                      <span className="text-[#c8a27a] font-medium">
                        Quantity:
                      </span>{" "}
                      {ticket.quantity}
                    </p>

                    <p>
                      <span className="text-[#c8a27a] font-medium">
                        Departure:
                      </span>{" "}
                      {ticket.departureDate} at {ticket.departureTime}
                    </p>
                  </div>

                  {/* Perks */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {ticket.perks?.map((perk) => (
                      <span
                        key={perk}
                        className="px-3 py-1 text-xs rounded-full bg-[#1c120d] border border-[#c8a27a]/20"
                      >
                        {perk}
                      </span>
                    ))}
                  </div>

                  {/* Details Button */}
                  <Link
                    href={`/all-tickets/${ticket._id}`}
                    className="block mt-6"
                  >
                    <button className="w-full py-3 rounded-xl bg-gradient-to-r from-[#c8a27a] to-[#e6c29f] text-[#1c120d] font-semibold hover:opacity-90 transition">
                      See Details
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-[#c8a27a]">
            No approved tickets available.
          </div>
        )}
      </div>
    </section>
  );
}
