'use client';
import { useState, useEffect } from 'react';
import BookingModal from '@/components/BookingModal'; // Adjust path if needed

export default function FacilityDetails({ params }) {
  const [facility, setFacility] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Temporary mock user email until your Auth setup is complete
  const loggedInUserEmail = "sadiarahmansmrity9@gmail.com"; 

  useEffect(() => {
    // Fetch individual facility details using the ID from your port 5000 API
    fetch(`http://localhost:5000/api/facilities`)
      .then((res) => res.json())
      .then((data) => {
        // Find the matching facility by ID from the array list
        const found = data.find(f => f._id === params.id);
        setFacility(found);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [params.id]);

  if (loading) return <div className="text-white p-10 text-center">Loading details...</div>;
  if (!facility) return <div className="text-white p-10 text-center">Facility not found.</div>;

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-12">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Left Side: Image */}
        <div>
          <img 
            src={facility.image} 
            alt={facility.title} 
            className="w-full h-96 object-cover rounded-2xl border border-slate-800"
          />
        </div>

        {/* Right Side: Information Content */}
        <div className="flex flex-col justify-between">
          <div className="space-y-4">
            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs px-3 py-1 rounded-full uppercase tracking-wider font-semibold">
              {facility.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">{facility.title}</h1>
            <p className="text-gray-400 leading-relaxed">{facility.description}</p>
            
            <div className="pt-4 space-y-2 text-sm text-gray-300">
              <p>📍 <span className="font-semibold text-white">Location:</span> {facility.location}</p>
              <p>💵 <span className="font-semibold text-white">Price:</span> ৳{facility.pricePerHour} / hour</p>
            </div>
          </div>

          {/* Trigger Button */}
          <div className="pt-6">
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-4 rounded-xl transition-all shadow-lg shadow-emerald-500/10 hover:scale-[1.01]"
            >
              Book Available Slot Now
            </button>
          </div>
        </div>
      </div>

      {/* Render the Booking Modal overlay conditionally */}
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