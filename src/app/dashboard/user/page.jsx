"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { PlusCircle, Ticket, ClipboardList } from "lucide-react";

export default function UserPage() {
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
          Manage your tickets and bookings from your user dashboard.
        </p>
      </div>

      {/* Simple Dashboard Message */}
      <div className="mt-12 bg-[#2a1a14] border border-[#c8a27a]/20 rounded-2xl p-8">
        <h2 className="text-xl font-semibold text-[#f5e6d3] mb-3">
          User Dashboard
        </h2>

        <p className="text-[#c8a27a] leading-relaxed">
          Use the sidebar to manage your Profile, My booked tickets or
          transaction history
        </p>
      </div>
    </div>
  );
}
