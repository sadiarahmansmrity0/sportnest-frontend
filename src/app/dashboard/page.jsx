"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { API_URL } from '@/lib/api';

export default function DashboardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [userEmail, setUserEmail] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Handle Google login redirect
    const emailFromUrl = searchParams.get('email');
    if (emailFromUrl) {
      localStorage.setItem('userEmail', emailFromUrl);
      router.replace('/dashboard');
    }
    
    const email = localStorage.getItem('userEmail');
    if (!email) {
      router.push('/login');
    } else {
      setUserEmail(email);
      fetchBookings(email);
    }
  }, [router, searchParams]);

  const fetchBookings = async (email) => {
    try {
      const res = await fetch(`${API_URL}/api/bookings?userEmail=${email}`);
      const data = await res.json();
      setBookings(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (bookingId) => {
    if (!confirm('Are you sure you want to cancel this booking?')) return;
    
    try {
      const res = await fetch(`${API_URL}/api/bookings/${bookingId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      
      if (data.success) {
        alert('Booking cancelled successfully!');
        fetchBookings(userEmail);
      } else {
        alert('Failed to cancel booking');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error cancelling booking');
    }
  };

  if (!userEmail) {
    return (
      <div className="min-h-screen bg-[#020617] text-white pt-28 text-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white pt-28 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Player Dashboard</h1>
        <p className="text-slate-400 mb-8">Welcome back, {userEmail.split('@')[0]}!</p>

        <h2 className="text-2xl font-bold mb-4">My Bookings</h2>
        
        {loading ? (
          <p className="text-center py-10">Loading bookings...</p>
        ) : bookings.length === 0 ? (
          <div className="text-center py-10 text-slate-400 border border-dashed border-white/10 rounded-2xl">
            No bookings yet. Book a facility to get started!
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking._id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-emerald-400">{booking.facilityTitle}</h3>
                  <p className="text-slate-400 text-sm mt-1">Date: {booking.date}</p>
                  <p className="text-slate-400 text-sm">Time: {booking.slot}</p>
                  <span className="inline-block mt-2 px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs font-semibold">
                    {booking.status || 'PENDING'}
                  </span>
                </div>
                <button
                  onClick={() => cancelBooking(booking._id)}
                  className="px-5 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-xl text-sm font-semibold transition-all"
                >
                  Cancel Booking
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}