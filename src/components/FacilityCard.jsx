import Link from 'next/link';

export default function FacilityCard({ facility }) {
  // Safe default fallback images if the database field is empty
  const imageSrc = facility?.image || "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea";

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all group flex flex-col justify-between h-full shadow-lg">
      <div>
        {/* Card Image */}
        <div className="relative overflow-hidden h-48 border-b border-slate-800">
          <img 
            src={imageSrc} 
            // 🟢 CHANGED: Use .name instead of .title
            alt={facility?.name || "Sport Arena"} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        {/* Card Body */}
        <div className="p-5 space-y-3">
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider font-semibold inline-block">
            {facility?.category || "Sports"}
          </span>
          {/* 🟢 CHANGED: Changed facility.title to facility.name */}
          <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-1">
            {facility?.name || "Untitled Arena"}
          </h3>
          <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">
            {facility?.description || "No description available for this playground."}
          </p>
          <div className="text-xs text-gray-400 space-y-1 pt-1">
            <p>📍 {facility?.location || "Sylhet"}</p>
          </div>
        </div>
      </div>

      {/* Action Row */}
      <div className="p-5 pt-0 grid grid-cols-2 gap-3">
        <Link 
          href={`/facilities/${facility?._id}`}
          className="text-center bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs py-3 rounded-xl transition-colors flex items-center justify-center"
        >
          Details
        </Link>
        <Link
          href={`/facilities/${facility?._id}`}
          className="text-center bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs py-3 rounded-xl transition-all flex items-center justify-center shadow-md shadow-emerald-500/5"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
}