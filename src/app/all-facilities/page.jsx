"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
export default function AllFacilitiesPage() {
  const [facilities, setFacilities] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/facilities")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setFacilities(data.data);
      });
  }, []);

  return (
    <div className="pt-24 px-6 max-w-6xl mx-auto">
      <h1 className="text-4xl font-black mb-8">All Facilities</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {facilities.map((f) => (
          <div key={f._id} className="bg-slate-900 rounded-2xl overflow-hidden border border-white/10">
            <img src={f.image} alt={f.name} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h2 className="text-xl font-bold">{f.name}</h2>
              <p className="text-slate-400 text-sm">{f.location}</p>
              <p className="text-emerald-400 font-bold mt-2">${f.price}/hr</p>
              <button className="w-full bg-emerald-500 text-black font-bold py-2 mt-4 rounded-lg">
                Book Now
              </button>
              <Link href={`/book/${f._id}`} className="block w-full text-center bg-emerald-500 text-black font-bold py-2 mt-4 rounded-lg">
  Book Now
</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}