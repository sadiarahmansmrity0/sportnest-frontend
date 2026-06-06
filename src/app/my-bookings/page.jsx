"use client";

import { useState, useEffect } from "react";

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBookings() {
      try {
        setLoading(true);
        // 'credentials: include' tells the browser to send cookies with this request
        const res = await fetch("http://localhost:5000/api/bookings", {
          method: "GET",
          credentials: "include", 
          headers: {
            "Content-Type": "application/json",
          },
        });

        const result = await res.json();

        if (!res.ok) {
          throw new Error(result.message || "Failed to fetch bookings");
        }

        setBookings(result.data || []);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchBookings();
  }, []);

  if (loading) {
    return <div className="text-white text-center pt-20">Loading your reservations...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center pt-20">Error: {error}</div>;
  }

  return (
    <div className="bg-[#020617] text-white min-h-screen pt-24 px-6">
      <h1 className="text-3xl font-black mb-8">My Bookings</h1>
      {bookings.length === 0 ? (
        <div className="text-center text-slate-500">No bookings found for this account.</div>
      ) : (
        <div className="grid gap-4">
          {bookings.map((b) => (
            <div 
              key={b._id} 
              className="bg-slate-900/50 p-6 rounded-2xl border border-white/10 flex justify-between items-center"
            >
              <div>
                <h3 className="font-bold text-lg">{b.facilityTitle}</h3>
                <p className="text-slate-400 text-sm">{b.date} | {b.slot}</p>
              </div>
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-bold uppercase">
                {b.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}