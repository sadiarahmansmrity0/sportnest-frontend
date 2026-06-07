"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Trophy, Menu, X, LogOut, Calendar, PlusCircle, Settings, Home, Dumbbell } from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [userEmail, setUserEmail] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  // Sync state with localStorage to check if user is logged in
  useEffect(() => {
    const handleAuthCheck = () => {
      const email = localStorage.getItem("userEmail");
      setUserEmail(email);
    };

    handleAuthCheck();
    
    // Listen for storage changes or custom navigation updates
    window.addEventListener("storage", handleAuthCheck);
    return () => window.removeEventListener("storage", handleAuthCheck);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    setUserEmail(null);
    setIsOpen(false);
    router.push("/login");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#020617]/80 backdrop-blur-md border-b border-white/5 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Platform Name */}
          <Link href="/" className="flex items-center gap-2 text-emerald-400 font-black text-xl tracking-tight">
            <Trophy className="h-6 w-6 stroke-[2.5]" />
            <span>Sport<span className="text-white">Nest</span></span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/" className={`hover:text-emerald-400 transition-colors ${pathname === "/" ? "text-emerald-400 font-bold" : "text-slate-300"}`}>
              Home
            </Link>
            <Link href="/facilities" className={`hover:text-emerald-400 transition-colors ${pathname === "/facilities" ? "text-emerald-400 font-bold" : "text-slate-300"}`}>
              All Facilities
            </Link>

            {/* Dynamic Private Routes */}
            {userEmail && (
              <>
                <Link href="/dashboard" className={`hover:text-emerald-400 transition-colors ${pathname === "/dashboard" ? "text-emerald-400 font-bold" : "text-slate-300"}`}>
                  My Bookings
                </Link>
                <Link href="/add-facility" className={`hover:text-emerald-400 transition-colors ${pathname === "/add-facility" ? "text-emerald-400 font-bold" : "text-slate-300"}`}>
                  Add Facility
                </Link>
                <Link href="/manage-facilities" className={`hover:text-emerald-400 transition-colors ${pathname === "/manage-facilities" ? "text-emerald-400 font-bold" : "text-slate-300"}`}>
                  Manage My Facilities
                </Link>
              </>
            )}
          </div>

          {/* Authentication Action Button / Profile Logout display */}
          <div className="hidden md:flex items-center gap-4">
            {userEmail ? (
              <div className="flex items-center gap-3 bg-slate-900 border border-white/10 px-4 py-2 rounded-xl">
                <span className="text-xs font-mono text-emerald-400 max-w-[120px] truncate">{userEmail}</span>
                <button 
                  onClick={handleLogout} 
                  className="text-slate-400 hover:text-red-400 transition-colors p-1"
                  title="Logout Profile"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <Link href="/login" className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-md shadow-emerald-500/10">
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Hamburguer Toggle Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-400 hover:text-white transition-colors">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#020617] border-b border-white/5 px-4 pt-2 pb-6 space-y-3 flex flex-col text-sm">
          <Link href="/" onClick={() => setIsOpen(false)} className="text-slate-300 py-2 border-b border-white/5">Home</Link>
          <Link href="/facilities" onClick={() => setIsOpen(false)} className="text-slate-300 py-2 border-b border-white/5">All Facilities</Link>
          
          {userEmail ? (
            <>
              <Link href="/dashboard" onClick={() => setIsOpen(false)} className="text-slate-300 py-2 border-b border-white/5">My Bookings</Link>
              <Link href="/facilities/add" onClick={() => setIsOpen(false)} className="text-slate-300 py-2 border-b border-white/5">Add Facility</Link>
              <Link href="/facilities/manage" onClick={() => setIsOpen(false)} className="text-slate-300 py-2 border-b border-white/5">Manage My Facilities</Link>
              <div className="pt-2 flex flex-col gap-2">
                <p className="text-xs text-slate-500 font-mono truncate">{userEmail}</p>
                <button onClick={handleLogout} className="w-full text-center py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold rounded-xl transition-all">
                  Sign Out Account
                </button>
              </div>
            </>
          ) : (
            <Link href="/login" onClick={() => setIsOpen(false)} className="w-full text-center py-2.5 bg-emerald-500 text-slate-950 font-bold rounded-xl transition-all">
              Sign In Profile
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}