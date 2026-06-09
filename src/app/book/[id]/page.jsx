"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { API_URL } from '@/lib/api';
import { Calendar, Clock, MapPin, DollarSign, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function BookingPage() {
  const { id } = useParams();
  const router = useRouter();
  const [facility, setFacility] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [bookingLoading, setBookingLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (id) {
      fetch(`${API_URL}/api/facilities/${id}`)
        .then(res => res.json())
        .then(data => {
          setFacility(data.data || data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [id]);

  const handleBooking = async () => {
    if (!selectedDate || !selectedSlot) {
      setMessage('Please select date and time slot');
      return;
    }

    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
      router.push('/login');
      return;
    }

    setBookingLoading(true);
    setMessage('');

    try {
      const res = await fetch(`${API_URL}/api/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          facilityId: facility._id,
          facilityTitle: facility.title || facility.name,
          userEmail: userEmail,
          date: selectedDate,
          slot: selectedSlot,
          status: 'pending'
        })
      });

      const data = await res.json();
      
      if (data.success) {
        setMessage('Booking confirmed successfully!');
        setTimeout(() => router.push('/dashboard'), 2000);
      } else {
        setMessage('Booking failed. Please try again.');
      }
    } catch (error) {
      setMessage('Error connecting to server');
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] text-white pt-28 text-center">
        Loading...
      </div>
    );
  }

  if (!facility) {
    return (
      <div className="min-h-screen bg-[#020617] text-white pt-28 text-center">
        Facility not found
      </div>
    );
  }

  const timeSlots = ['06:00 PM - 07:30 PM', '08:00 PM - 09:30 PM', '10:00 PM - 11:30 PM'];

  return (
    <div className="min-h-screen bg-[#020617] text-white pt-28 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/all-facilities" className="inline-flex items-center gap-2 text-slate-400 hover:text-emerald-400 mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Facilities
        </Link>

        <div className="bg-slate-900/50 border border-white/10 rounded-2xl overflow-hidden">
          <div className="relative h-64">
            <img 
              src={facility.image || "https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=1200"} 
              alt={facility.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
          </div>

          <div className="p-8">
            <h1 className="text-3xl font-bold mb-2">Booking for {facility.title || facility.name}</h1>
            
            <div className="flex items-center gap-4 text-slate-400 mb-6">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" /> {facility.location}
              </div>
              <div className="flex items-center gap-1">
                <DollarSign className="w-4 h-4" /> ৳{facility.pricePerHour || facility.price}/hour
              </div>
            </div>

            <div className="border-t border-white/10 pt-6">
              <h2 className="text-xl font-bold mb-4">Confirm Booking Slot</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Select Date</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm text-slate-400 mb-2">Select Time Slot</label>
                  <div className="grid grid-cols-3 gap-3">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setSelectedSlot(slot)}
                        className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                          selectedSlot === slot
                            ? 'bg-emerald-500 text-black'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                {message && (
                  <div className={`p-3 rounded-xl text-center text-sm ${
                    message.includes('confirmed') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                  }`}>
                    {message}
                  </div>
                )}

                <button
                  onClick={handleBooking}
                  disabled={bookingLoading}
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-xl transition-all disabled:opacity-50"
                >
                  {bookingLoading ? 'Processing...' : 'Confirm Booking'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}