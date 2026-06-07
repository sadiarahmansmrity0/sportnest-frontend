"use client";
import { useState, useEffect } from "react";
import PrivateRoute from "@/components/PrivateRoute";

function ManageFacilities() {
  const [facilities, setFacilities] = useState([]);
  const userEmail = typeof window !== "undefined" ? localStorage.getItem("userEmail") : "";

  useEffect(() => {
    async function fetchMyFacilities() {
      if (!userEmail) return;
      const res = await fetch(`http://localhost:5000/api/facilities?ownerEmail=${userEmail}`);
      const result = await res.json();
      if (result.success) setFacilities(result.data);
    }
    fetchMyFacilities();
  }, [userEmail]);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this facility?")) return;
    const res = await fetch(`http://localhost:5000/api/facilities/${id}`, { method: 'DELETE' });
    if (res.ok) {
        setFacilities(facilities.filter(f => f._id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white pt-28 px-6">
      <h1 className="text-3xl font-black mb-8">Manage My Facilities</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {facilities.map((f) => (
          <div key={f._id} className="bg-slate-900 p-6 rounded-2xl border border-white/10">
            <h3 className="font-bold text-xl">{f.name}</h3>
            <p className="text-slate-400 mb-4">{f.location}</p>
            <div className="flex gap-2">
              <button className="bg-blue-600 px-4 py-2 rounded">Edit</button>
              <button onClick={() => handleDelete(f._id)} className="bg-red-600 px-4 py-2 rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Page() {
  return <PrivateRoute><ManageFacilities /></PrivateRoute>;
}