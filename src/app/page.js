"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, MapPin, Activity, ChevronRight, Sparkles, ShieldCheck, Star, Users, Globe, Calendar, Clock, Trophy } from "lucide-react";

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
        const API_URL = 'https://sportnest-server-7bbz.onrender.com';
        const response = await fetch(`${API_URL}/api/facilities`);
        const data = await response.json();

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

  // Filtering Logic
  const filteredFacilities = facilities.filter((facility) => {
    const title = (facility.title || facility.name || "").toLowerCase();
    const location = (facility.location || "").toLowerCase();
    const query = searchQuery.toLowerCase();
    const locFilter = selectedLocation.toLowerCase();

    return (title.includes(query) || (facility.category || "").toLowerCase().includes(query)) 
           && (selectedLocation === "" || location.includes(locFilter));
  });

  // Get first 6 facilities for featured section
  const featuredFacilities = filteredFacilities.slice(0, 6);

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
          <p className="text-slate-400 max-w-2xl mx-auto">
            Discover and book top-tier sports facilities - football turfs, badminton courts, 
            swimming pools, and more. Instant confirmation, secure payments.
          </p>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto mt-8 bg-slate-900/60 p-2.5 rounded-2xl border border-white/10 backdrop-blur-md flex flex-col md:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name or category..."
                className="w-full bg-transparent pl-10 pr-4 py-2.5 text-sm focus:outline-none text-white"
              />
            </div>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="bg-transparent px-4 py-2.5 text-sm text-slate-400 focus:outline-none cursor-pointer border border-white/10 rounded-xl md:border-0"
            >
              <option value="" className="bg-slate-900">All Locations</option>
              {uniqueLocations.map((loc, i) => (
                <option key={i} value={loc} className="bg-slate-900">{loc}</option>
              ))}
            </select>
           
          </div>
        </div>
      </section>

      {/* Featured Facilities Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-black">Available Play Arenas</h2>
            <p className="text-slate-400 text-sm mt-1">Discover top-tier playing grounds near you</p>
          </div>
          <Link href="/all-facilities" className="text-emerald-400 hover:text-emerald-300 text-sm font-semibold flex items-center gap-1">
            View All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-2 text-slate-400">Loading arenas...</p>
          </div>
        ) : featuredFacilities.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-white/10 rounded-2xl">
            <Activity className="h-10 w-10 mx-auto text-slate-600 mb-2" />
            <p className="text-slate-400">No matching facilities found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredFacilities.map((facility) => (
              <div key={facility._id} className="bg-slate-900/30 border border-white/10 rounded-2xl overflow-hidden hover:border-emerald-500/30 transition-all group">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={facility.image || "https://images.unsplash.com/photo-1541252260730-0412e8e2108e?w=600"} 
                    alt={facility.title || facility.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold text-emerald-400">
                    {facility.category || "Sports"}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-xl mb-1">{facility.title || facility.name}</h3>
                  <div className="text-emerald-400 font-bold text-2xl mb-2">
                    ৳{facility.pricePerHour || facility.price || 0}
                    <span className="text-xs text-slate-400 font-normal"> /hour</span>
                  </div>
                  <div className="flex items-center text-slate-400 text-sm mb-4">
                    <MapPin className="h-3 w-3 mr-1" /> 
                    {facility.location || "Location TBD"}
                  </div>
                  <Link 
                    href={`/facilities/${facility._id}`}
                    className="block w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-center rounded-xl transition-all"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
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
              <Clock className="w-8 h-8 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">Instant Booking</h3>
            <p className="text-slate-400 text-sm">Reserve your favourite sports facility in under 60 seconds, anytime, anywhere.</p>
          </div>

          {/* Card 2 - Secure & Reliable */}
          <div className="bg-slate-900/30 border border-white/10 rounded-2xl p-8 text-center hover:border-emerald-500/30 transition-all group">
            <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-emerald-500/20 transition-all">
              <ShieldCheck className="w-8 h-8 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">Secure & Reliable</h3>
            <p className="text-slate-400 text-sm">JWT-protected accounts and encrypted transactions keep your data safe.</p>
          </div>

          {/* Card 3 - Premium Venues */}
          <div className="bg-slate-900/30 border border-white/10 rounded-2xl p-8 text-center hover:border-emerald-500/30 transition-all group">
            <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-emerald-500/20 transition-all">
              <Sparkles className="w-8 h-8 text-emerald-400" />
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

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-emerald-900/30 to-slate-900/30 rounded-3xl p-12 text-center border border-white/10">
          <Trophy className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
          <h2 className="text-3xl font-black mb-4">Ready to Play?</h2>
          <p className="text-slate-400 mb-6 max-w-2xl mx-auto">
            Join thousands of athletes who book their favorite sports facilities with SportNest. 
            Find your arena, book your slot, and play!
          </p>
          <Link 
            href="/all-facilities" 
            className="inline-block px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition-all"
          >
            Explore All Facilities
          </Link>
        </div>
      </section>

    </div>
  );
}