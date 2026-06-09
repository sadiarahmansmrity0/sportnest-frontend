"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { API_URL } from '@/lib/api';

export default function AddFacilityPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    image: '',
    location: '',
    pricePerHour: '',
    capacity: '',
    description: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/facilities`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          pricePerHour: Number(formData.pricePerHour),
          ownerEmail: localStorage.getItem('userEmail')
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        alert('Facility added successfully!');
        router.push('/manage-facilities');
      } else {
        alert('Failed to add facility');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error adding facility');
    } finally {
      setLoading(false);
    }
  };

  return (
    // ADD THIS DARK BACKGROUND DIV
    <div className="min-h-screen bg-[#020617] text-white pt-24 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-black">Add New Facility</h1>
          <p className="text-slate-400 mt-1">Fill in the details to list your sports arena</p>
        </div>

        {/* Form Card */}
        <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Facility Name */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Facility Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Champions Football Ground"
                className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
                required
              />
            </div>

            {/* Facility Type */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Facility Type <span className="text-red-400">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
                required
              >
                <option value="">Select a category</option>
                <option value="Football">⚽ Football</option>
                <option value="Cricket">🏏 Cricket</option>
                <option value="Badminton">🏸 Badminton</option>
                <option value="Swimming">🏊 Swimming</option>
                <option value="Tennis">🎾 Tennis</option>
                <option value="Basketball">🏀 Basketball</option>
              </select>
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Image URL
              </label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/..."
                className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
              />
              <p className="text-xs text-slate-500 mt-1">Use Unsplash or any image URL</p>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Location <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., Airport Road, Sylhet"
                className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
                required
              />
            </div>

            {/* Price Per Hour & Capacity - Side by side */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Price Per Hour (BDT) <span className="text-red-400">*</span>
                </label>
                <input
                  type="number"
                  name="pricePerHour"
                  value={formData.pricePerHour}
                  onChange={handleChange}
                  placeholder="e.g., 1200"
                  className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Capacity
                </label>
                <input
                  type="text"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                  placeholder="e.g., 20 players"
                  className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                placeholder="Describe your facility: amenities, lighting, parking, etc."
                className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-700 text-slate-950 font-bold rounded-xl transition-all mt-4"
            >
              {loading ? 'Adding Facility...' : 'Add Facility'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}