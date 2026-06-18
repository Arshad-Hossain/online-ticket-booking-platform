"use client";

import Link from "next/link";
import { Train, Mail, Phone, CreditCard } from "lucide-react";
import { FaFacebookF } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-[#1c120d] border-t border-[#c8a27a]/20 text-[#e6d5c3]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1 - Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-r from-[#c8a27a] to-[#e6c29f] p-2 rounded-xl shadow-lg">
                <Train className="w-5 h-5 text-[#1c120d]" />
              </div>

              <div>
                <h2 className="text-xl font-bold text-[#f5e6d3]">TicketBari</h2>
                <p className="text-xs text-[#c8a27a]">Smart Travel Booking</p>
              </div>
            </div>

            <p className="text-sm text-[#d8c2a8] leading-6">
              Book bus, train, launch & flight tickets easily from anywhere.
              Fast, secure and reliable ticket booking platform for your
              journey.
            </p>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="text-[#f5e6d3] font-semibold mb-4">Quick Links</h3>

            <ul className="space-y-3">
              <li>
                <Link href="/" className="hover:text-[#e6c29f] transition">
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/tickets"
                  className="hover:text-[#e6c29f] transition"
                >
                  All Tickets
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="hover:text-[#e6c29f] transition"
                >
                  Contact Us
                </Link>
              </li>

              <li>
                <Link href="/about" className="hover:text-[#e6c29f] transition">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Contact Info */}
          <div>
            <h3 className="text-[#f5e6d3] font-semibold mb-4">Contact Info</h3>

            <div className="space-y-4 text-sm text-[#d8c2a8]">
              <div className="flex items-center gap-3">
                <Mail size={16} />
                <span>support@ticketbari.com</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={16} />
                <span>+880 1234-567890</span>
              </div>

              <div className="flex items-center gap-3">
                <FaFacebookF size={14} />
                <span>facebook.com/ticketbari</span>
              </div>
            </div>
          </div>

          {/* Column 4 - Payment Methods */}
          <div>
            <h3 className="text-[#f5e6d3] font-semibold mb-4">
              Payment Methods
            </h3>

            <div className="space-y-4">
              <div className="flex items-center gap-3 bg-[#2a1a14] border border-[#c8a27a]/20 rounded-xl p-3">
                <CreditCard size={20} className="text-[#e6c29f]" />
                <span>Stripe</span>
              </div>

              <p className="text-sm text-[#d8c2a8]">
                Secure online payments with industry-standard encryption and
                protection.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#c8a27a]/20 mt-10 pt-6 text-center text-sm text-[#c8a27a]">
          © 2026 TicketBari. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
