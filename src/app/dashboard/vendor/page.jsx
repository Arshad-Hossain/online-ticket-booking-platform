"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { PlusCircle, Ticket, ClipboardList } from "lucide-react";

export default function VendorPage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  return (
    <div className="w-full min-h-full bg-[#1c120d] text-white pt-10 px-6 md:px-10">
      {/* Welcome Section */}
      <div className="mb-12">
        <h1 className="text-3xl md:text-5xl font-bold text-[#f5e6d3]">
          Welcome Back, {user?.name} 👋
        </h1>

        <p className="mt-4 text-[#c8a27a] text-base md:text-lg">
          Manage your tickets and bookings from your vendor dashboard.
        </p>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl md:text-2xl font-semibold text-[#f5e6d3] mb-6">
          Quick Actions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Add Ticket */}
          <Link
            href="/dashboard/vendor/add-ticket"
            className="bg-gradient-to-r from-[#c8a27a] to-[#e6c29f] text-[#1c120d] p-6 rounded-2xl flex items-center gap-4 font-semibold shadow-lg hover:scale-[1.02] transition duration-300"
          >
            <PlusCircle size={24} />
            <div>
              <h3 className="font-bold">Add Ticket</h3>
              <p className="text-sm opacity-80">
                Create a new bus or train ticket
              </p>
            </div>
          </Link>

          {/* My Tickets */}
          <Link
            href="/dashboard/vendor/tickets"
            className="bg-[#2a1a14] border border-[#c8a27a]/20 p-6 rounded-2xl flex items-center gap-4 hover:border-[#c8a27a] hover:bg-[#322019] transition duration-300"
          >
            <Ticket size={24} className="text-[#e6c29f]" />

            <div>
              <h3 className="font-semibold">My Added Tickets</h3>
              <p className="text-sm text-[#c8a27a]">View and manage tickets</p>
            </div>
          </Link>

          {/* Requests */}
          <Link
            href="/dashboard/vendor/requests"
            className="bg-[#2a1a14] border border-[#c8a27a]/20 p-6 rounded-2xl flex items-center gap-4 hover:border-[#c8a27a] hover:bg-[#322019] transition duration-300"
          >
            <ClipboardList size={24} className="text-[#e6c29f]" />

            <div>
              <h3 className="font-semibold">Requested Bookings</h3>
              <p className="text-sm text-[#c8a27a]">
                Review customer booking requests
              </p>
            </div>
          </Link>
        </div>
      </div>

      {/* Simple Dashboard Message */}
      <div className="mt-12 bg-[#2a1a14] border border-[#c8a27a]/20 rounded-2xl p-8">
        <h2 className="text-xl font-semibold text-[#f5e6d3] mb-3">
          Vendor Dashboard
        </h2>

        <p className="text-[#c8a27a] leading-relaxed">
          Use the sidebar or quick action cards above to manage your tickets,
          view booking requests, track revenue, and update your vendor profile.
        </p>
      </div>
    </div>
  );
}
