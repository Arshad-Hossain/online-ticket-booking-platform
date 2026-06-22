"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function TransactionsPage() {
  const { data: session } = authClient.useSession();

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.user?.email) return;
    fetchTransactions();
  }, [session]);

  const fetchTransactions = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/transactions/${session.user.email}`,
      );

      const data = await res.json();
      setTransactions(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-10 text-center text-white">Loading transactions...</div>
    );
  }

  return (
    <div className="w-full p-6 text-white">
      <h1 className="text-3xl font-bold mb-8">Transaction History</h1>

      {transactions.length === 0 ? (
        <div className="bg-[#2a1a14] rounded-2xl p-10 text-center text-[#c8a27a]">
          No transactions found
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-[#c8a27a]/20 bg-[#2a1a14]">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="bg-[#1c120d] text-[#c8a27a]">
                <th className="px-6 py-4 text-left">#</th>

                <th className="px-6 py-4 text-left">Transaction ID</th>

                <th className="px-6 py-4 text-left">Amount</th>

                <th className="px-6 py-4 text-left">Ticket Title</th>

                <th className="px-6 py-4 text-left">Payment Date</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((t, index) => (
                <tr
                  key={t._id}
                  className="border-t border-[#c8a27a]/10 hover:bg-[#3a241b] transition"
                >
                  <td className="px-6 py-4">{index + 1}</td>

                  <td className="px-6 py-4">
                    <div className="max-w-[280px] truncate font-mono text-sm text-[#e6d5c3]">
                      {t.sessionId}
                    </div>
                  </td>

                  <td className="px-6 py-4 font-semibold text-green-400">
                    ${t.amount}
                  </td>

                  <td className="px-6 py-4">{t.ticketTitle || "N/A"}</td>

                  <td className="px-6 py-4 text-[#e6d5c3]">
                    {t.transactionDate
                      ? new Date(t.transactionDate).toLocaleString()
                      : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
