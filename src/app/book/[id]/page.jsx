"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
// This import is CRITICAL. It connects your component to your URL settings.
import { API_URL } from "@/lib/api"; 

export default function BookingPage() {
  const { id } = useParams();
  const [facility, setFacility] = useState(null);

  useEffect(() => {
    // Fetches the specific facility details
    fetch(`${API_URL}/api/facilities/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setFacility(data.data);
        }
      })
      .catch((err) => console.error("Error fetching facility:", err));
  }, [id]);

  const handleBooking = async () => {
    const userEmail = localStorage.getItem("userEmail");
    
    const bookingData = {
      facilityId: id,
      facilityTitle: facility.name,
      userEmail: userEmail,
      date: "2026-06-30",
      slot: "10:00 AM - 11:00 AM",
      status: "pending"
    };

    try {
      // Sends the booking request to the Render backend
      const res = await fetch(`${API_URL}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      const data = await res.json();
      
      if (data.success) {
        alert("Booking success!");
        window.location.href = "/my-bookings";
      } else {
        alert("Booking failed: " + data.message);
      }
    } catch (err) {
      console.error("Booking error:", err);
      alert("An error occurred while booking.");
    }
  };

  if (!facility) return <div>Loading...</div>;

  return (
    <div className="pt-24 px-6 text-white">
      <h1>Booking for {facility.name}</h1>
      <button 
        onClick={handleBooking}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Confirm Booking
      </button>
    </div>
  );
}