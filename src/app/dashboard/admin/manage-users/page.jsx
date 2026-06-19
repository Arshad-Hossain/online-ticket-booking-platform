"use client";

import { useEffect, useState } from "react";

export default function ManageUsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/users`,
    );

    const data = await res.json();

    setUsers(data);
  };

  const updateRole = async (id, role) => {
    await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/users/${id}/role`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role }),
      },
    );

    fetchUsers();
  };

  const markFraud = async (id) => {
    const confirmAction = confirm(
      "Are you sure you want to mark this vendor as fraud?",
    );

    if (!confirmAction) return;

    await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/users/${id}/fraud`,
      {
        method: "PATCH",
      },
    );

    fetchUsers();
  };

  return (
    <div className="w-full min-h-screen bg-[#1c120d] text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Users</h1>

      <div className="overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full">
          <thead className="bg-[#2a1a14]">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Role</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-t border-white/10">
                <td className="p-4">{user.name}</td>

                <td className="p-4">{user.email}</td>

                <td className="p-4 capitalize">
                  {user.signupAs}

                  {user.isFraud && (
                    <span className="ml-2 text-red-500 font-semibold">
                      (Fraud)
                    </span>
                  )}
                </td>

                <td className="p-4">
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => updateRole(user._id, "admin")}
                      className="px-3 py-1 bg-blue-600 rounded"
                    >
                      Make Admin
                    </button>

                    <button
                      onClick={() => updateRole(user._id, "vendor")}
                      className="px-3 py-1 bg-green-600 rounded"
                    >
                      Make Vendor
                    </button>

                    {user.signupAs === "vendor" && (
                      <button
                        disabled={user.isFraud}
                        onClick={() => markFraud(user._id)}
                        className="px-3 py-1 bg-red-600 rounded disabled:opacity-50"
                      >
                        Mark Fraud
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
