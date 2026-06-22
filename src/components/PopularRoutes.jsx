"use client";

import Link from "next/link";
import { ArrowRight, Train, Bus } from "lucide-react";

const routes = [
  {
    from: "Dhaka",
    to: "Chattogram",
    type: "Bus",
    icon: Bus,
    duration: "6-7 Hours",
  },
  {
    from: "Dhaka",
    to: "Sylhet",
    type: "Train",
    icon: Train,
    duration: "5-6 Hours",
  },
  {
    from: "Dhaka",
    to: "Rajshahi",
    type: "Train",
    icon: Train,
    duration: "4-5 Hours",
  },
  {
    from: "Dhaka",
    to: "Khulna",
    type: "Bus",
    icon: Bus,
    duration: "7-8 Hours",
  },
  {
    from: "Chattogram",
    to: "Cox's Bazar",
    type: "Bus",
    icon: Bus,
    duration: "3-4 Hours",
  },
  {
    from: "Dhaka",
    to: "Rangpur",
    type: "Bus",
    icon: Bus,
    duration: "8-9 Hours",
  },
];

const PopularRoutes = () => {
  return (
    <section className="bg-[#2a1a14] py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-[#f5e6d3]">
            Popular Routes
          </h2>

          <p className="mt-3 text-[#c8a27a] max-w-2xl mx-auto">
            Explore the most booked bus and train routes across Bangladesh.
            Travel comfortably with TicketBari.
          </p>
        </div>

        {/* Route Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {routes.map((route, index) => {
            const Icon = route.icon;

            return (
              <div
                key={index}
                className="bg-[#1c120d] border border-[#c8a27a]/20 rounded-2xl p-6 hover:border-[#c8a27a]/50 transition duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="bg-[#c8a27a]/10 p-3 rounded-xl">
                    <Icon className="text-[#e6c29f]" size={24} />
                  </div>

                  <span className="text-xs px-3 py-1 rounded-full bg-[#c8a27a]/10 text-[#e6c29f]">
                    {route.type}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-[#f5e6d3]">
                    {route.from}
                  </h3>

                  <ArrowRight className="text-[#c8a27a]" size={18} />

                  <h3 className="text-lg font-bold text-[#f5e6d3]">
                    {route.to}
                  </h3>
                </div>

                <p className="mt-4 text-sm text-[#c8a27a]">
                  Estimated Duration: {route.duration}
                </p>

                <Link
                  href="/all-tickets"
                  className="mt-6 inline-block text-[#e6c29f] hover:text-[#f5e6d3] font-medium"
                >
                  View Tickets →
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PopularRoutes;
