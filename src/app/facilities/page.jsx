'use client';
import { useState, useEffect } from 'react';
import FacilityCard from '@/components/FacilityCard';

export default function FacilitiesPage() {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/facilities')
      .then((res) => res.json())
      .then((data) => {
        // Check if the incoming data is already a direct array or if it's wrapped inside an object property
        if (Array.isArray(data)) {
          setFacilities(data);
        } else if (data && Array.isArray(data.facilities)) {
          setFacilities(data.facilities);
        } else {
          setFacilities([]); // Fallback to safe empty array if structure is mismatched
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed fetching facilities:", err);
        setFacilities([]); // Fallback on connection error
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-white p-10 text-center text-lg">Loading amazing arenas...</div>;

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8 md:p-16">
      <div className="max-w-7xl mx-auto space-y-8 pt-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Available Arenas & Fields</h1>
          <p className="text-gray-400 mt-2">Pick your playground and reserve your slot instantly.</p>
        </div>

        {/* Responsive Grid display mapping over your MongoDB cluster documents */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Added optional chaining 'facilities?.map' to prevent crashes if it isn't loaded yet */}
          {Array.isArray(facilities) && facilities.length > 0 ? (
            facilities.map((field) => (
              <FacilityCard key={field._id} facility={field} />
            ))
          ) : (
            <p className="text-gray-400 col-span-full text-center py-10">No facilities available at the moment.</p>
          )}
        </div>
      </div>
    </div>
  );
}