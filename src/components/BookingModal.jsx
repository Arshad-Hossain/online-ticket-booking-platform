"use client";

export default function BookingModal({
  isOpen,
  onClose,
  ticket,
  bookingQty,
  setBookingQty,
  onConfirm,
  loading,
}) {
  if (!isOpen) return null;

  const quantityExceeded = bookingQty > ticket.quantity;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl bg-[#2a1a14] border border-[#c8a27a]/20 p-6 text-white">
        <h2 className="text-2xl font-bold mb-4">Book Ticket</h2>

        <div className="space-y-2 mb-5">
          <p>
            Ticket:
            <span className="text-[#c8a27a] ml-2">{ticket.title}</span>
          </p>

          <p>
            Available Seats:
            <span className="text-[#c8a27a] ml-2">{ticket.quantity}</span>
          </p>

          <p>
            Price Per Ticket:
            <span className="text-[#c8a27a] ml-2">${ticket.price}</span>
          </p>
        </div>

        <div className="mb-5">
          <label className="block mb-2 font-medium">Quantity</label>

          <input
            type="number"
            min="1"
            max={ticket.quantity}
            value={bookingQty}
            onChange={(e) => setBookingQty(Number(e.target.value))}
            className="w-full rounded-lg p-3 bg-[#1c120d] border border-[#c8a27a]/20"
          />

          {quantityExceeded && (
            <p className="text-red-500 text-sm mt-2">
              Quantity cannot exceed available tickets.
            </p>
          )}
        </div>

        <div className="mb-6">
          <p className="text-sm text-[#c8a27a]">Total Price</p>

          <h3 className="text-2xl font-bold">
            ${(bookingQty || 0) * ticket.price}
          </h3>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl bg-gray-700"
          >
            Cancel
          </button>

          <button
            disabled={loading || bookingQty < 1 || bookingQty > ticket.quantity}
            onClick={onConfirm}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#c8a27a] to-[#e6c29f] text-black font-bold disabled:bg-gray-600"
          >
            {loading ? "Booking..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}
