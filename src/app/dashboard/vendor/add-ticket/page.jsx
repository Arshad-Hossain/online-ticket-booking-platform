"use client";

import { authClient } from "@/lib/auth-client";
import { useState } from "react";

const perksList = [
  "AC",
  "Breakfast",
  "WiFi",
  "Charging Port",
  "Blanket",
  "Water Bottle",
];

export default function AddTicketPage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const form = e.target;

    const imageFile = form.image.files[0];

    const formData = new FormData();

    formData.append("image", imageFile);

    const imageUploadResponse = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,
      {
        method: "POST",
        body: formData,
      },
    );

    const imageResult = await imageUploadResponse.json();

    if (!imageResult.success) {
      alert("Image Upload Failed");
      setLoading(false);
      return;
    }

    const imageUrl = imageResult.data.url;

    const perks = [...form.querySelectorAll("input[name='perks']:checked")].map(
      (item) => item.value,
    );

    const ticketData = {
      title: form.title.value,
      from: form.from.value,
      to: form.to.value,
      transportType: form.transportType.value,
      price: Number(form.price.value),
      quantity: Number(form.quantity.value),
      departureDate: form.departureDate.value,
      departureTime: form.departureTime.value,
      perks,
      image: imageUrl,
      vendorName: user?.name,
      vendorEmail: user?.email,
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/tickets`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(ticketData),
        },
      );

      const data = await res.json();

      if (data.success) {
        alert("Ticket Added Successfully");
        form.reset();
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="w-full min-h-screen bg-[#1c120d] text-white p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Add New Ticket</h1>

        <p className="text-[#c8a27a] mb-8">Fill in ticket information below.</p>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-[#2a1a14] p-6 rounded-2xl border border-[#c8a27a]/20"
        >
          {/* Ticket Title */}
          <div>
            <label className="block mb-2">Ticket Title</label>

            <input
              name="title"
              required
              className="w-full p-3 rounded-lg bg-[#1c120d] border border-[#c8a27a]/20"
              placeholder="Dhaka to Chittagong Express"
            />
          </div>

          {/* Locations */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">From</label>

              <input
                name="from"
                required
                className="w-full p-3 rounded-lg bg-[#1c120d] border border-[#c8a27a]/20"
              />
            </div>

            <div>
              <label className="block mb-2">To</label>

              <input
                name="to"
                required
                className="w-full p-3 rounded-lg bg-[#1c120d] border border-[#c8a27a]/20"
              />
            </div>
          </div>

          {/* Transport Type */}
          <div>
            <label className="block mb-2">Transport Type</label>

            <select
              name="transportType"
              className="w-full p-3 rounded-lg bg-[#1c120d] border border-[#c8a27a]/20"
            >
              <option>Bus</option>
              <option>Train</option>
            </select>
          </div>

          {/* Price & Quantity */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">Price (Per Unit)</label>

              <input
                type="number"
                name="price"
                required
                className="w-full p-3 rounded-lg bg-[#1c120d] border border-[#c8a27a]/20"
              />
            </div>

            <div>
              <label className="block mb-2">Ticket Quantity</label>

              <input
                type="number"
                name="quantity"
                required
                className="w-full p-3 rounded-lg bg-[#1c120d] border border-[#c8a27a]/20"
              />
            </div>
          </div>

          {/* Date Time */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">Departure Date</label>

              <input
                type="date"
                name="departureDate"
                required
                className="w-full p-3 rounded-lg bg-[#1c120d] border border-[#c8a27a]/20"
              />
            </div>

            <div>
              <label className="block mb-2">Departure Time</label>

              <input
                type="time"
                name="departureTime"
                required
                className="w-full p-3 rounded-lg bg-[#1c120d] border border-[#c8a27a]/20"
              />
            </div>
          </div>

          {/* Perks */}
          <div>
            <label className="block mb-3">Perks</label>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {perksList.map((perk) => (
                <label key={perk} className="flex gap-2 items-center">
                  <input type="checkbox" name="perks" value={perk} />
                  {perk}
                </label>
              ))}
            </div>
          </div>

          {/* Image */}
          {/* Ticket Image */}
          <div>
            <label className="block mb-2">Ticket Image</label>

            <input
              type="file"
              name="image"
              accept="image/*"
              required
              onChange={(e) =>
                setPreview(URL.createObjectURL(e.target.files[0]))
              }
              className="w-full p-3 rounded-lg bg-[#1c120d] border border-[#c8a27a]/20"
            />

            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-4 h-40 w-full max-w-sm object-cover rounded-xl border border-[#c8a27a]/20"
              />
            )}
          </div>

          {/* Vendor Info */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">Vendor Name</label>

              <input
                readOnly
                value={user?.name || ""}
                className="w-full p-3 rounded-lg bg-black/30"
              />
            </div>

            <div>
              <label className="block mb-2">Vendor Email</label>

              <input
                readOnly
                value={user?.email || ""}
                className="w-full p-3 rounded-lg bg-black/30"
              />
            </div>
          </div>

          <button
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#c8a27a] to-[#e6c29f] text-black font-bold"
          >
            {loading ? "Adding..." : "Add Ticket"}
          </button>
        </form>
      </div>
    </div>
  );
}
