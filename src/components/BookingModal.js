import { useState } from "react";

export default function BookingModal({
  facility,
  onClose,
}) {

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  const handleBookingSubmit = async (e) => {

    e.preventDefault();

    // GET REAL USER EMAIL
    const userEmail = localStorage.getItem("userEmail");

    console.log("BOOKING USER EMAIL:", userEmail);

    if (!userEmail) {
      setMessage({
        type: "error",
        text: "Please login first.",
      });
      return;
    }

    if (!selectedDate || !selectedSlot) {
      setMessage({
        type: "error",
        text: "Please choose date and slot.",
      });
      return;
    }

    try {

      setLoading(true);

      const bookingData = {
        facilityId: facility._id,

        facilityTitle:
          facility.title || facility.name,

        userEmail: userEmail,

        date: selectedDate,

        slot: selectedSlot,

        status: "pending",
      };

      console.log("FINAL BOOKING DATA:", bookingData);

      const response = await fetch(
        "http://localhost:5000/api/bookings",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(bookingData),
        }
      );

      const data = await response.json();

      console.log("BOOKING RESPONSE:", data);

      if (data.success) {

        setMessage({
          type: "success",
          text: "Booking successful!",
        });

        setTimeout(() => {
          onClose();
        }, 1500);

      } else {

        setMessage({
          type: "error",
          text: data.message || "Booking failed",
        });
      }

    } catch (error) {

      console.error(error);

      setMessage({
        type: "error",
        text: "Server connection failed.",
      });

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">

      <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-md overflow-hidden">

        {/* HEADER */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">

          <div>
            <h2 className="text-2xl font-black text-white">
              Book Facility
            </h2>

            <p className="text-emerald-400 text-sm mt-1">
              {facility.title || facility.name}
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-2xl"
          >
            ×
          </button>

        </div>

        {/* BODY */}
        <form
          onSubmit={handleBookingSubmit}
          className="p-6 space-y-5"
        >

          {message.text && (
            <div
              className={`p-3 rounded-xl text-sm ${
                message.type === "success"
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  : "bg-red-500/10 text-red-400 border border-red-500/20"
              }`}
            >
              {message.text}
            </div>
          )}

          {/* DATE */}
          <div>
            <label className="block text-sm mb-2 text-slate-300">
              Select Date
            </label>

            <input
              type="date"
              required
              min={new Date().toISOString().split("T")[0]}
              value={selectedDate}
              onChange={(e) =>
                setSelectedDate(e.target.value)
              }
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white"
            />
          </div>

          {/* SLOT */}
          <div>
            <label className="block text-sm mb-2 text-slate-300">
              Select Time Slot
            </label>

            <div className="grid gap-2 max-h-44 overflow-y-auto">

              {facility.availableSlots?.map((slot, index) => (

                <button
                  key={index}
                  type="button"
                  onClick={() =>
                    setSelectedSlot(slot)
                  }
                  className={`px-4 py-3 rounded-xl border text-left transition ${
                    selectedSlot === slot
                      ? "bg-emerald-500 text-slate-950 border-emerald-500 font-bold"
                      : "bg-slate-950 border-white/10 text-slate-300"
                  }`}
                >
                  {slot}
                </button>

              ))}

            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex gap-3 pt-2">

            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-slate-800 hover:bg-slate-700 text-white py-3 rounded-xl"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 rounded-xl"
            >
              {loading
                ? "Processing..."
                : "Confirm Booking"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}