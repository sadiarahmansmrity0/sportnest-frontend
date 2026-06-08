"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, MapPin, Activity, ChevronRight, Sparkles, ShieldCheck, Star, Users } from "lucide-react";

export default function HomePage() {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  // 1. Data Fetching
  useEffect(() => {
    async function fetchFacilities() {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5000/api/facilities");
        const data = await response.json();

        // Safely extract the array regardless of object structure
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

  // 2. Robust Filtering Logic
 // Inside your HomePage, update the filter logic:
const filteredFacilities = facilities.filter((facility) => {
    const name = (facility.name || facility.title || "").toLowerCase();
    const location = (facility.location || "").toLowerCase();
    const query = searchQuery.toLowerCase();
    const locFilter = selectedLocation.toLowerCase();

    return (name.includes(query) || (facility.category || "").toLowerCase().includes(query)) 
           && (selectedLocation === "" || location.includes(locFilter));
});
  // 3. Unique Location Extraction
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
              <div key={facility._id} className="bg-slate-900/30 border border-white/10 rounded-2xl overflow-hidden p-5 flex flex-col justify-between">
                <div>
                  <img src={facility.image || "https://images.unsplash.com/photo-1541252260730-0412e8e2108e?w=600"} className="h-48 w-full object-cover rounded-lg mb-4" />
                  <h3 className="font-bold text-lg">{facility.title}</h3>
                  <div className="flex items-center text-slate-400 text-sm mt-1">
                    <MapPin className="h-4 w-4 mr-1" /> {facility.location}
                  </div>
                </div>
                <Link 
                  href={`/facilities/${facility._id}`}
                  className="mt-6 w-full py-2 bg-emerald-500 text-slate-950 font-bold text-center rounded-xl hover:bg-emerald-400 transition"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}