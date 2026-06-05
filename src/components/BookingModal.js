import { useState } from 'react';

export default function BookingModal({ facility, onClose, userEmail }) {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDate || !selectedSlot) {
      setMessage({ type: 'error', text: 'Please choose both a date and a time slot.' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          facilityId: facility._id,
          facilityTitle: facility.title,
          userEmail: userEmail || 'testuser@gmail.com', // Fallback for testing
          date: selectedDate,
          slot: selectedSlot,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ type: 'success', text: 'Booking requested successfully!' });
        setTimeout(() => {
          onClose(); // Close modal after success
        }, 2000);
      } else {
        setMessage({ type: 'error', text: data.message || 'Something went wrong.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to connect to the booking server.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold text-white">Book a Field</h3>
            <p className="text-sm text-emerald-400 mt-1">{facility.title}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors text-xl">
            &times;
          </button>
        </div>

        {/* Modal Body / Form */}
        <form onSubmit={handleBookingSubmit} className="p-6 space-y-5">
          {message.text && (
            <div className={`p-3 rounded-lg text-sm ${
              message.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
            }`}>
              {message.text}
            </div>
          )}

          {/* Date Picker Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Select Date</label>
            <input
              type="date"
              required
              min={new Date().toISOString().split('T')[0]} // Block past dates
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          {/* Time Slots Grid Selection */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Available Slots</label>
            <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto pr-1">
              {facility.availableSlots && facility.availableSlots.map((slot, index) => (
  <button
    key={index}
    type="button"
    onClick={() => setSelectedSlot(slot)}
    className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all ${
      selectedSlot === slot
        ? 'bg-emerald-500 border-emerald-500 text-slate-950 font-semibold shadow-lg shadow-emerald-500/20'
        : 'bg-slate-950 border-slate-800 text-gray-300 hover:border-slate-700'
    }`}
  >
    {slot}
  </button>
))}
</div>
          </div>

          {/* Action Action Buttons */}
          <div className="flex space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-medium py-3 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-700 disabled:text-slate-400 text-slate-950 font-semibold py-3 rounded-xl transition-all shadow-lg shadow-emerald-500/10"
            >
              {loading ? 'Processing...' : 'Confirm Booking'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}