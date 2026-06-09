"use client";

import { useState, useEffect } from 'react';
import { API_URL } from '@/lib/api';
import Link from 'next/link';

export default function AllFacilitiesPage() {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    fetchFacilities();
  }, []);

  const fetchFacilities = async () => {
    try {
      const res = await fetch(`${API_URL}/api/facilities`);
      const data = await res.json();
      
      if (data.success && Array.isArray(data.data)) {
        setFacilities(data.data);
      } else {
        setFacilities([]);
      }
    } catch (error) {
      console.error('Error:', error);
      setFacilities([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredFacilities = facilities.filter(f => {
    const nameMatch = (f.title || f.name || '').toLowerCase().includes(search.toLowerCase());
    const categoryMatch = selectedCategory === 'All' || (f.category || '').toLowerCase() === selectedCategory.toLowerCase();
    return nameMatch && categoryMatch;
  });

  const categories = ['All', 'Football', 'Cricket', 'Badminton', 'Swimming'];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] text-white pt-28 px-6 text-center">
        Loading facilities...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white pt-28 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Explore Arenas</h1>
        <p className="text-slate-400 mb-8">Discover top tier playing grounds near you</p>

        {/* Search and Filters */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-10">
          <div className="flex flex-col lg:flex-row gap-4">
            <input
              type="text"
              placeholder="Search by arena name or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-slate-800 border border-white/10 rounded-xl px-4 py-2 text-white"
            />
            <div className="flex gap-2 flex-wrap">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold ${
                    selectedCategory === cat
                      ? 'bg-emerald-500 text-black'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Facilities Grid */}
        {filteredFacilities.length === 0 ? (
          <div className="text-center py-20 text-slate-400 border border-dashed border-white/10 rounded-2xl">
            No facilities found.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFacilities.map((facility) => (
              <div key={facility._id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                <img
                  src={facility.image || 'https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=600'}
                  alt={facility.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-5">
                  <h3 className="text-xl font-bold mb-1">{facility.title || facility.name}</h3>
                  <p className="text-emerald-400 text-2xl font-bold mb-2">
                    ৳{facility.pricePerHour || facility.price || 0}<span className="text-sm text-slate-400">/hour</span>
                  </p>
                  <p className="text-slate-400 text-sm mb-3">📍 {facility.location}</p>
                  <p className="text-slate-300 text-sm mb-4 line-clamp-2">{facility.description}</p>
                  <div className="flex gap-3">
                    <Link href={`/facilities/${facility._id}`} className="flex-1 text-center bg-slate-800 hover:bg-slate-700 py-2 rounded-xl text-sm">
                      Details
                    </Link>
                    <Link href={`/book/${facility._id}`} className="flex-1 text-center bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-2 rounded-xl text-sm">
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}