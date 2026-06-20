"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Calendar, Clock, MapPin, Bus, Train, User } from "lucide-react";

export default function TicketDetailsPage() {
  const { id } = useParams();

  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTicket();
  }, [id]);

  const fetchTicket = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/tickets/${id}`,
      );

      const data = await res.json();

      setTicket(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1c120d] text-white flex justify-center items-center">
        Loading Ticket...
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="min-h-screen bg-[#1c120d] text-white flex justify-center items-center">
        Ticket not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1c120d] text-white pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-5">
        <div className="grid lg:grid-cols-2 gap-10">
          {/* IMAGE */}
          <div>
            <img
              src={ticket.image}
              alt={ticket.title}
              className="w-full h-[450px] object-cover rounded-3xl border border-[#c8a27a]/20"
            />
          </div>

          {/* DETAILS */}
          <div>
            <h1 className="text-4xl font-bold mb-4">{ticket.title}</h1>

            <div className="space-y-4 text-[#e6d5c3]">
              <div className="flex items-center gap-3">
                <MapPin className="text-[#c8a27a]" size={18} />
                <span>
                  {ticket.from} → {ticket.to}
                </span>
              </div>

              <div className="flex items-center gap-3">
                {ticket.transportType === "Train" ? (
                  <Train className="text-[#c8a27a]" size={18} />
                ) : (
                  <Bus className="text-[#c8a27a]" size={18} />
                )}

                <span>{ticket.transportType}</span>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="text-[#c8a27a]" size={18} />

                <span>{ticket.departureDate}</span>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="text-[#c8a27a]" size={18} />

                <span>{ticket.departureTime}</span>
              </div>

              <div className="flex items-center gap-3">
                <User className="text-[#c8a27a]" size={18} />

                <span>{ticket.vendorName}</span>
              </div>
            </div>

            {/* PRICE CARD */}
            <div className="mt-8 bg-[#2a1a14] border border-[#c8a27a]/20 rounded-2xl p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-[#c8a27a] text-sm">Ticket Price</p>

                  <h2 className="text-4xl font-bold mt-2">${ticket.price}</h2>
                </div>

                <div>
                  <p className="text-[#c8a27a] text-sm">Available Seats</p>

                  <h2 className="text-3xl font-bold mt-2">{ticket.quantity}</h2>
                </div>
              </div>
            </div>

            {/* PERKS */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Perks Included</h3>

              <div className="flex flex-wrap gap-3">
                {ticket.perks?.map((perk) => (
                  <span
                    key={perk}
                    className="px-4 py-2 rounded-full bg-[#2a1a14] border border-[#c8a27a]/20"
                  >
                    {perk}
                  </span>
                ))}
              </div>
            </div>

            {/* BOOK BUTTON */}
            <button className="w-full mt-10 py-4 rounded-xl bg-gradient-to-r from-[#c8a27a] to-[#e6c29f] text-[#1c120d] font-bold text-lg hover:opacity-90 transition">
              Book Ticket
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
