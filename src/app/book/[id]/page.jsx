"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { API_URL } from "@/lib/api"; 

export default function BookingPage() {
  const { id } = useParams();
  const router = useRouter(); // FIXED: Initialized native Next.js router
  const [facility, setFacility] = useState(null);

  useEffect(() => {
    if (!id) return;

    fetch(`${API_URL}/api/facilities/${id}`)
      .then((res) => res.json())
      .then((data) => {
        // SAFE EXTRACT: Handles both raw data arrays and wrapped object definitions
        if (data && data.success) {
          setFacility(data.data);
        } else if (data) {
          setFacility(data);
        }
      })
      .catch((err) => console.error("Error fetching facility:", err));
  }, [id]);

  const handleBooking = async () => {
    const userEmail = localStorage.getItem("userEmail");
    
    if (!userEmail) {
      alert("Please login first.");
      router.push("/login");
      return;
    }

    // SAFE ACCESS: Check if facility object exists before destructuring keys
    if (!facility) {
      alert("Facility data still loading. Please wait.");
      return;
    }
    
    const bookingData = {
      facilityId: id,
      // SAFE FALLBACK: Maps either name, title, or a generic placeholder string safely
      facilityTitle: facility.name || facility.title || "Sports Arena",
      userEmail: userEmail,
      date: "2026-06-30",
      slot: "10:00 AM - 11:00 AM",
      status: "pending"
    };

    try {
      const res = await fetch(`${API_URL}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      const data = await res.json();
      
      if (data.success || data.result?.acknowledged) {
        alert("Booking success!");
        // FIXED: Using single-page routing instead of window.location window reset
        router.push("/my-bookings");
      } else {
        alert("Booking failed: " + (data.message || "Unknown server error"));
      }
    } catch (err) {
      console.error("Booking error:", err);
      alert("An error occurred while booking.");
    }
  };

  if (!facility) {
    return (
      <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center">
        Loading facility details...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] pt-24 px-6 text-white max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-black">Booking for {facility.name || facility.title || "Sports Arena"}</h1>
      <button 
        onClick={handleBooking}
        className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black py-4 rounded-xl transition text-center"
      >
        Confirm Booking Slot
      </button>
    </div>
  );
}
