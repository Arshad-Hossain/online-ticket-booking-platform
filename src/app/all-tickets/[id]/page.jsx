"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Calendar, Clock, MapPin, Bus, Train, User } from "lucide-react";

import { authClient } from "@/lib/auth-client";
import BookingModal from "@/components/BookingModal";

export default function TicketDetailsPage() {
  const { id } = useParams();

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);

  const [countdown, setCountdown] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [bookingQty, setBookingQty] = useState(1);
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    if (id) {
      fetchTicket();
    }
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

  // Countdown
  useEffect(() => {
    if (!ticket) return;

    const interval = setInterval(() => {
      const target = new Date(
        `${ticket.departureDate}T${ticket.departureTime}`,
      ).getTime();

      const now = Date.now();
      const diff = target - now;

      if (diff <= 0) {
        setCountdown("Departure Time Passed");
        clearInterval(interval);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [ticket]);

  // Booking Conditions
  const departureDateTime = ticket
    ? new Date(`${ticket.departureDate}T${ticket.departureTime}`)
    : null;

  const isExpired = departureDateTime
    ? departureDateTime.getTime() < Date.now()
    : false;

  const bookingDisabled = isExpired || Number(ticket?.quantity || 0) === 0;

  // Booking Handler
  const handleBooking = async () => {
    try {
      if (!user?.email) {
        alert("Please login first");
        return;
      }

      if (bookingQty > ticket.quantity) {
        alert("Booking quantity cannot exceed available tickets");
        return;
      }

      setBookingLoading(true);

      const bookingData = {
        ticketId: ticket._id,

        title: ticket.title,
        image: ticket.image,

        from: ticket.from,
        to: ticket.to,

        departureDate: ticket.departureDate,
        departureTime: ticket.departureTime,

        unitPrice: Number(ticket.price),
        quantity: Number(bookingQty),

        totalPrice: Number(ticket.price) * Number(bookingQty),

        vendorEmail: ticket.vendorEmail,
        vendorName: ticket.vendorName,

        userEmail: user.email,
        userName: user.name,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/bookings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingData),
        },
      );

      const data = await res.json();

      if (!data.success) {
        alert(data.message || "Booking failed");
        return;
      }

      alert("Booking submitted successfully");

      setShowModal(false);
      setBookingQty(1);
    } catch (error) {
      console.error(error);
      alert("Booking failed");
    } finally {
      setBookingLoading(false);
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
    <>
      <div className="min-h-screen bg-[#1c120d] text-white pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid lg:grid-cols-2 gap-10">
            {/* Image */}
            <div>
              <img
                src={ticket.image}
                alt={ticket.title}
                className="w-full h-[450px] object-cover rounded-3xl border border-[#c8a27a]/20"
              />
            </div>

            {/* Details */}
            <div>
              <h1 className="text-4xl font-bold mb-5">{ticket.title}</h1>

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

              {/* Countdown */}
              <div className="mt-6 bg-[#2a1a14] border border-[#c8a27a]/20 rounded-xl p-4">
                <p className="text-[#c8a27a] text-sm">Departure Countdown</p>

                <h3 className="text-2xl font-bold mt-2">
                  {countdown || "Calculating..."}
                </h3>
              </div>

              {/* Price Card */}
              <div className="mt-8 bg-[#2a1a14] border border-[#c8a27a]/20 rounded-2xl p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-[#c8a27a] text-sm">Ticket Price</p>

                    <h2 className="text-4xl font-bold mt-2">${ticket.price}</h2>
                  </div>

                  <div>
                    <p className="text-[#c8a27a] text-sm">Available Seats</p>

                    <h2 className="text-3xl font-bold mt-2">
                      {ticket.quantity}
                    </h2>
                  </div>
                </div>
              </div>

              {/* Perks */}
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

              {/* Book Button */}
              <button
                disabled={bookingDisabled}
                onClick={() => setShowModal(true)}
                className={`w-full mt-10 py-4 rounded-xl font-bold text-lg transition ${
                  bookingDisabled
                    ? "bg-gray-600 text-white cursor-not-allowed"
                    : "bg-gradient-to-r from-[#c8a27a] to-[#e6c29f] text-[#1c120d] hover:opacity-90"
                }`}
              >
                {isExpired
                  ? "Departure Passed"
                  : ticket.quantity === 0
                    ? "Sold Out"
                    : "Book Now"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <BookingModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        ticket={ticket}
        bookingQty={bookingQty}
        setBookingQty={setBookingQty}
        onConfirm={handleBooking}
        loading={bookingLoading}
      />
    </>
  );
}
