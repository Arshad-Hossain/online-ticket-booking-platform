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
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/transactions/${session.user.email}`
      );

      const data = await res.json();

      setTransactions(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-white">
        Loading transactions...
      </div>
    );
  }

  return (
    <div className="w-full p-6 text-white">
      <h1 className="text-3xl font-bold mb-8">
        Transaction History
      </h1>

      {transactions.length === 0 ? (
        <div className="text-center py-12 text-[#c8a27a]">
          No transactions found
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-[#c8a27a]/20">
          <table className="table w-full">
            <thead className="bg-[#2a1a14] text-[#c8a27a]">
              <tr>
                <th>#</th>
                <th>Transaction ID</th>
                <th>Amount</th>
                <th>Ticket Title</th>
                <th>Payment Date</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((transaction, index) => (
                <tr
                  key={transaction._id}
                  className="border-b border-[#c8a27a]/10"
                >
                  <td>{index + 1}</td>

                  <td className="max-w-[220px] truncate">
                    {transaction.stripePaymentIntent ||
                      transaction.stripeSessionId}
                  </td>

                  <td>
                    ${transaction.totalPrice}
                  </td>

                  <td>
                    {transaction.ticketTitle}
                  </td>

                  <td>
                    {new Date(
                      transaction.transactionDate
                    ).toLocaleString()}
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