"use client";

import { useEffect, useState } from "react";
import { API_URL } from "@/lib/api";

export default function DashboardPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
  if (typeof window === "undefined") return;

  // Read URL parameters (e.g., ?email=user@gmail.com)
  const queryParams = new URLSearchParams(window.location.search);
  const emailFromGoogle = queryParams.get("email");

  if (emailFromGoogle) {
    // Save to local storage dynamically so your session updates instantly
    localStorage.setItem("userEmail", decodeURIComponent(emailFromGoogle));
    console.log("Google user session stored securely:", emailFromGoogle);
  }
}, []);


  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to cancel this booking?")) return;

    try {
      // FIXED: Used ${API_URL} here
      const res = await fetch(`${API_URL}/api/bookings/${id}`, {
        method: 'DELETE',
      });
      const result = await res.json();
      
      if (result.success) {
        setBookings(prevBookings => prevBookings.filter(b => b._id !== id));
        alert("Booking cancelled!");
      } else {
        alert("Failed to cancel: " + result.message);
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Error deleting booking");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center">
        Loading dashboard items...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#020617] text-red-400 flex items-center justify-center">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white pt-24 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-black mb-8">Player Dashboard</h1>

        {bookings.length === 0 ? (
          <div className="text-center py-20 border border-white/10 rounded-2xl bg-slate-900/40">
            <h2 className="text-xl font-bold mb-2">No bookings found</h2>
            <p className="text-slate-400">No bookings found for this account.</p>
          </div>
        ) : (
          <div className="grid gap-5">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-slate-900 border border-white/10 rounded-2xl p-6 flex items-center justify-between"
              >
                <div>
                  <h2 className="text-xl font-bold">{booking.facilityTitle || "Unnamed Facility"}</h2>
                  <p className="text-slate-400 mt-2">📅 {booking.date || "No date set"}</p>
                  <p className="text-slate-500 text-sm mt-1">⏰ {booking.slot || "No slot set"}</p>
                  
                  <button 
                    onClick={() => handleDelete(booking._id)}
                    className="mt-4 bg-red-500/10 text-red-400 px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-500/20 transition"
                  >
                    Cancel Booking
                  </button>
                </div>
                
                <div className="bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-full text-sm font-bold uppercase">
                  {booking.status || "Pending"}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}