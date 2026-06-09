"use client";

import { useState, useEffect } from 'react';
import FacilityCard from '@/components/FacilityCard';

export default function AllFacilitiesPage() {
  const [facilities, setFacilities] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filtering & Sorting State
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortByPrice, setSortByPrice] = useState('none');

  useEffect(() => {
    // Use direct URL instead of API_URL
    fetch('http://localhost:5000/api/facilities')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("DEBUG: Catalog Loaded:", data);
        
        let targetArray = [];
        if (data && Array.isArray(data.data)) {
          targetArray = data.data;
        } else if (Array.isArray(data)) {
          targetArray = data;
        } else if (data && Array.isArray(data.facilities)) {
          targetArray = data.facilities;
        }

        const validated = targetArray.map(f => ({
          ...f,
          name: f.name?.trim() || f.title?.trim() || 'Sports Arena',
          category: f.category || f.FacilityType || 'General',
          location: f.location || 'Location not specified',
          price: f.price || f.pricePerHour || 0,
          description: f.description || 'Premium sports facility',
          image: f.image || '/default-arena.jpg'
        }));

        setFacilities(validated);
        setFiltered(validated);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Catalog connection error:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!facilities || facilities.length === 0) {
      setFiltered([]);
      return;
    }

    let filteredResults = facilities.filter((f) => {
      const nameMatch = f.name?.toLowerCase().includes(search.toLowerCase()) || false;
      const locationMatch = f.location?.toLowerCase().includes(search.toLowerCase()) || false;
      const categoryMatch = selectedCategory === 'All' || f.category.toLowerCase() === selectedCategory.toLowerCase();
      
      return (nameMatch || locationMatch) && categoryMatch;
    });

    if (sortByPrice === 'asc') {
      filteredResults = [...filteredResults].sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0)); 
    } else if (sortByPrice === 'desc') {
      filteredResults = [...filteredResults].sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0));
    }

    setFiltered(filteredResults);
  }, [search, selectedCategory, sortByPrice, facilities]);

  const categories = ['All', 'Football', 'Cricket', 'Badminton', 'Swimming'];

  // Show error message if backend is not connected
  if (error) {
    return (
      <div className="min-h-screen bg-[#020617] text-slate-100 pt-28 pb-20 antialiased">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-8 text-center">
            <h2 className="text-xl font-bold text-red-400 mb-2">Connection Error</h2>
            <p className="text-slate-300">Failed to connect to backend server.</p>
            <p className="text-slate-400 text-sm mt-2">Make sure your backend is running on http://localhost:5000</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-emerald-500 text-slate-950 rounded-lg font-semibold"
            >
              Retry Connection
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 pt-28 pb-20 antialiased">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="mb-12 space-y-2">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">Explore Arenas</h1>
          <p className="text-sm text-slate-400">Discover top tier playing grounds near your coordinates and secure active slots.</p>
        </div>

        <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-5 rounded-2xl flex flex-col lg:flex-row gap-4 items-center justify-between mb-10 shadow-xl">
          <div className="relative w-full lg:max-w-xs">
            <input 
              type="text" 
              placeholder="Search by arena name or location..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-950/60 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 transition-all"
            />
          </div>

          <div className="flex flex-wrap gap-2 w-full lg:w-auto items-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all ${
                  selectedCategory === cat 
                    ? 'bg-emerald-500 border-emerald-500 text-slate-950 shadow-md shadow-emerald-500/10' 
                    : 'bg-white/5 border-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="w-full lg:w-auto flex items-center gap-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">Sort By:</span>
            <select
              value={sortByPrice}
              onChange={(e) => setSortByPrice(e.target.value)}
              className="bg-slate-950/60 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-300 focus:outline-none focus:border-emerald-500/50 cursor-pointer w-full lg:w-auto"
            >
              <option value="none">Default Listing</option>
              <option value="asc">Price: Low to High</option>
              <option value="desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            [1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="bg-white/5 border border-white/10 rounded-3xl p-6 animate-pulse">
                <div className="bg-slate-800 h-48 rounded-xl mb-5" />
                <div className="space-y-3">
                  <div className="bg-slate-800 h-5 rounded w-1/4" />
                  <div className="bg-slate-800 h-6 rounded w-3/4" />
                  <div className="bg-slate-800 h-4 rounded w-1/2 mt-4" />
                </div>
              </div>
            ))
          ) : filtered.length > 0 ? (
            filtered.map((item) => (
              <div 
                key={item._id || item.id || Math.random()} 
                className="group rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-emerald-500/40 hover:shadow-[0_0_40px_rgba(16,185,129,0.15)] transition-all duration-500 hover:-translate-y-1 overflow-hidden"
              >
                <FacilityCard facility={item} />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-24 border border-dashed border-white/10 rounded-3xl text-slate-500 text-sm">
              No matching facilities match your parameters.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}