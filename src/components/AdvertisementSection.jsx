"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdvertisementSection() {
  const [tickets, setTickets] = useState([]);

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
    }
  };

  return (
    <section className="py-20 bg-[#1c120d] text-white">
      <div className="max-w-7xl mx-auto px-5">
        <h2 className="text-4xl font-bold mb-10">Featured Advertisements</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tickets.map((ticket) => (
            <div
              key={ticket._id}
              className="bg-[#2a1a14] rounded-2xl overflow-hidden border border-[#c8a27a]/20"
            >
              <img
                src={ticket.image}
                alt={ticket.title}
                className="w-full h-56 object-cover"
              />

              <div className="p-5">
                <h3 className="text-xl font-bold mb-3">{ticket.title}</h3>

                <div className="space-y-2 text-sm text-[#e6d5c3]">
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

                  <div>
                    <p className="text-[#c8a27a] mb-2">Perks</p>

                    <div className="flex flex-wrap gap-2">
                      {ticket.perks?.map((perk) => (
                        <span
                          key={perk}
                          className="px-2 py-1 rounded-full text-xs bg-[#1c120d]"
                        >
                          {perk}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <Link
                  href={`/all-tickets/${ticket._id}`}
                  className="block mt-5 text-center py-3 rounded-xl bg-gradient-to-r from-[#c8a27a] to-[#e6c29f] text-[#1c120d] font-bold"
                >
                  See Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
