"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { API_URL } from '@/lib/api';
import { Pencil, Trash2, MapPin, DollarSign, Users, Edit, Eye } from 'lucide-react';

export default function ManageFacilitiesPage() {
  const router = useRouter();
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingFacility, setEditingFacility] = useState(null);
  
  // Edit form state
  const [editForm, setEditForm] = useState({
    title: '',
    category: '',
    location: '',
    pricePerHour: '',
    description: '',
    image: ''
  });

  // Fetch facilities for the logged-in user
  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    
    if (!userEmail) {
      router.push('/login');
      return;
    }

    fetchFacilities(userEmail);
  }, []);

  const fetchFacilities = async (userEmail) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/facilities?ownerEmail=${userEmail}`);
      const data = await response.json();
      
      if (data.success) {
        setFacilities(data.data);
      } else {
        setFacilities([]);
      }
    } catch (error) {
      console.error('Error fetching facilities:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle Delete
  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this facility?')) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/facilities/${id}`, {
        method: 'DELETE',
      });
      
      const data = await response.json();
      
      if (data.success) {
        alert('Facility deleted successfully!');
        // Refresh the list
        const userEmail = localStorage.getItem('userEmail');
        fetchFacilities(userEmail);
      } else {
        alert('Failed to delete facility');
      }
    } catch (error) {
      console.error('Error deleting facility:', error);
      alert('Error deleting facility');
    }
  };

  // Handle Edit - Open Modal
  const handleEdit = (facility) => {
    setEditingFacility(facility);
    setEditForm({
      title: facility.title || '',
      category: facility.category || '',
      location: facility.location || '',
      pricePerHour: facility.pricePerHour || '',
      description: facility.description || '',
      image: facility.image || ''
    });
    setShowEditModal(true);
  };

  // Handle Edit Form Submit
  const handleUpdate = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`${API_URL}/api/facilities/${editingFacility._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...editForm,
          pricePerHour: Number(editForm.pricePerHour)
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        alert('Facility updated successfully!');
        setShowEditModal(false);
        // Refresh the list
        const userEmail = localStorage.getItem('userEmail');
        fetchFacilities(userEmail);
      } else {
        alert('Failed to update facility');
      }
    } catch (error) {
      console.error('Error updating facility:', error);
      alert('Error updating facility');
    }
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] text-white pt-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          Loading your facilities...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-black">Manage My Facilities</h1>
          <p className="text-slate-400 mt-1">View, edit, or delete your listed arenas</p>
        </div>

        {/* Facilities Grid */}
        {facilities.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-white/10 rounded-2xl">
            <p className="text-slate-400">You haven't added any facilities yet.</p>
            <button
              onClick={() => router.push('/add-facility')}
              className="mt-4 px-6 py-2 bg-emerald-500 text-slate-950 rounded-xl font-semibold"
            >
              Add Your First Facility
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map((facility) => (
              <div
                key={facility._id}
                className="bg-slate-900/50 border border-white/10 rounded-2xl overflow-hidden hover:border-emerald-500/30 transition-all"
              >
                {/* Image */}
                <img
                  src={facility.image || "https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=600"}
                  alt={facility.title}
                  className="w-full h-48 object-cover"
                />
                
                {/* Content */}
                <div className="p-5">
                  <h3 className="text-xl font-bold mb-2">{facility.title}</h3>
                  
                  {/* Location */}
                  <div className="flex items-center text-slate-400 text-sm mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    {facility.location}
                  </div>
                  
                  {/* Price */}
                  <div className="flex items-center text-emerald-400 font-bold mb-3">
                    <DollarSign className="w-4 h-4" />
                    ৳{facility.pricePerHour}/hour
                  </div>
                  
                  {/* Category Badge */}
                  <span className="inline-block bg-emerald-500/10 text-emerald-400 text-xs px-2 py-1 rounded-full mb-4">
                    {facility.category}
                  </span>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => handleEdit(facility)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-xl transition-all text-sm font-semibold"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(facility._id)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-xl transition-all text-sm font-semibold"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-white/10 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">Edit Facility</h2>
              
              <form onSubmit={handleUpdate} className="space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-sm text-slate-300 mb-1">Facility Name</label>
                  <input
                    type="text"
                    name="title"
                    value={editForm.title}
                    onChange={handleEditChange}
                    className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm text-slate-300 mb-1">Category</label>
                  <select
                    name="category"
                    value={editForm.category}
                    onChange={handleEditChange}
                    className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Football">⚽ Football</option>
                    <option value="Cricket">🏏 Cricket</option>
                    <option value="Badminton">🏸 Badminton</option>
                    <option value="Swimming">🏊 Swimming</option>
                  </select>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm text-slate-300 mb-1">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={editForm.location}
                    onChange={handleEditChange}
                    className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm text-slate-300 mb-1">Price Per Hour (BDT)</label>
                  <input
                    type="number"
                    name="pricePerHour"
                    value={editForm.pricePerHour}
                    onChange={handleEditChange}
                    className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>

                {/* Image URL */}
                <div>
                  <label className="block text-sm text-slate-300 mb-1">Image URL</label>
                  <input
                    type="url"
                    name="image"
                    value={editForm.image}
                    onChange={handleEditChange}
                    className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm text-slate-300 mb-1">Description</label>
                  <textarea
                    name="description"
                    value={editForm.description}
                    onChange={handleEditChange}
                    rows="3"
                    className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="flex-1 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition-all"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}