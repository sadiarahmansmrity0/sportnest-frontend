"use client";
import { useState, useEffect } from "react";
import PrivateRoute from "@/components/PrivateRoute";
import { API_URL } from "@/lib/api";

function ManageFacilities() {
  const [facilities, setFacilities] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    setUserEmail(localStorage.getItem("userEmail") || "");
  }, []);

  useEffect(() => {
    async function fetchMyFacilities() {
      if (!userEmail) return;
      try {
        // FIXED: Used ${API_URL}
        const res = await fetch(`${API_URL}/api/facilities?ownerEmail=${userEmail}`);
        const result = await res.json();
        if (result.success) setFacilities(result.data);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    }
    fetchMyFacilities();
  }, [userEmail]);

  const handleEditClick = (facility) => {
    setEditingId(facility._id);
    setEditForm(facility);
  };

  const handleSave = async (id) => {
    const { _id, ...dataToUpdate } = editForm;

    try {
        // FIXED: Used ${API_URL}
        const res = await fetch(`${API_URL}/api/facilities/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataToUpdate),
        });

        const result = await res.json();

        if (res.ok && result.success) {
            setFacilities(facilities.map(f => f._id === id ? { ...f, ...dataToUpdate } : f));
            setEditingId(null);
        } else {
            alert("Update failed: " + (result.message || "Unknown error"));
        }
    } catch (err) {
        console.error("Save error:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this facility?")) return;
    
    try {
        // FIXED: Used ${API_URL}
        const res = await fetch(`${API_URL}/api/facilities/${id}`, { 
            method: 'DELETE' 
        });
        const result = await res.json();
        
        if (result.success) {
            setFacilities(facilities.filter(f => f._id !== id));
        } else {
            alert("Failed to delete from database: " + result.message);
        }
    } catch (err) {
        console.error("Delete error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white pt-28 px-6">
      <h1 className="text-3xl font-black mb-8">Manage My Facilities</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {facilities.map((f) => (
          <div key={f._id} className="bg-slate-900 p-6 rounded-2xl border border-white/10">
            {editingId === f._id ? (
              <div className="space-y-2">
                <input 
                  value={editForm.name || ""} 
                  onChange={(e) => setEditForm({...editForm, name: e.target.value})} 
                  className="text-black w-full p-1 rounded" 
                />
                <button onClick={() => handleSave(f._id)} className="bg-green-600 px-4 py-1 mr-2 rounded">Save</button>
                <button onClick={() => setEditingId(null)} className="bg-gray-600 px-4 py-1 rounded">Cancel</button>
              </div>
            ) : (
              <>
                <h3 className="font-bold text-xl">{f.name}</h3>
                <p className="text-slate-400 mb-4">{f.location}</p>
                <div className="flex gap-2">
                  <button onClick={() => handleEditClick(f)} className="bg-blue-600 px-4 py-2 rounded">Edit</button>
                  <button onClick={() => handleDelete(f._id)} className="bg-red-600 px-4 py-2 rounded">Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Page() {
  return <PrivateRoute><ManageFacilities /></PrivateRoute>;
}