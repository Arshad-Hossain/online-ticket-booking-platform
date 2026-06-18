"use client";

import Link from "next/link";
import { Train, Bus, ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="bg-[#1c120d] text-[#f5e6d3] pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <span className="inline-flex items-center gap-2 bg-[#2a1a14] border border-[#c8a27a]/20 px-4 py-2 rounded-full text-sm text-[#c8a27a]">
              🚆 Trusted Ticket Booking Platform
            </span>

            <h1 className="mt-6 text-4xl md:text-6xl font-extrabold leading-tight">
              Book Your
              <span className="text-[#e6c29f]"> Bus & Train </span>
              Tickets Easily
            </h1>

            <p className="mt-6 text-lg text-[#d8c2a8] leading-relaxed">
              Travel smarter with TicketBari. Compare routes, reserve seats, and
              book tickets online in just a few clicks.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/tickets"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#c8a27a] to-[#e6c29f] text-[#1c120d] px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
              >
                Book Tickets
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/dashboard"
                className="border border-[#c8a27a]/30 px-6 py-3 rounded-xl text-[#f5e6d3] hover:bg-[#2a1a14] transition"
              >
                Dashboard
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-10 flex flex-wrap gap-8">
              <div>
                <h3 className="text-2xl font-bold text-[#e6c29f]">10K+</h3>
                <p className="text-[#c8a27a] text-sm">Tickets Booked</p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-[#e6c29f]">100+</h3>
                <p className="text-[#c8a27a] text-sm">Routes Available</p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-[#e6c29f]">24/7</h3>
                <p className="text-[#c8a27a] text-sm">Customer Support</p>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="relative">
            <div className="bg-[#2a1a14] border border-[#c8a27a]/20 rounded-3xl p-8 shadow-2xl">
              <div className="flex justify-center gap-8 mb-8">
                <div className="bg-[#c8a27a]/10 p-5 rounded-2xl">
                  <Train size={50} className="text-[#e6c29f]" />
                </div>

                <div className="bg-[#c8a27a]/10 p-5 rounded-2xl">
                  <Bus size={50} className="text-[#e6c29f]" />
                </div>
              </div>

              <h3 className="text-center text-2xl font-bold mb-4">
                Travel Made Simple
              </h3>

              <p className="text-center text-[#d8c2a8]">
                Search destinations, compare schedules, and book your seat
                without standing in long queues.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="bg-[#1c120d] p-4 rounded-xl text-center">
                  <h4 className="font-bold text-[#e6c29f]">Bus</h4>
                  <p className="text-sm text-[#c8a27a]">Fast Booking</p>
                </div>

                <div className="bg-[#1c120d] p-4 rounded-xl text-center">
                  <h4 className="font-bold text-[#e6c29f]">Train</h4>
                  <p className="text-sm text-[#c8a27a]">Secure Tickets</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
