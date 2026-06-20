"use client";

import React from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

import { Drawer, Button, Avatar } from "@heroui/react";
import {
  LayoutDashboard,
  Ticket,
  History,
  User,
  PlusCircle,
  ClipboardList,
  DollarSign,
  Users,
  Megaphone,
  Menu,
} from "lucide-react";

const dashboardConfig = {
  user: [
    { label: "Profile", icon: User, link: "/dashboard/user/profile" },
    {
      label: "My Booked Tickets",
      icon: Ticket,
      link: "/dashboard/user/bookings",
    },
    {
      label: "Transaction History",
      icon: History,
      link: "/dashboard/user/transactions",
    },
  ],

  vendor: [
    { label: "Vendor Profile", icon: User, link: "/dashboard/vendor/profile" },
    {
      label: "Add Ticket",
      icon: PlusCircle,
      link: "/dashboard/vendor/add-ticket",
    },
    {
      label: "My Added Tickets",
      icon: ClipboardList,
      link: "/dashboard/vendor/my-added-tickets",
    },
    {
      label: "Requested Bookings",
      icon: Ticket,
      link: "/dashboard/vendor/requested-bookings",
    },
    {
      label: "Revenue Overview",
      icon: DollarSign,
      link: "/dashboard/vendor/revenue",
    },
  ],

  admin: [
    { label: "Admin Profile", icon: User, link: "/dashboard/admin/profile" },
    {
      label: "Manage Tickets",
      icon: Ticket,
      link: "/dashboard/admin/manage-tickets",
    },
    {
      label: "Manage Users",
      icon: Users,
      link: "/dashboard/admin/manage-users",
    },
    {
      label: "Advertise Tickets",
      icon: Megaphone,
      link: "/dashboard/admin/advertise-tickets",
    },
  ],
};

export default function DashboardSidebar() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const role = user?.signupAs || "user"; // IMPORTANT (from your Better Auth field)

  const navItems = dashboardConfig[role] || dashboardConfig.user;

  return (
    <Drawer>
      {/* MOBILE TRIGGER */}
      <Button className="md:hidden m-3" variant="secondary">
        <Menu className="w-4 h-4 mr-2" />
        Menu
      </Button>

      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:flex flex-col w-64 min-h-screen border-r border-white/10 bg-[#1c120d] text-white">
        {/* USER INFO */}
        <div className="p-4 border-b border-white/10 flex items-center gap-3">
          <Avatar size="sm">
            <Avatar.Image src={user?.image} referrerPolicy="no-referrer" />
            <Avatar.Fallback>{user?.name?.charAt(0)}</Avatar.Fallback>
          </Avatar>

          <div className="flex flex-col">
            <p className="text-sm font-semibold">{user?.name}</p>
            <p className="text-xs text-white/60 break-all">{user?.email}</p>
          </div>
        </div>

        {/* NAV ITEMS */}
        <nav className="flex flex-col gap-1 p-3">
          {navItems.map((item) => (
            <Link key={item.label} href={item.link}>
              <button className="flex items-center gap-3 w-full rounded-xl px-3 py-2.5 text-sm hover:bg-white/10 transition">
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            </Link>
          ))}
        </nav>
      </aside>

      {/* MOBILE DRAWER */}
      <Drawer.Backdrop>
        <Drawer.Content placement="left">
          <Drawer.Dialog>
            <Drawer.CloseTrigger />

            <Drawer.Header>
              <Drawer.Heading>Dashboard</Drawer.Heading>
            </Drawer.Header>

            <Drawer.Body>
              {/* USER INFO */}
              <div className="flex items-center gap-3 mb-4">
                <Avatar size="sm">
                  <Avatar.Image
                    src={user?.image}
                    referrerPolicy="no-referrer"
                  />
                  <Avatar.Fallback>{user?.name?.charAt(0)}</Avatar.Fallback>
                </Avatar>

                <div>
                  <p className="text-sm font-semibold">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
              </div>

              {/* NAV */}
              <nav className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <Link key={item.label} href={item.link}>
                    <button className="flex items-center gap-3 w-full rounded-xl px-3 py-2.5 text-sm hover:bg-gray-100 transition">
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </button>
                  </Link>
                ))}
              </nav>
            </Drawer.Body>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  );
}
