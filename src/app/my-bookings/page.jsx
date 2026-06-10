"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { API_URL } from '@/lib/api';
import { Calendar, Clock, MapPin, XCircle } from 'lucide-react';
import AuthGuard from '@/components/AuthGuard';

export default function MyBookingsPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(null);

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
      router.push('/login');
      return;
    }
    fetchBookings(userEmail);
  }, [router]);

  const fetchBookings = async (email) => {
    try {
      const res = await fetch(`${API_URL}/api/bookings?userEmail=${email}`);
      const data = await res.json();
      setBookings(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error:', error);
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
        const userEmail = localStorage.getItem('userEmail');
        fetchBookings(userEmail);
      } else {
        alert('Failed to cancel booking');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error cancelling booking');
    } finally {
      setCancelling(null);
    }
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      pending: 'bg-yellow-500/20 text-yellow-400',
      confirmed: 'bg-green-500/20 text-green-400',
      cancelled: 'bg-red-500/20 text-red-400',
      completed: 'bg-blue-500/20 text-blue-400'
    };
    const color = statusColors[status?.toLowerCase()] || 'bg-yellow-500/20 text-yellow-400';
    return (
      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${color}`}>
        {status?.toUpperCase() || 'PENDING'}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] text-white pt-28 px-6 text-center">
        Loading your bookings...
      </div>
    );
  }

  const content = (
    <div className="min-h-screen bg-[#020617] text-white pt-28 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">My Bookings</h1>
        <p className="text-slate-400 mb-8">View and manage your facility reservations</p>

        {bookings.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-white/10 rounded-2xl">
            <Calendar className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-400">No bookings yet.</p>
            <button
              onClick={() => router.push('/all-facilities')}
              className="mt-4 px-6 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-xl transition-all"
            >
              Browse Facilities
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 hover:border-emerald-500/30 transition-all"
              >
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
                      
                      <div className="flex items-center gap-2 text-slate-300">
                        <MapPin className="w-4 h-4 text-emerald-400" />
                        <span className="text-sm">Location: {booking.location || 'Sylhet'}</span>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      {getStatusBadge(booking.status)}
                    </div>
                  </div>

                  <button
                    onClick={() => cancelBooking(booking._id)}
                    disabled={cancelling === booking._id}
                    className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-xl text-red-400 text-sm font-semibold transition-all disabled:opacity-50"
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

  return <AuthGuard>{content}</AuthGuard>;
}