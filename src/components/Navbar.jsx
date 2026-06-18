"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, Train, Sun, Moon } from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { Avatar, Dropdown, Label } from "@heroui/react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState("dark");

  const { data: session } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    const saved = localStorage.getItem("theme");

    if (saved) {
      setTheme(saved);
      document.documentElement.classList.toggle("dark", saved === "dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  }, []);

  // -----------------------
  // TOGGLE THEME
  // -----------------------
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";

    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  // -----------------------
  // SIGN OUT
  // -----------------------
  const handleSignOut = async () => {
    await authClient.signOut();
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#1c120d] dark:bg-black backdrop-blur-md border-b border-[#c8a27a]/20 shadow-lg">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-5 py-4">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3">
          <div className="bg-gradient-to-r from-[#c8a27a] to-[#e6c29f] p-2.5 rounded-xl shadow-lg">
            <Train className="w-6 h-6 text-[#1c120d]" />
          </div>

          <div>
            <h1 className="text-lg sm:text-2xl font-extrabold text-[#f5e6d3]">
              TicketBari
            </h1>
            <p className="text-xs text-[#c8a27a]">Bus & Train Ticket Booking</p>
          </div>
        </Link>

        {/* CENTER MENU */}
        <div className="hidden md:flex items-center gap-10">
          <Link href="/" className="text-[#e6d5c3] hover:text-[#e6c29f]">
            Home
          </Link>

          <Link href="/tickets" className="text-[#e6d5c3] hover:text-[#e6c29f]">
            All Tickets
          </Link>

          {user && (
            <Link
              href="/dashboard"
              className="text-[#e6d5c3] hover:text-[#e6c29f]"
            >
              Dashboard
            </Link>
          )}
        </div>

        {/* RIGHT SIDE */}
        <div className="hidden md:flex items-center gap-4">
          {/* THEME TOGGLE */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-[#c8a27a]/30 text-[#f5e6d3] hover:bg-[#2a1a14] transition"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* NOT LOGGED IN */}
          {!user && (
            <Link
              href="/login"
              className="bg-gradient-to-r from-[#c8a27a] to-[#e6c29f] text-[#1c120d] px-5 py-2 rounded-full font-semibold hover:scale-105 transition"
            >
              Login
            </Link>
          )}

          {/* LOGGED IN */}
          {user && (
            <Dropdown>
              <Dropdown.Trigger className="flex items-center gap-3 rounded-full hover:bg-[#2a1a14] px-3 py-2 transition cursor-pointer">
                <Avatar size="sm">
                  <Avatar.Image
                    src={user?.image}
                    referrerPolicy="no-referrer"
                    alt={user?.name}
                  />
                  <Avatar.Fallback>{user?.name?.charAt(0)}</Avatar.Fallback>
                </Avatar>

                <span className="text-[#f5e6d3] font-medium">{user?.name}</span>
              </Dropdown.Trigger>

              <Dropdown.Popover className="bg-white text-black">
                {/* USER HEADER */}
                <div className="px-4 pt-4 pb-3 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <Avatar size="sm">
                      <Avatar.Image
                        src={user?.image}
                        referrerPolicy="no-referrer"
                        alt={user?.name}
                      />
                      <Avatar.Fallback>{user?.name?.charAt(0)}</Avatar.Fallback>
                    </Avatar>

                    <div className="flex flex-col">
                      <p className="text-sm font-semibold text-black leading-tight">
                        {user?.name}
                      </p>

                      <p className="text-xs text-gray-600 break-all">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                </div>

                {/* MENU */}
                <Dropdown.Menu>
                  <Dropdown.Item id="profile">
                    <Link href="/profile">
                      <Label className="text-purple-500">My Profile</Label>
                    </Link>
                  </Dropdown.Item>

                  <Dropdown.Item
                    id="logout"
                    variant="danger"
                    onClick={handleSignOut}
                  >
                    <Label>Logout</Label>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-[#f5e6d3]"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-[#1c120d] border-t border-[#c8a27a]/20 p-6 space-y-6">
          {/* LINKS */}
          <div className="flex flex-col gap-5">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="text-white text-base font-medium hover:text-[#c8a27a] transition"
            >
              Home
            </Link>

            <Link
              href="/tickets"
              onClick={() => setOpen(false)}
              className="text-white text-base font-medium hover:text-[#c8a27a] transition"
            >
              All Tickets
            </Link>

            {user && (
              <Link
                href="/dashboard"
                onClick={() => setOpen(false)}
                className="text-white text-base font-medium hover:text-[#c8a27a] transition"
              >
                Dashboard
              </Link>
            )}
          </div>

          {/* THEME MOBILE */}
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 text-white mt-4"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            Toggle Theme
          </button>

          {/* AUTH */}
          {!user && (
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="block text-center bg-gradient-to-r from-[#c8a27a] to-[#e6c29f] py-3 rounded-full text-[#1c120d] mt-4"
            >
              Login
            </Link>
          )}

          {user && (
            <button onClick={handleSignOut} className="text-red-400 mt-4">
              Logout
            </button>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
