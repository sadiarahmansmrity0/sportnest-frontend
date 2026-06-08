"use client";

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
  const [showBookingForm, setShowBookingForm] =
    useState(false);

  const [bookingDate, setBookingDate] =
    useState("");

  const [bookingSlot, setBookingSlot] =
    useState("");

  const [bookingStatus, setBookingStatus] =
    useState("");

  const [bookingLoading, setBookingLoading] =
    useState(false);

  // =========================
  // FETCH FACILITY
  // =========================
  useEffect(() => {

    if (!id) return;

    async function fetchFacility() {

      try {

        const res = await fetch(
          `http://localhost:5000/api/facilities/${id}`
        );

        const data = await res.json();

        console.log("FACILITY DATA:", data);

        setFacility(data.data || data);

      } catch (err) {

        console.error(
          "Failed to fetch facility:",
          err
        );

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

    // GET REAL USER EMAIL
    const userEmail =
      localStorage.getItem("userEmail");

    console.log("CURRENT USER:", userEmail);

    // CHECK LOGIN
    if (!userEmail) {

      alert("Please login first.");

      router.push("/login");

      return;
    }

    // VALIDATION
    if (!bookingDate || !bookingSlot) {

      alert(
        "Please select both date and slot."
      );

      return;
    }

    try {

      setBookingLoading(true);

      setBookingStatus("Processing booking...");

      // FINAL BOOKING OBJECT
      const bookingData = {

        facilityId: facility._id,

        facilityTitle:
          facility.title || facility.name,

        userEmail: userEmail,

        date: bookingDate,

        slot: bookingSlot,

        status: "pending",
      };

      console.log(
        "FINAL BOOKING DATA:",
        bookingData
      );

      const res = await fetch(
        "http://localhost:5000/api/bookings",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(
            bookingData
          ),
        }
      );

      const data = await res.json();

      console.log(
        "BOOKING RESPONSE:",
        data
      );

      if (data.success) {

        setBookingStatus(
          "Booking Confirmed ✅"
        );

        // RESET FORM
        setBookingDate("");
        setBookingSlot("");

        // CLOSE FORM AFTER SUCCESS
        setTimeout(() => {

          setShowBookingForm(false);

          router.push("/dashboard");

        }, 1200);

      } else {

        setBookingStatus(
          data.message ||
            "Booking failed"
        );
      }

    } catch (err) {

      console.error(err);

      setBookingStatus(
        "Server connection failed."
      );

    } finally {

      setBookingLoading(false);
    }
  };

  // =========================
  // LOADING STATE
  // =========================
  if (loading) {

    return (
      <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center">
        Loading facility details...
      </div>
    );
  }

  // =========================
  // NO FACILITY FOUND
  // =========================
  if (!facility) {

    return (
      <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center">
        Facility not found.
      </div>
    );
  }

  return (
    <div className="bg-[#020617] text-white min-h-screen pt-24 px-6 pb-20">

      <div className="max-w-5xl mx-auto">

        {/* BACK BUTTON */}
        <Link
          href="/"
          className="inline-flex items-center text-slate-400 hover:text-emerald-400 transition mb-6"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Home
        </Link>

        {/* CARD */}
        <div className="bg-slate-900/50 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">

          {/* IMAGE */}
          <img
            src={
              facility.image ||
              "https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=1200"
            }
            alt={
              facility.title ||
              facility.name
            }
            className="w-full h-[350px] object-cover"
          />

          {/* CONTENT */}
          <div className="p-8">

            {/* TITLE */}
            <h1 className="text-4xl font-black">
              {facility.title ||
                facility.name}
            </h1>

            {/* LOCATION */}
            <div className="flex items-center text-slate-400 mt-3 mb-8">

              <MapPin className="h-4 w-4 mr-2 text-emerald-400" />

              {facility.location ||
                "Location unavailable"}
            </div>

            {/* ABOUT */}
            <div className="mb-8">

              <h3 className="font-bold text-lg flex items-center mb-3">

                <Info className="h-5 w-5 mr-2 text-emerald-500" />

                About Facility
              </h3>

              <p className="text-slate-400 leading-relaxed">

                {facility.description ||
                  "No description available."}
              </p>
            </div>

            {/* BOOK BUTTON */}
            {!showBookingForm ? (

              <button
                onClick={() =>
                  setShowBookingForm(true)
                }
                className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-2xl transition-all"
              >
                Reserve This Arena
              </button>

            ) : (

              <div className="bg-slate-950 border border-emerald-500/20 rounded-2xl p-6 mt-4">

                <h3 className="text-xl font-bold mb-6">
                  Complete Your Booking
                </h3>

                {/* DATE */}
                <div className="mb-4">

                  <label className="text-sm text-slate-300 mb-2 flex items-center">

                    <Calendar className="h-4 w-4 mr-2 text-emerald-400" />

                    Select Date
                  </label>

                  <input
                    type="date"
                    value={bookingDate}
                    min={
                      new Date()
                        .toISOString()
                        .split("T")[0]
                    }
                    onChange={(e) =>
                      setBookingDate(
                        e.target.value
                      )
                    }
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                {/* SLOT */}
                <div className="mb-6">

                  <label className="text-sm text-slate-300 mb-2 flex items-center">

                    <Clock className="h-4 w-4 mr-2 text-emerald-400" />

                    Select Time Slot
                  </label>

                  <select
                    value={bookingSlot}
                    onChange={(e) =>
                      setBookingSlot(
                        e.target.value
                      )
                    }
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="">
                      Choose a slot
                    </option>

                    <option value="06:00 PM - 07:30 PM">
                      06:00 PM - 07:30 PM
                    </option>

                    <option value="08:00 PM - 09:30 PM">
                      08:00 PM - 09:30 PM
                    </option>

                    <option value="10:00 PM - 11:30 PM">
                      10:00 PM - 11:30 PM
                    </option>

                  </select>
                </div>

                {/* STATUS */}
                {bookingStatus && (

                  <div className="mb-4 text-sm text-emerald-400">
                    {bookingStatus}
                  </div>

                )}

                {/* BUTTONS */}
                <div className="flex gap-3">

                  <button
                    onClick={() =>
                      setShowBookingForm(false)
                    }
                    className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl font-medium transition"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={
                      handleConfirmBooking
                    }
                    disabled={bookingLoading}
                    className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition"
                  >
                    {bookingLoading
                      ? "Booking..."
                      : "Confirm Booking"}
                  </button>

                </div>

              </div>

            )}
          </div>
        </div>
      </div>
    </div>
  );
}