'use client';
import { useState, useEffect, use } from 'react';
import BookingModal from '@/components/BookingModal';

export default function FacilityDetails({ params: paramsPromise }) {
  // Unwrap params using React.use() to comply with Next.js standards
  const params = use(paramsPromise);
  
  const [facility, setFacility] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Temporary test user until full Auth is added
  const loggedInUserEmail = "sadiarahmansmrity9@gmail.com"; 

  useEffect(() => {
    // Fetch facilities from your backend port 5000 API
    fetch(`http://localhost:5000/api/facilities`)
      .then((res) => res.json())
      .then((data) => {
        // Match the specific facility ID from the database array
        const found = data.find(f => f._id === params.id);
        setFacility(found);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching facility details:", err);
        setLoading(false);
      });
  }, [params.id]);

  if (loading) return <div className="text-white p-10 text-center">Loading field details...</div>;
  if (!facility) return <div className="text-white p-10 text-center">Facility not found.</div>;

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-12">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 pt-10">
        
        {/* Left: Facility Image */}
        <div>
          <img 
            src={facility.image} 
            alt={facility.title} 
            className="w-full h-96 object-cover rounded-2xl border border-slate-800 shadow-xl"
          />
        </div>

        {/* Right: Detailed Content Info */}
        <div className="flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs px-3 py-1 rounded-full uppercase tracking-wider font-semibold">
              {facility.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">{facility.title}</h1>
            <p className="text-gray-400 leading-relaxed text-base">{facility.description}</p>
            
            <div className="pt-4 space-y-3 text-sm text-gray-300 border-t border-slate-900">
              <p className="flex items-center gap-2">📍 <span className="font-semibold text-white">Location:</span> {facility.location}</p>
              <p className="flex items-center gap-2">৳ <span className="font-semibold text-white">Price:</span> {facility.pricePerHour} BDT / hour</p>
            </div>
          </div>

          {/* Booking Action Button */}
          <div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-4 rounded-xl transition-all shadow-lg shadow-emerald-500/20 active:scale-[0.99]"
            >
              Book Available Slot Now
            </button>
          </div>
        </div>
      </div>

      {/* Booking Overlay Modal popup */}
      {isModalOpen && (
        <BookingModal 
          facility={facility} 
          userEmail={loggedInUserEmail} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </div>
  );
}