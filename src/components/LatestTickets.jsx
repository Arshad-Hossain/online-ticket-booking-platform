"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function LatestTickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLatestTickets();
  }, []);

  const fetchLatestTickets = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/latest-tickets`,
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
          <h2 className="text-4xl font-bold">Latest Tickets</h2>

          <p className="mt-4 text-[#c8a27a]">Loading latest tickets...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-[#1c120d] text-white">
      <div className="max-w-7xl mx-auto px-5">
        {/* Heading */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold">Latest Tickets</h2>

          <p className="text-[#c8a27a] mt-3">
            Recently added bus and train tickets
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {tickets.map((ticket) => (
            <div
              key={ticket._id}
              className="bg-[#2a1a14] rounded-2xl overflow-hidden border border-[#c8a27a]/20 hover:border-[#c8a27a]/50 transition"
            >
              {/* Image */}
              <img
                src={ticket.image}
                alt={ticket.title}
                className="w-full h-52 object-cover"
              />

              {/* Body */}
              <div className="p-5">
                <h3 className="font-bold text-lg mb-3 line-clamp-2">
                  {ticket.title}
                </h3>

                <div className="space-y-2 text-sm">
                  <p>
                    <span className="text-[#c8a27a]">Price:</span> $
                    {ticket.price}
                  </p>

                  <p>
                    <span className="text-[#c8a27a]">Quantity:</span>{" "}
                    {ticket.quantity}
                  </p>

                  <p>
                    <span className="text-[#c8a27a]">Transport:</span>{" "}
                    {ticket.transportType}
                  </p>
                </div>

                {/* Perks */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {ticket.perks?.slice(0, 3).map((perk) => (
                    <span
                      key={perk}
                      className="px-2 py-1 text-xs rounded-full bg-[#1c120d] border border-[#c8a27a]/20"
                    >
                      {perk}
                    </span>
                  ))}
                </div>

                {/* Button */}
                <Link
                  href={`/all-tickets/${ticket._id}`}
                  className="block text-center mt-5 py-3 rounded-xl bg-gradient-to-r from-[#c8a27a] to-[#e6c29f] text-[#1c120d] font-semibold"
                >
                  See Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        {tickets.length === 0 && (
          <div className="text-center py-12 text-[#c8a27a]">
            No tickets available.
          </div>
        )}
      </div>
    </section>
  );
}
