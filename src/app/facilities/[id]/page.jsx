"use client";
import { API_URL } from "@/lib/api"; // Ensure this is imported
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  MapPin,
  Info,
  ChevronLeft,
  Calendar,
  Clock,
} from "lucide-react";

import Link from "next/link";

export default function FacilityDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const [facility, setFacility] = useState(null);
  const [loading, setLoading] = useState(true);

  // BOOKING STATES
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingSlot, setBookingSlot] = useState("");
  const [bookingStatus, setBookingStatus] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);

  // =========================
  // FETCH FACILITY
  // =========================
  useEffect(() => {
    if (!id) return;

    async function fetchFacility() {
      try {
        // FIXED: Using ${API_URL}
        const res = await fetch(`${API_URL}/api/facilities/${id}`);
        const data = await res.json();
        setFacility(data.data || data);
      } catch (err) {
        console.error("Failed to fetch facility:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchFacility();
  }, [id]);

  // =========================
  // BOOKING FUNCTION
  // =========================
  const handleConfirmBooking = async () => {
    const userEmail = localStorage.getItem("userEmail");

    if (!userEmail) {
      alert("Please login first.");
      router.push("/login");
      return;
    }

    if (!bookingDate || !bookingSlot) {
      alert("Please select both date and slot.");
      return;
    }

    try {
      setBookingLoading(true);
      setBookingStatus("Processing booking...");

      const bookingData = {
        facilityId: facility._id,
        facilityTitle: facility.title || facility.name,
        userEmail: userEmail,
        date: bookingDate,
        slot: bookingSlot,
        status: "pending",
      };

      // FIXED: Using ${API_URL}
      const res = await fetch(`${API_URL}/api/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      const data = await res.json();

      if (data.success) {
        setBookingStatus("Booking Confirmed ✅");
        setBookingDate("");
        setBookingSlot("");

        setTimeout(() => {
          setShowBookingForm(false);
          router.push("/dashboard");
        }, 1200);
      } else {
        setBookingStatus(data.message || "Booking failed");
      }
    } catch (err) {
      console.error(err);
      setBookingStatus("Server connection failed.");
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center">
        Loading facility details...
      </div>
    );
  }

  if (!facility) {
    return (
      <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center">
        Facility not found.
      </div>
    );
  }

  const price = facility.pricePerHour || facility.price || 0;

  return (
    <div className="bg-[#020617] text-white min-h-screen pt-24 px-6 pb-20">
      {/* ... rest of your JSX remains the same ... */}
    </div>
  );
}