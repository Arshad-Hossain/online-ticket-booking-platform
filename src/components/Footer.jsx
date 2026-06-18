"use client";

import Link from "next/link";
import { Train, Mail, Phone, MapPin } from "lucide-react";
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-[#1c120d] border-t border-[#c8a27a]/20 text-[#e6d5c3]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-r from-[#c8a27a] to-[#e6c29f] p-2 rounded-xl shadow-lg">
                <Train className="w-5 h-5 text-[#1c120d]" />
              </div>

              <div>
                <h2 className="text-xl font-bold text-[#f5e6d3]">TicketBari</h2>
                <p className="text-xs text-[#c8a27a]">
                  Bus & Train Ticket Booking
                </p>
              </div>
            </div>

            <p className="text-sm text-[#d8c2a8] leading-6">
              Book bus and train tickets quickly and securely. Travel smarter
              with TicketBari and enjoy a warm, smooth booking experience ☕
            </p>
          </div>

          {/* Quick Links */}
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
                <Link href="/login" className="hover:text-[#e6c29f] transition">
                  Login
                </Link>
              </li>

              <li>
                <Link
                  href="/register"
                  className="hover:text-[#e6c29f] transition"
                >
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-[#f5e6d3] font-semibold mb-4">Support</h3>

            <ul className="space-y-3">
              <li>
                <Link
                  href="/contact"
                  className="hover:text-[#e6c29f] transition"
                >
                  Contact Us
                </Link>
              </li>

              <li>
                <Link href="/faq" className="hover:text-[#e6c29f] transition">
                  FAQ
                </Link>
              </li>

              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:text-[#e6c29f] transition"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link href="/terms" className="hover:text-[#e6c29f] transition">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-[#f5e6d3] font-semibold mb-4">Contact</h3>

            <div className="space-y-3 text-sm text-[#d8c2a8]">
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <span>support@ticketbari.com</span>
              </div>

              <div className="flex items-center gap-2">
                <Phone size={16} />
                <span>+880 1234-567890</span>
              </div>

              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span>Dhaka, Bangladesh</span>
              </div>
            </div>

            {/* Social */}
            <div className="flex items-center gap-3 mt-6">
              <a
                href="#"
                className="bg-[#2a1a14] p-2 rounded-full hover:bg-[#c8a27a] hover:text-[#1c120d] transition"
              >
                <FaFacebookF size={16} />
              </a>

              <a
                href="#"
                className="bg-[#2a1a14] p-2 rounded-full hover:bg-[#c8a27a] hover:text-[#1c120d] transition"
              >
                <FaInstagram size={16} />
              </a>

              <a
                href="#"
                className="bg-[#2a1a14] p-2 rounded-full hover:bg-[#c8a27a] hover:text-[#1c120d] transition"
              >
                <FaXTwitter size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#c8a27a]/20 mt-10 pt-6 text-center text-sm text-[#c8a27a]">
          © {new Date().getFullYear()} TicketBari. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
