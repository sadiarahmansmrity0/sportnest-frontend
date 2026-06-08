"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, MapPin, Activity, Sparkles } from "lucide-react";
import FacilityCard from "@/components/FacilityCard";

export default function HomePage() {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  // Data Fetching
  useEffect(() => {
    async function fetchFacilities() {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5000/api/facilities");
        const data = await response.json();

        // Safely extract the array
        if (data && Array.isArray(data.data)) {
          setFacilities(data.data);
        } else if (Array.isArray(data)) {
          setFacilities(data);
        } else {
          setFacilities([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setFacilities([]);
      } finally {
        setLoading(false);
      }
    }
    fetchFacilities();
  }, []);

  // Filtering Logic - FIXED to use 'title' instead of 'name'
  const filteredFacilities = facilities.filter((facility) => {
    const title = (facility.title || "").toLowerCase();
    const location = (facility.location || "").toLowerCase();
    const query = searchQuery.toLowerCase();
    const locFilter = selectedLocation.toLowerCase();

    return (title.includes(query) || (facility.category || "").toLowerCase().includes(query)) 
           && (selectedLocation === "" || location.includes(locFilter));
  });

  // Unique Locations
  const uniqueLocations = [...new Set(facilities.map((f) => f.location).filter(Boolean))];

  return (
    <div className="bg-[#020617] text-white min-h-screen pt-20">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 px-6 border-b border-white/5">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight">
            Find Your Match. <br />
            <span className="bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
              Reserve Your Premium Arena.
            </span>
          </h1>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto mt-8 bg-slate-900/60 p-2.5 rounded-2xl border border-white/10 backdrop-blur-md flex flex-col md:flex-row gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or category..."
              className="flex-1 bg-transparent px-4 py-2.5 text-sm focus:outline-none"
            />
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="bg-transparent px-4 py-2.5 text-sm text-slate-400 focus:outline-none cursor-pointer"
            >
              <option value="" className="bg-slate-900">All Locations</option>
              {uniqueLocations.map((loc, i) => (
                <option key={i} value={loc} className="bg-slate-900">{loc}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Facility Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-black mb-8">Available Play Arenas</h2>
        
        {loading ? (
          <div className="text-center py-20">Loading...</div>
        ) : filteredFacilities.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-white/10 rounded-2xl">
            <Activity className="h-10 w-10 mx-auto text-slate-600 mb-2" />
            <p className="text-slate-400">No matching facilities found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFacilities.map((facility) => (
              <FacilityCard key={facility._id} facility={facility} />
            ))}
          </div>
        )}
      </section>
      {/* Why Choose SportNest Section */}
<section className="max-w-7xl mx-auto px-4 py-20">
  <div className="text-center mb-12">
    <h2 className="text-3xl md:text-4xl font-black mb-4">Why Choose SportNest?</h2>
    <p className="text-slate-400">Everything you need for a seamless sports booking experience</p>
  </div>
  
  <div className="grid md:grid-cols-3 gap-8">
    {/* Card 1 - Instant Booking */}
    <div className="bg-slate-900/30 border border-white/10 rounded-2xl p-8 text-center hover:border-emerald-500/30 transition-all group">
      <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-emerald-500/20 transition-all">
        <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 className="text-xl font-bold mb-2">Instant Booking</h3>
      <p className="text-slate-400 text-sm">Reserve your favourite sports facility in under 60 seconds, anytime, anywhere.</p>
    </div>

    {/* Card 2 - Secure & Reliable */}
    <div className="bg-slate-900/30 border border-white/10 rounded-2xl p-8 text-center hover:border-emerald-500/30 transition-all group">
      <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-emerald-500/20 transition-all">
        <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      </div>
      <h3 className="text-xl font-bold mb-2">Secure & Reliable</h3>
      <p className="text-slate-400 text-sm">JWT-protected accounts and encrypted transactions keep your data safe.</p>
    </div>

    {/* Card 3 - Premium Venues */}
    <div className="bg-slate-900/30 border border-white/10 rounded-2xl p-8 text-center hover:border-emerald-500/30 transition-all group">
      <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-emerald-500/20 transition-all">
        <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      </div>
      <h3 className="text-xl font-bold mb-2">Premium Venues</h3>
      <p className="text-slate-400 text-sm">Hand-curated, top-quality sports facilities across the city.</p>
    </div>
  </div>
</section>
{/* Testimonials Section */}
<section className="max-w-7xl mx-auto px-4 py-20 border-t border-white/10">
  <div className="text-center mb-12">
    <h2 className="text-3xl md:text-4xl font-black mb-4">What Our Players Are Saying</h2>
    <p className="text-slate-400">Join hundreds of athletes who book their venues effortlessly.</p>
  </div>
  
  <div className="grid md:grid-cols-3 gap-6">
    {/* Testimonial 1 */}
    <div className="bg-slate-900/30 border border-white/10 rounded-2xl p-6 hover:border-emerald-500/30 transition-all">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
          T
        </div>
        <div>
          <h4 className="font-bold">Tahmid Hasan</h4>
          <p className="text-xs text-emerald-400">Regular Striker</p>
        </div>
      </div>
      <p className="text-slate-300 text-sm mb-4 leading-relaxed">
        "Absolutely love using SportNest. Booking a slot for our weekend futsal match takes less than a minute now. No more calling the venue owners repeatedly!"
      </p>
      <div className="flex justify-between items-center">
        <span className="text-xs text-slate-500">Elite Turf & Futsal Ground</span>
        <span className="text-xs text-slate-500">May 20, 2026</span>
      </div>
    </div>

    {/* Testimonial 2 */}
    <div className="bg-slate-900/30 border border-white/10 rounded-2xl p-6 hover:border-emerald-500/30 transition-all">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
          A
        </div>
        <div>
          <h4 className="font-bold">Arif Rahman</h4>
          <p className="text-xs text-emerald-400">Cricket Club Captain</p>
        </div>
      </div>
      <p className="text-slate-300 text-sm mb-4 leading-relaxed">
        "The real-time facility availability tracker is incredibly accurate. We managed to secure a prime practice slot during peak Friday hours without any overlapping issues."
      </p>
      <div className="flex justify-between items-center">
        <span className="text-xs text-slate-500">National Cricket Academy Nets</span>
        <span className="text-xs text-slate-500">May 18, 2026</span>
      </div>
    </div>

    {/* Testimonial 3 */}
    <div className="bg-slate-900/30 border border-white/10 rounded-2xl p-6 hover:border-emerald-500/30 transition-all">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
          N
        </div>
        <div>
          <h4 className="font-bold">Nusrat Jahan</h4>
          <p className="text-xs text-emerald-400">Badminton Enthusiast</p>
        </div>
      </div>
      <p className="text-slate-300 text-sm mb-4 leading-relaxed">
        "Super clean user interface. The 'My Bookings' section makes it incredibly easy to track active reservations and view digital receipts on the go."
      </p>
      <div className="flex justify-between items-center">
        <span className="text-xs text-slate-500">Woodfloor Badminton Court Arena</span>
        <span className="text-xs text-slate-500">May 14, 2026</span>
      </div>
    </div>
  </div>
</section>
    </div>
  );
}