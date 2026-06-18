"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, Train } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#1c120d]/95 backdrop-blur-md border-b border-[#c8a27a]/20 shadow-lg">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-5 py-4">
        {/* LEFT - LOGO */}
        <Link href="/" className="flex items-center gap-3 min-w-fit">
          <div className="bg-gradient-to-r from-[#c8a27a] to-[#e6c29f] p-2.5 rounded-xl shadow-lg">
            <Train className="w-6 h-6 text-[#1c120d]" />
          </div>

          <div className="flex flex-col">
            <h1 className="text-lg sm:text-2xl font-extrabold text-[#f5e6d3] tracking-wide leading-tight">
              TicketBari
            </h1>
            <p className="text-[10px] sm:text-xs text-[#c8a27a] leading-none">
              Bus & Train Ticket Booking
            </p>
          </div>
        </Link>

        {/* CENTER MENU */}
        <div className="hidden md:flex items-center gap-10">
          <Link
            href="/"
            className="text-[#e6d5c3] hover:text-[#e6c29f] transition"
          >
            Home
          </Link>

          <Link
            href="/tickets"
            className="text-[#e6d5c3] hover:text-[#e6c29f] transition"
          >
            All Tickets
          </Link>

          <Link
            href="/dashboard"
            className="text-[#e6d5c3] hover:text-[#e6c29f] transition"
          >
            Dashboard
          </Link>
        </div>

        {/* RIGHT - LOGIN */}
        <div className="hidden md:flex items-center">
          <Link
            href="/login"
            className="bg-gradient-to-r from-[#c8a27a] to-[#e6c29f] text-[#1c120d] px-5 py-2 rounded-full font-semibold hover:scale-105 transition duration-300 shadow-lg"
          >
            Login
          </Link>
        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-[#f5e6d3]"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-[#1c120d] border-t border-[#c8a27a]/20">
          <div className="flex flex-col gap-5 p-6">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="text-[#e6d5c3] hover:text-[#e6c29f]"
            >
              Home
            </Link>

            <Link
              href="/tickets"
              onClick={() => setOpen(false)}
              className="text-[#e6d5c3] hover:text-[#e6c29f]"
            >
              All Tickets
            </Link>

            <Link
              href="/dashboard"
              onClick={() => setOpen(false)}
              className="text-[#e6d5c3] hover:text-[#e6c29f]"
            >
              Dashboard
            </Link>

            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="text-center bg-gradient-to-r from-[#c8a27a] to-[#e6c29f] py-3 rounded-full text-[#1c120d] font-semibold"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
