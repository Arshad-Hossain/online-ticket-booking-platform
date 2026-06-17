"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, TrainFront } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  // Replace this later with your auth user
  const user = null;

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-slate-950/90 backdrop-blur-md border-b border-white/10 shadow-lg">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-5 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-2.5 rounded-xl shadow-lg">
            <TrainFront className="w-6 h-6 text-white" />
          </div>

          <div>
            <h1 className="text-2xl font-extrabold text-white tracking-wide">
              TicketBari
            </h1>
            <p className="text-xs text-slate-400">Bus & Train Ticket Booking</p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8">
          <li>
            <Link
              href="/"
              className="text-slate-300 hover:text-cyan-400 transition duration-300"
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              href="/tickets"
              className="text-slate-300 hover:text-cyan-400 transition duration-300"
            >
              All Tickets
            </Link>
          </li>
        </ul>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <Link
                href="/my-bookings"
                className="text-slate-300 hover:text-cyan-400 transition"
              >
                My Bookings
              </Link>

              <Link
                href="/profile"
                className="px-4 py-2 rounded-full bg-slate-800 text-white hover:bg-slate-700 transition"
              >
                Profile
              </Link>

              <button className="px-4 py-2 rounded-full bg-red-500 hover:bg-red-600 text-white transition">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-slate-300 hover:text-cyan-400 transition"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-5 py-2 rounded-full font-medium hover:scale-105 transition duration-300 shadow-lg"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-white">
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-slate-950 border-t border-white/10">
          <ul className="flex flex-col gap-5 p-6">
            <li>
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="text-slate-300 hover:text-cyan-400"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                href="/tickets"
                onClick={() => setOpen(false)}
                className="text-slate-300 hover:text-cyan-400"
              >
                All Tickets
              </Link>
            </li>

            {user ? (
              <>
                <li>
                  <Link
                    href="/my-bookings"
                    onClick={() => setOpen(false)}
                    className="text-slate-300 hover:text-cyan-400"
                  >
                    My Bookings
                  </Link>
                </li>

                <li>
                  <Link
                    href="/profile"
                    onClick={() => setOpen(false)}
                    className="text-slate-300 hover:text-cyan-400"
                  >
                    Profile
                  </Link>
                </li>

                <li>
                  <button className="text-red-400 hover:text-red-300">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="text-slate-300 hover:text-cyan-400"
                  >
                    Login
                  </Link>
                </li>

                <li>
                  <Link
                    href="/register"
                    onClick={() => setOpen(false)}
                    className="block text-center bg-gradient-to-r from-cyan-500 to-blue-600 py-3 rounded-full text-white font-medium"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
