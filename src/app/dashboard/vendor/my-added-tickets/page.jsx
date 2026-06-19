"use client";

import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

export default function MyAddedTickets() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  // GET TICKETS
  const fetchTickets = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/tickets/vendor/${user?.email}`,
      );
      const data = await res.json();
      setTickets(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchTickets();
    }
  }, [user]);

  // DELETE
  const handleDelete = async (id) => {
    const confirm = window.confirm("Delete this ticket?");
    if (!confirm) return;

    await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/tickets/${id}`, {
      method: "DELETE",
    });

    setTickets((prev) => prev.filter((t) => t._id !== id));
  };

  return (
    <div className="w-full min-h-screen bg-[#1c120d] text-white p-6">
      <h1 className="text-3xl font-bold mb-6">My Added Tickets</h1>

      {loading ? (
        <p>Loading...</p>
      ) : tickets.length === 0 ? (
        <p className="text-[#c8a27a]">No tickets found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tickets.map((ticket) => (
            <div
              key={ticket._id}
              className="bg-[#2a1a14] border border-[#c8a27a]/20 rounded-2xl p-4"
            >
              <img
                src={ticket.image}
                alt={ticket.title}
                className="h-40 w-full object-cover rounded-xl mb-3"
              />

              <h2 className="text-xl font-bold">{ticket.title}</h2>

              <p className="text-sm text-[#c8a27a]">
                {ticket.from} → {ticket.to}
              </p>

              <p className="mt-2">
                Status:{" "}
                <span
                  className={`font-semibold ${
                    ticket.verificationStatus === "approved"
                      ? "text-green-400"
                      : ticket.verificationStatus === "rejected"
                        ? "text-red-400"
                        : "text-yellow-400"
                  }`}
                >
                  {ticket.verificationStatus}
                </span>
              </p>

              {/* ACTIONS */}
              <div className="flex gap-3 mt-4">
                <button
                  disabled={ticket.verificationStatus === "rejected"}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-500 disabled:opacity-40"
                >
                  <Pencil size={16} />
                  Update
                </button>

                <button
                  onClick={() => handleDelete(ticket._id)}
                  disabled={ticket.verificationStatus === "rejected"}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500 disabled:opacity-40"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
