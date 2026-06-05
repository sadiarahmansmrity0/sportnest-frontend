import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-black text-white min-h-[calc(100vh-140px)] flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-6 py-20 text-center space-y-8">
        
        {/* Main Badge / Announcement */}
        <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-emerald-400 bg-emerald-500/10 rounded-full border border-emerald-500/20">
          ✨ Premium Multi-Sport Venue Booking
        </span>

        {/* Hero Catchphrase */}
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight">
          Find Your Arena. <br />
          <span className="bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
            Book Your Match.
          </span>
        </h1>

        {/* Short Subtitle */}
        <p className="max-w-2xl mx-auto text-base sm:text-xl text-gray-400 leading-relaxed">
          Discover local premium multi-sport venues, manage reservations seamlessly, 
          and coordinate your matches flawlessly. Your ultimate arena companion.
        </p>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <Link 
            href="/facilities" 
            className="w-full sm:w-auto px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-all shadow-lg shadow-emerald-600/20 text-center"
          >
            Explore Facilities
          </Link>
          <Link 
            href="/about" 
            className="w-full sm:w-auto px-8 py-3.5 bg-zinc-900 hover:bg-zinc-800 text-gray-300 font-semibold rounded-lg border border-zinc-800 transition-all text-center"
          >
            Learn More
          </Link>
        </div>

      </div>
    </div>
  );
}