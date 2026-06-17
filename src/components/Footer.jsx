"use client";

import Link from "next/link";
import { Train, Mail, Phone, MapPin } from "lucide-react";
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-white/10 text-slate-300">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-2 rounded-xl">
                <Train className="w-5 h-5 text-white" />
              </div>

              <div>
                <h2 className="text-xl font-bold text-white">TicketBari</h2>
                <p className="text-xs text-slate-400">
                  Bus & Train Ticket Booking
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-6">
              Book bus and train tickets quickly and securely. Travel smarter
              with TicketBari and enjoy a seamless booking experience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>

            <ul className="space-y-3">
              <li>
                <Link href="/" className="hover:text-cyan-400 transition">
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/tickets"
                  className="hover:text-cyan-400 transition"
                >
                  All Tickets
                </Link>
              </li>

              <li>
                <Link href="/login" className="hover:text-cyan-400 transition">
                  Login
                </Link>
              </li>

              <li>
                <Link
                  href="/register"
                  className="hover:text-cyan-400 transition"
                >
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>

            <ul className="space-y-3">
              <li>
                <Link
                  href="/contact"
                  className="hover:text-cyan-400 transition"
                >
                  Contact Us
                </Link>
              </li>

              <li>
                <Link href="/faq" className="hover:text-cyan-400 transition">
                  FAQ
                </Link>
              </li>

              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:text-cyan-400 transition"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link href="/terms" className="hover:text-cyan-400 transition">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>

            <div className="space-y-3 text-sm text-slate-400">
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

            <div className="flex items-center gap-3 mt-6">
              <a
                href="#"
                className="bg-slate-800 p-2 rounded-full hover:bg-cyan-500 hover:text-white transition"
              >
                <FaFacebookF size={16} />
              </a>

              <a
                href="#"
                className="bg-slate-800 p-2 rounded-full hover:bg-cyan-500 hover:text-white transition"
              >
                <FaInstagram size={16} />
              </a>

              <a
                href="#"
                className="bg-slate-800 p-2 rounded-full hover:bg-cyan-500 hover:text-white transition"
              >
                <FaXTwitter size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-10 pt-6 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} TicketBari. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
