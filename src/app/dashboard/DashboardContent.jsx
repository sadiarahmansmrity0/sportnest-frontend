"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { API_URL } from '@/lib/api';
import { Calendar, Clock, XCircle } from 'lucide-react';

export default function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [userEmail, setUserEmail] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(null);

  useEffect(() => {
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
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (bookingId) => {
    if (!confirm('Are you sure you want to cancel this booking?')) return;
    
    setCancelling(bookingId);
    
    try {
      const res = await fetch(`${API_URL}/api/bookings/${bookingId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      
      if (data.success) {
        alert('Booking cancelled successfully!');
        const email = localStorage.getItem('userEmail');
        fetchBookings(email);
      } else {
        alert('Failed to cancel booking');
      }
    } catch (error) {
      alert('Error cancelling booking');
    } finally {
      setCancelling(null);
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      pending: 'bg-yellow-500/20 text-yellow-400',
      confirmed: 'bg-green-500/20 text-green-400',
      cancelled: 'bg-red-500/20 text-red-400',
      completed: 'bg-blue-500/20 text-blue-400'
    };
    const color = colors[status?.toLowerCase()] || 'bg-yellow-500/20 text-yellow-400';
    return (
      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${color}`}>
        {status?.toUpperCase() || 'PENDING'}
      </span>
    );
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
              <div key={booking._id} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5">
                <div className="flex flex-wrap md:flex-nowrap justify-between items-start gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-emerald-400 mb-2">
                      {booking.facilityTitle || 'Sports Facility'}
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-slate-300">
                        <Calendar className="w-4 h-4 text-emerald-400" />
                        <span className="text-sm">Date: {booking.date || 'Not specified'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-300">
                        <Clock className="w-4 h-4 text-emerald-400" />
                        <span className="text-sm">Time: {booking.slot || 'Not specified'}</span>
                      </div>
                    </div>
                    <div className="mt-3">
                      {getStatusBadge(booking.status)}
                    </div>
                  </div>
                  <button
                    onClick={() => cancelBooking(booking._id)}
                    disabled={cancelling === booking._id}
                    className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-xl text-red-400 text-sm font-semibold"
                  >
                    <XCircle className="w-4 h-4" />
                    {cancelling === booking._id ? 'Cancelling...' : 'Cancel Booking'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}