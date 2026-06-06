"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function UserDashboardPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const userEmail = typeof window !== "undefined" ? localStorage.getItem("userEmail") : "";

  useEffect(() => {
    async function fetchBookings() {
      if (!userEmail) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:5000/api/bookings?userEmail=${userEmail}`);
        const result = await res.json();
        
        if (result.success && Array.isArray(result.data)) {
          setBookings(result.data);
        } else {
          setBookings([]);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchBookings();
  }, [userEmail]);

  return (
    <div className="min-h-screen bg-[#020617] text-white pt-28 px-6">
      <h1 className="text-3xl font-black mb-8">Player Dashboard</h1>
      
      {loading ? (
        <div className="text-emerald-400">Loading...</div>
      ) : bookings.length === 0 ? (
        <div className="text-slate-400">No bookings found for this account.</div>
      ) : (
        <div className="grid gap-4">
          {/* This .map() is now protected by the checks above */}
          {bookings.map((b) => (
            <div key={b._id} className="bg-slate-900 p-6 rounded-2xl border border-white/10">
              <h3 className="font-bold text-lg">{b.facilityTitle || "Arena"}</h3>
              <p className="text-slate-400">{b.date} | {b.slot}</p>
              <span className="text-emerald-500 text-xs font-bold uppercase">{b.status}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}