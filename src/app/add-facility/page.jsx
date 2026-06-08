"use client";
import { useState } from "react";
import PrivateRoute from "@/components/PrivateRoute";
import { API_URL } from "@/lib/api";
function AddFacilityForm() {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    image: "",
    location: "",
    price: "",
    capacity: "",
    description: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ownerEmail = localStorage.getItem("userEmail"); 
    
    // Create the object matching your database schema
    const newFacility = {
      ...formData,
      ownerEmail,
      booking_count: 0 // Initialize to 0 as per requirements
    };

    const res = await fetch("${API_URL/api/facilities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newFacility),
    });

    const data = await res.json();
    if (data.success) {
      alert("Facility added successfully!");
      // Reset form
    } else {
      alert("Error adding facility");
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white pt-28 px-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-black mb-8">Add New Facility</h1>
      <form onSubmit={handleSubmit} className="grid gap-4 bg-slate-900 p-8 rounded-2xl border border-white/10">
        <input placeholder="Facility Name" className="p-3 bg-slate-800 rounded" onChange={(e) => setFormData({...formData, name: e.target.value})} required />
        <input placeholder="Facility Type (e.g., Football)" className="p-3 bg-slate-800 rounded" onChange={(e) => setFormData({...formData, type: e.target.value})} required />
        <input placeholder="Image URL" className="p-3 bg-slate-800 rounded" onChange={(e) => setFormData({...formData, image: e.target.value})} required />
        <input placeholder="Location" className="p-3 bg-slate-800 rounded" onChange={(e) => setFormData({...formData, location: e.target.value})} required />
        <input type="number" placeholder="Price Per Hour" className="p-3 bg-slate-800 rounded" onChange={(e) => setFormData({...formData, price: e.target.value})} required />
        <input type="number" placeholder="Capacity" className="p-3 bg-slate-800 rounded" onChange={(e) => setFormData({...formData, capacity: e.target.value})} required />
        <textarea placeholder="Description" className="p-3 bg-slate-800 rounded" onChange={(e) => setFormData({...formData, description: e.target.value})} required />
        
        <button type="submit" className="bg-emerald-500 text-black font-bold p-3 rounded mt-4">
          Add Facility
        </button>
      </form>
    </div>
  );
}

export default function Page() {
  return <PrivateRoute><AddFacilityForm /></PrivateRoute>;
}