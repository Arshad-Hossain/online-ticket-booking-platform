"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

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
              <span className="text-[#e6c29f]"> Bus, Train & Flight </span>
              Tickets Easily
            </h1>

            <p className="mt-6 text-lg text-[#d8c2a8] leading-relaxed">
              Travel smarter with TicketBari. Compare routes, reserve seats, and
              book tickets online in just a few clicks.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/all-tickets"
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

          {/* Right Content - Transport Images */}
          <div className="grid grid-cols-2 gap-4">
            {/* Plane */}
            <div className="col-span-2 relative group overflow-hidden rounded-3xl">
              <img
                src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop"
                alt="Plane"
                className="w-full h-64 object-cover shadow-2xl group-hover:scale-105 transition duration-500"
              />

              <div className="absolute inset-0 bg-black/30"></div>

              <div className="absolute bottom-4 left-4">
                <span className="bg-[#1c120d]/80 backdrop-blur-sm px-4 py-2 rounded-xl text-[#e6c29f] font-semibold">
                  ✈️ Flight Tickets
                </span>
              </div>
            </div>

            {/* Train */}
            <div className="relative group overflow-hidden rounded-3xl">
              <img
                src="https://images.unsplash.com/photo-1474487548417-781cb71495f3?q=80&w=1200&auto=format&fit=crop"
                alt="Train"
                className="w-full h-52 object-cover shadow-xl group-hover:scale-105 transition duration-500"
              />

              <div className="absolute inset-0 bg-black/30"></div>

              <div className="absolute bottom-4 left-4">
                <span className="bg-[#1c120d]/80 backdrop-blur-sm px-3 py-2 rounded-xl text-[#e6c29f] font-semibold text-sm">
                  🚆 Train Tickets
                </span>
              </div>
            </div>

            {/* Bus */}
            <div className="relative group overflow-hidden rounded-3xl">
              <img
                src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1200&auto=format&fit=crop"
                alt="Bus"
                className="w-full h-52 object-cover shadow-xl group-hover:scale-105 transition duration-500"
              />

              <div className="absolute inset-0 bg-black/30"></div>

              <div className="absolute bottom-4 left-4">
                <span className="bg-[#1c120d]/80 backdrop-blur-sm px-3 py-2 rounded-xl text-[#e6c29f] font-semibold text-sm">
                  🚌 Bus Tickets
                </span>
              </div>
            </div>
          </div>
          {/* End Right Content */}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
