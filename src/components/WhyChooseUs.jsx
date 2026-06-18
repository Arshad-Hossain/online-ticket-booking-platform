"use client";

import {
  ShieldCheck,
  Clock3,
  CreditCard,
  Headphones,
  Ticket,
  MapPinned,
} from "lucide-react";

const features = [
  {
    icon: Ticket,
    title: "Easy Ticket Booking",
    description:
      "Book bus and train tickets in just a few clicks without waiting in long queues.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    description:
      "Your transactions are protected with trusted and secure payment methods.",
  },
  {
    icon: Clock3,
    title: "24/7 Availability",
    description:
      "Search and book tickets anytime, anywhere from your mobile or desktop.",
  },
  {
    icon: Headphones,
    title: "Customer Support",
    description:
      "Our support team is ready to assist you whenever you need help.",
  },
  {
    icon: MapPinned,
    title: "Nationwide Routes",
    description:
      "Access popular bus and train routes across the country from one platform.",
  },
  {
    icon: CreditCard,
    title: "Instant Confirmation",
    description:
      "Get immediate booking confirmation and travel with confidence.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-[#1c120d] py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-2 rounded-full bg-[#c8a27a]/10 text-[#c8a27a] text-sm mb-4">
            Why TicketBari?
          </span>

          <h2 className="text-3xl md:text-4xl font-bold text-[#f5e6d3]">
            Why Choose Us?
          </h2>

          <p className="mt-4 max-w-2xl mx-auto text-[#c8a27a]">
            We make ticket booking simple, secure, and convenient so you can
            focus on your journey instead of the booking process.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="bg-[#2a1a14] border border-[#c8a27a]/20 rounded-2xl p-6 hover:border-[#c8a27a]/50 transition duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#c8a27a]/10 flex items-center justify-center mb-5">
                  <Icon size={28} className="text-[#e6c29f]" />
                </div>

                <h3 className="text-xl font-semibold text-[#f5e6d3] mb-3">
                  {feature.title}
                </h3>

                <p className="text-[#d8c2a8] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
