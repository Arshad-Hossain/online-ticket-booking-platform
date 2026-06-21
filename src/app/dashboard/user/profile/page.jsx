"use client";

import { authClient } from "@/lib/auth-client";
import { Avatar } from "@heroui/react";

export default function UserProfilePage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  return (
    <div className="w-full min-h-full bg-[#1c120d] text-white px-6 md:px-10 py-10">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-[#f5e6d3]">User Profile</h1>

        <p className="text-[#c8a27a] mt-2">
          Your account details and role information
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-[#2a1a14] border border-[#c8a27a]/20 rounded-2xl p-6 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-6">
        {/* Avatar */}
        <Avatar size="lg">
          <Avatar.Image
            src={user?.image}
            referrerPolicy="no-referrer"
            alt={user?.name}
          />
          <Avatar.Fallback>{user?.name?.charAt(0)}</Avatar.Fallback>
        </Avatar>

        {/* Info */}
        <div className="space-y-3">
          <div>
            <p className="text-sm text-[#c8a27a]">Name</p>
            <h2 className="text-xl font-semibold text-[#f5e6d3]">
              {user?.name}
            </h2>
          </div>

          <div>
            <p className="text-sm text-[#c8a27a]">Email</p>
            <h2 className="text-lg text-white/90 break-all">{user?.email}</h2>
          </div>

          <div>
            <p className="text-sm text-[#c8a27a]">Role</p>
            <span className="inline-block mt-1 px-3 py-1 rounded-full bg-[#1c120d] border border-[#c8a27a]/30 text-[#e6c29f] text-sm">
              {user?.signupAs || "vendor"}
            </span>
          </div>
        </div>
      </div>

      {/* Extra Info Section */}
      <div className="mt-10 grid md:grid-cols-2 gap-6">
        <div className="bg-[#2a1a14] border border-[#c8a27a]/20 rounded-2xl p-6">
          <h3 className="text-[#f5e6d3] font-semibold mb-2">Account Status</h3>
          <p className="text-[#c8a27a]">Active User Account</p>
        </div>

        <div className="bg-[#2a1a14] border border-[#c8a27a]/20 rounded-2xl p-6">
          <h3 className="text-[#f5e6d3] font-semibold mb-2">Member Since</h3>
          <p className="text-[#c8a27a]">Recently joined</p>
        </div>
      </div>
    </div>
  );
}
