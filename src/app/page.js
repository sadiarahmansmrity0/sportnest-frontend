"use client";

import Link from "next/link";
import { Trophy, Calendar, ShieldCheck, Zap, ArrowRight, Activity } from "lucide-react";

export default function HomePage() {
  return (
    <div className="space-y-16 pb-16">
      
      {/* 🏟️ HERO BANNER SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-emerald-950 to-gray-900 text-white py-20 lg:py-28 px-4 sm:px-6 lg:px-8">
        {/* Subtle Decorative Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
              <Activity className="h-3.5 w-3.5 animate-pulse" /> Instant Arena Reservations
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              Your Ultimate Arena <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                Booking Companion
              </span>
            </h1>
            
            <p className="text-gray-300 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Discover local premium multi-sport venues, reserve your slots seamlessly, and coordinate matches flawlessly. From premium indoor badminton courts to floodlit football turfs, secure your playground in seconds.
            </p>
            
            {/* Interactive Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-2">
              <Link href="/facilities" className="btn-primary py-3 px-6 text-base group shadow-lg shadow-emerald-900/40">
                Explore Facilities
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/register" className="inline-flex items-center justify-center gap-2 border border-gray-700 bg-gray-800/50 hover:bg-gray-800 text-white font-medium px-6 py-3 rounded-lg transition-colors text-base backdrop-blur-sm">
                Join Community
              </Link>
            </div>
          </div>
          
          {/* Right Visual Stats Column */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-sm bg-gradient-to-b from-gray-800/80 to-gray-900/90 border border-gray-700/60 p-6 rounded-2xl shadow-2xl backdrop-blur-md space-y-5">
              
              <div className="absolute -top-4 -right-4 bg-emerald-500 text-gray-950 font-black px-3.5 py-1 rounded-md text-xs uppercase tracking-wider transform rotate-3 shadow-md">
                Live Slots Available
              </div>
              
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400">Platform Highlights</h3>
              
              {/* Feature 1 */}
              <div className="flex items-start gap-3.5 bg-gray-800/40 p-3.5 rounded-xl border border-gray-700/30">
                <div className="p-2 bg-emerald-500/15 rounded-lg text-emerald-400">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Real-time Scheduling</h4>
                  <p className="text-xs text-gray-400 mt-0.5">No back-and-forth calling. Select your date and time slice instantly.</p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-start gap-3.5 bg-gray-800/40 p-3.5 rounded-xl border border-gray-700/30">
                <div className="p-2 bg-emerald-500/15 rounded-lg text-emerald-400">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Verified Turf Managers</h4>
                  <p className="text-xs text-gray-400 mt-0.5">Every football field and court listed is structurally premium and certified.</p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-start gap-3.5 bg-gray-800/40 p-3.5 rounded-xl border border-gray-700/30">
                <div className="p-2 bg-emerald-500/15 rounded-lg text-emerald-400">
                  <Zap className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Flexible Cancellations</h4>
                  <p className="text-xs text-gray-400 mt-0.5">Change of match plans? Update your reservations directly up to 24h prior.</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 🧭 SPORTS QUICK-CATEGORIES OVERVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Browse Venues by Sport</h2>
          <p className="text-sm text-gray-500">Pick an arena optimized for your favorite game</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: "Football Turfs", icon: "⚽", count: "12 Fields Active" },
            { name: "Badminton Courts", icon: "🏸", count: "8 Indoor Arenas" },
            { name: "Cricket Nets", icon: "🏏", count: "6 Practice Slices" },
            { name: "Swimming Lanes", icon: "🏊", count: "4 Premium Pools" },
          ].map((sport, i) => (
            <div key={i} className="bg-white border border-gray-200 hover:border-emerald-500/40 p-5 rounded-xl transition-all shadow-sm hover:shadow-md flex flex-col items-center text-center group cursor-pointer">
              <span className="text-3xl mb-3 transform group-hover:scale-110 transition-transform">{sport.icon}</span>
              <h3 className="text-sm font-bold text-gray-800">{sport.name}</h3>
              <span className="text-xs text-gray-400 mt-1 font-medium bg-gray-100 px-2 py-0.5 rounded-full">{sport.count}</span>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}