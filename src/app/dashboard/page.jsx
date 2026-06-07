"use client";
import PrivateRoute from "@/components/PrivateRoute";
import { useState, useEffect } from "react";

// 1. The Main Page (Route)
export default function DashboardPage() {
  return (
    <PrivateRoute>
      <DashboardContent />
    </PrivateRoute>
  );
}

// 2. The Content
function DashboardContent() {
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

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/bookings/${id}`, {
        method: 'DELETE',
      });
      const result = await res.json();
      if (result.success) {
        setBookings(bookings.filter(booking => booking._id !== id));
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white pt-28 px-6">
      <h1 className="text-3xl font-black mb-8">Player Dashboard</h1>
      
      {loading ? (
        <div className="text-emerald-400">Loading...</div>
      ) : bookings.length === 0 ? (
        <div className="text-slate-400">No bookings found for this account.</div>
      ) : (
        <div className="grid gap-4">
          {bookings.map((b) => (
            <div key={b._id} className="bg-slate-900 p-6 rounded-2xl border border-white/10 mb-4">
              <h3 className="font-bold text-lg">{b.facilityTitle || "Arena"}</h3>
              <p className="text-slate-400">{b.date} | {b.slot}</p>
              <span className="text-emerald-500 text-xs font-bold uppercase">{b.status}</span>
              
              <button 
                onClick={() => handleDelete(b._id)} 
                className="bg-red-500 text-white px-4 py-2 mt-4 rounded-lg block"
              >
                Cancel Booking
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}