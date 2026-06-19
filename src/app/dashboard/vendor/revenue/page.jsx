"use client";

import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function RevenuePage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [data, setData] = useState(null);

  useEffect(() => {
    if (!user?.email) return;

    const fetchRevenue = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/revenue/vendor/${user.email}`,
      );

      const json = await res.json();
      setData(json);
    };

    fetchRevenue();
  }, [user]);

  if (!data) {
    return <p className="text-white p-6">Loading revenue...</p>;
  }

  const COLORS = ["#c8a27a", "#e6c29f", "#ffffff"];

  return (
    <div className="w-full min-h-screen bg-[#1c120d] text-white p-6">
      <h1 className="text-2xl font-bold mb-6">Revenue Overview</h1>

      {/* STATS CARDS */}
      <div className="grid md:grid-cols-3 gap-4 mb-10">
        <div className="bg-[#2a1a14] p-5 rounded-xl border border-white/10">
          <p className="text-gray-400">Tickets Added</p>
          <h2 className="text-3xl font-bold">{data.totalTicketsAdded}</h2>
        </div>

        <div className="bg-[#2a1a14] p-5 rounded-xl border border-white/10">
          <p className="text-gray-400">Tickets Sold</p>
          <h2 className="text-3xl font-bold">{data.totalTicketsSold}</h2>
        </div>

        <div className="bg-[#2a1a14] p-5 rounded-xl border border-white/10">
          <p className="text-gray-400">Revenue</p>
          <h2 className="text-3xl font-bold">${data.totalRevenue}</h2>
        </div>
      </div>

      {/* BAR CHART */}
      <div className="bg-[#2a1a14] p-6 rounded-xl mb-10">
        <h2 className="mb-4 font-semibold">Performance Chart</h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.chart}>
            <XAxis dataKey="name" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip />
            <Bar dataKey="value" fill="#c8a27a" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* PIE CHART */}
      <div className="bg-[#2a1a14] p-6 rounded-xl">
        <h2 className="mb-4 font-semibold">Revenue Breakdown</h2>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data.chart}
              dataKey="value"
              nameKey="name"
              outerRadius={120}
            >
              {data.chart.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
