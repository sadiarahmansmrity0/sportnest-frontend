"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { MapPin, Info, ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function FacilityDetailsPage() {
  const { id } = useParams();
  const [facility, setFacility] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Booking states
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingSlot, setBookingSlot] = useState("");
  const [bookingStatus, setBookingStatus] = useState("");

  useEffect(() => {
    if (!id) return;
    async function fetchFacility() {
      try {
        const res = await fetch(`http://localhost:5000/api/facilities/${id}`);
        const data = await res.json();
        setFacility(data.data || data);
      } catch (err) {
        console.error("Failed to fetch:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchFacility();
  }, [id]);

  const handleConfirmBooking = async () => {
    if (!bookingDate || !bookingSlot) {
      alert("Please select both a date and a time slot.");
      return;
    }

    setBookingStatus("Booking...");
    try {
      const res = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          facilityId: facility._id,
          facilityTitle: facility.title,
          userEmail: "user@example.com",
          date: bookingDate,
          slot: bookingSlot,
          status: "pending"
        }),
      });

      if (res.ok) {
        setBookingStatus("Booking confirmed! ✅");
        setShowBookingForm(false);
      } else {
        setBookingStatus("Booking failed.");
      }
    } catch (err) {
      setBookingStatus("Error connecting to server.");
    }
  };

  if (loading) return <div className="text-white text-center pt-20">Loading details...</div>;
  if (!facility) return <div className="text-white text-center pt-20">Facility not found.</div>;

  return (
    <div className="bg-[#020617] text-white min-h-screen pt-24 px-6 pb-20">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-slate-400 hover:text-emerald-400 flex items-center mb-6 text-sm">
          <ChevronLeft className="h-4 w-4" /> Back to Home
        </Link>

        <div className="bg-slate-900/50 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
          <img src={facility.image} className="w-full h-80 object-cover" alt={facility.title} />
          
          <div className="p-8">
            <h1 className="text-3xl font-black">{facility.title}</h1>
            <div className="flex items-center text-slate-400 mt-2 mb-8">
              <MapPin className="h-4 w-4 mr-1" /> {facility.location}
            </div>

            <h3 className="font-bold mb-3 flex items-center"><Info className="h-5 w-5 mr-2 text-emerald-500"/> About</h3>
            <p className="text-slate-400 leading-relaxed mb-8">{facility.description}</p>

            {!showBookingForm ? (
              <button 
                onClick={() => setShowBookingForm(true)}
                className="w-full py-4 bg-emerald-500 text-slate-950 font-black rounded-xl hover:bg-emerald-400 transition"
              >
                {bookingStatus || "Reserve This Arena"}
              </button>
            ) : (
              <div className="p-6 bg-slate-950 border border-emerald-500/30 rounded-2xl">
                <h3 className="font-bold mb-4">Complete Your Booking</h3>
                <input type="date" className="w-full bg-slate-900 p-3 rounded-lg mb-3" onChange={(e) => setBookingDate(e.target.value)} />
                <select className="w-full bg-slate-900 p-3 rounded-lg mb-4" onChange={(e) => setBookingSlot(e.target.value)}>
                  <option value="">Select a time</option>
                  <option value="06:00 PM - 07:30 PM">06:00 PM - 07:30 PM</option>
                  <option value="08:00 PM - 09:30 PM">08:00 PM - 09:30 PM</option>
                </select>
                <button onClick={handleConfirmBooking} className="w-full py-3 bg-emerald-500 text-slate-950 font-bold rounded-xl">
                  Confirm Reservation
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}