"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdvertisementSection() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdvertisements();
  }, []);

  const fetchAdvertisements = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/advertisements`,
      );

      const data = await res.json();

      setTickets(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-[#1c120d] text-white">
        <div className="max-w-7xl mx-auto px-5">
          <h2 className="text-3xl font-bold mb-8">Featured Tickets</h2>

          <p>Loading advertisements...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-[#1c120d] text-white">
      <div className="max-w-7xl mx-auto px-5">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">Featured Tickets</h2>

          <p className="text-[#c8a27a] mt-3">
            Handpicked tickets promoted by our administrators
          </p>
        </div>

        {/* Tickets */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {tickets.map((ticket) => (
            <div
              key={ticket._id}
              className="bg-[#2a1a14] rounded-2xl overflow-hidden border border-[#c8a27a]/20 hover:border-[#c8a27a]/50 transition"
            >
              {/* Image */}
              <img
                src={ticket.image}
                alt={ticket.title}
                className="h-56 w-full object-cover"
              />

              {/* Content */}
              <div className="p-5">
                <h3 className="text-xl font-bold mb-2">{ticket.title}</h3>

                <div className="space-y-2 text-sm text-[#e6d5c3]">
                  <p>
                    <span className="text-[#c8a27a]">Transport:</span>{" "}
                    {ticket.transportType}
                  </p>

                  <p>
                    <span className="text-[#c8a27a]">Price:</span> $
                    {ticket.price}
                  </p>

                  <p>
                    <span className="text-[#c8a27a]">Quantity:</span>{" "}
                    {ticket.quantity}
                  </p>
                </div>

                {/* Perks */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {ticket.perks?.map((perk) => (
                    <span
                      key={perk}
                      className="px-3 py-1 rounded-full text-xs bg-[#1c120d] border border-[#c8a27a]/20"
                    >
                      {perk}
                    </span>
                  ))}
                </div>

                {/* Details Button */}
                <Link
                  href={`/tickets/${ticket._id}`}
                  className="mt-5 inline-block w-full text-center bg-gradient-to-r from-[#c8a27a] to-[#e6c29f] text-[#1c120d] py-3 rounded-xl font-semibold hover:opacity-90 transition"
                >
                  See Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        {tickets.length === 0 && (
          <div className="text-center py-16 text-[#c8a27a]">
            No advertised tickets available.
          </div>
        )}
      </div>
    </section>
  );
}
