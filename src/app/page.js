"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MapPin, Activity, Globe, Calendar, Clock, Trophy, Sparkles } from "lucide-react";

export default function HomePage() {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  useEffect(() => {
    const API_URL = 'https://sportnest-server-7bbz.onrender.com';
    
    async function fetchFacilities() {
      try {
        setLoading(true);
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

  const filteredFacilities = facilities.filter((facility) => {
    const title = (facility.title || facility.name || "").toLowerCase();
    const location = (facility.location || "").toLowerCase();
    const query = searchQuery.toLowerCase();
    const locFilter = selectedLocation.toLowerCase();

    return (title.includes(query) || (facility.category || "").toLowerCase().includes(query)) 
           && (selectedLocation === "" || location.includes(locFilter));
  });

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
              className="flex-1 bg-transparent px-4 py-2.5 text-sm focus:outline-none text-white"
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
              <div key={facility._id} className="bg-slate-900/30 border border-white/10 rounded-2xl overflow-hidden hover:border-emerald-500/30 transition-all group">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={facility.image || "https://images.unsplash.com/photo-1541252260730-0412e8e2108e?w=600"} 
                    alt={facility.title || facility.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Category Badge */}
                  <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold text-emerald-400">
                    {facility.category || "Sports"}
                  </span>
                </div>
                
                {/* Content */}
                <div className="p-5">
                  <h3 className="font-bold text-xl mb-1">{facility.title || facility.name}</h3>
                  
                  {/* PRICE DISPLAY - ADDED HERE */}
                  <div className="text-emerald-400 font-bold text-2xl mb-2">
                    ৳{facility.pricePerHour || facility.price || 0}
                    <span className="text-xs text-slate-400 font-normal"> /hour</span>
                  </div>
                  
                  <div className="flex items-center text-slate-400 text-sm mb-4">
                    <MapPin className="h-3 w-3 mr-1" /> 
                    {facility.location || "Location TBD"}
                  </div>
                  
                  <p className="text-slate-400 text-sm line-clamp-2 mb-4">
                    {facility.description || "Premium sports facility with modern amenities."}
                  </p>
                  
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
    </div>
  );
}