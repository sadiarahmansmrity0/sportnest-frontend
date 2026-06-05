'use client';
import { useState, useEffect } from 'react';
import FacilityCard from '@/components/FacilityCard';

export default function FacilitiesPage() {
  const [facilities, setFacilities] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/facilities')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setFacilities(data);
        } else if (data && Array.isArray(data.facilities)) {
          setFacilities(data.facilities);
        } else if (data && data.data && Array.isArray(data.data)) {
          setFacilities(data.data);
        } else {
          setFacilities([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed fetching facilities:", err);
        setFacilities([]);
        setLoading(false);
      });
  }, []);

  //  Filter logic matching user search criteria & picked sport tag
  const filteredFacilities = facilities.filter((field) => {
    const matchesSearch = field?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          field?.location?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || 
                            field?.category?.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  const categories = ['All', 'Football', 'Badminton', 'Cricket', 'Swimming'];

  if (loading) return <div className="text-white p-10 text-center text-lg">Loading amazing arenas...</div>;

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8 md:p-16">
      <div className="max-w-7xl mx-auto space-y-8 pt-10">
        
        {/* Header Title Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-900">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Available Arenas & Fields</h1>
            <p className="text-gray-400 mt-2">Pick your playground and reserve your slot instantly.</p>
          </div>
        </div>

        {/* Search & Category Filter Section */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-slate-900/50 p-4 rounded-2xl border border-slate-900">
          {/* Search Input field */}
          <div className="w-full md:w-96 relative">
            <input
              type="text"
              placeholder="Search by arena name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          {/* Sport Categories Buttons */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                  selectedCategory === cat
                    ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/10'
                    : 'bg-slate-950 text-gray-400 border border-slate-800 hover:text-white hover:border-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Responsive Grid Catalog display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFacilities.length > 0 ? (
            filteredFacilities.map((field) => (
              <FacilityCard key={field._id} facility={field} />
            ))
          ) : (
            <div className="col-span-full text-center py-16 bg-slate-900/20 rounded-2xl border border-dashed border-slate-900">
              <p className="text-gray-500 text-base">No arenas match your search filters.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}