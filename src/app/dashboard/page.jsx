"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchBookings() {
      if (typeof window === "undefined") return;

      const userEmail = localStorage.getItem("userEmail");
      console.log("DASHBOARD WINDOW DEBUG: Email is:", userEmail);
      
      if (!userEmail) {
        setError("No user email found in storage. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const url = `http://localhost:5000/api/bookings?userEmail=${encodeURIComponent(userEmail)}`;
        const res = await fetch(url);
        const json = await res.json();
        
        console.log("DASHBOARD ARRIVED ARRAY DATA:", json); 

        if (json && Array.isArray(json)) {
          setBookings(json);
        } else {
          setBookings([]);
        }
      } catch (err) {
        console.error("DASHBOARD FETCH ERROR:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    fetchBookings();
  }, []);

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
