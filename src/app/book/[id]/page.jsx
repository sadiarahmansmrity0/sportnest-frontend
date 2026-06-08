"use client";
import { useParams } from "next/navigation"; // To get the ID from URL
import { useEffect, useState } from "react";

export default function BookingPage() {
  const { id } = useParams(); // This gets the ID from the URL (e.g., '6a22f87...')
  const [facility, setFacility] = useState(null);

  useEffect(() => {
    // Fetch only this one facility's details
    fetch(`http://localhost:5000/api/facilities/${id}`)
      .then(res => res.json())
      .then(data => setFacility(data.data));
  }, [id]);

 const handleBooking = async () => {
  const userEmail = localStorage.getItem("userEmail");
  
  // 1. Gather your booking data
  const bookingData = {
    facilityId: id, // From the URL
    facilityTitle: facility.name, // From the facility data we fetched
    userEmail: userEmail,
    date: "2026-06-30", // Replace these with your state values from the form inputs
    slot: "10:00 AM - 11:00 AM", // Replace with your state values
    status: "pending"
  };

  // 2. Send it to the server
  const res = await fetch("http://localhost:5000/api/bookings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bookingData),
  });

  const data = await res.json();
  
  // 3. Close the loop: Redirect the user
  if (data.success) {
    alert("Booking success!");
    window.location.href = "/my-bookings"; // Or your dashboard page
  }
};

  if (!facility) return <div>Loading...</div>;

  return (
    <div className="pt-24 px-6 text-white">
      <h1>Booking for {facility.name}</h1>
      {/* Add your booking form here */}
      <button onClick={handleBooking}>Confirm Booking</button>
    </div>
  );
}