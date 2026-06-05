"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Trophy, ChevronDown, LogOut, Calendar, PlusCircle, Settings } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Temporary mock authentication state for testing layout options
  // Later we will link this directly to better-auth (authClient.useSession())
  const isLoggedIn = true; 
  const user = {
    name: "Sadia Rahman",
    email: "sadiarahmansmrity9@gmail.com",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          
          {/* Logo & Site Name */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 text-emerald-600 font-bold text-xl tracking-tight">
              <Trophy className="h-6 w-6 stroke-[2.5]" />
              <span>Sport<span className="text-gray-900">Nest</span></span>
            </Link>
            
            {/* Desktop Navigation Links (Left Side) */}
            <div className="hidden md:flex ml-10 space-x-8">
              <Link href="/" className="text-gray-700 hover:text-emerald-600 font-medium text-sm transition-colors pt-1">
                Home
              </Link>
              <Link href="/facilities" className="text-gray-700 hover:text-emerald-600 font-medium text-sm transition-colors pt-1">
                All Facilities
              </Link>
            </div>
          </div>

          {/* Desktop Right Side Configuration */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 focus:outline-none p-1.5 rounded-full hover:bg-gray-100 transition-all"
                >
                  <img
                    src={user.photo}
                    alt={user.name}
                    className="h-8 w-8 rounded-full object-cover border border-emerald-500"
                  />
                  <span className="text-sm font-medium text-gray-700 max-w-[120px] truncate">{user.name}</span>
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </button>

                {/* Profile Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-xs text-gray-400">Signed in as</p>
                      <p className="text-sm font-semibold text-gray-800 truncate">{user.email}</p>
                    </div>
                    
                    <Link href="/my-bookings" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors">
                      <Calendar className="h-4 w-4" /> My Bookings
                    </Link>
                    <Link href="/add-facility" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors">
                      <PlusCircle className="h-4 w-4" /> Add Facility
                    </Link>
                    <Link href="/manage-facilities" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors">
                      <Settings className="h-4 w-4" /> Manage My Facilities
                    </Link>
                    
                    <div className="border-t border-gray-100 mt-1">
                      <button className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                        <LogOut className="h-4 w-4" /> Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" className="btn-primary">
                Login
              </Link>
            )}
          </div>

          {/* Mobile hamburger menu toggle */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none p-2 rounded-lg hover:bg-gray-100 transition-all"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu Expansion */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-100 bg-gray-50 px-4 pt-2 pb-4 space-y-2">
          <Link href="/" className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-600">
            Home
          </Link>
          <Link href="/facilities" className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-600">
            All Facilities
          </Link>
          
          {isLoggedIn ? (
            <div className="border-t border-gray-200 pt-3 mt-2">
              <div className="flex items-center px-3 mb-3">
                <img src={user.photo} alt={user.name} className="h-9 w-9 rounded-full border border-emerald-500" />
                <div className="ml-3">
                  <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>
              </div>
              <Link href="/my-bookings" className="block px-3 py-2 rounded-lg text-base font-medium text-gray-600 hover:bg-emerald-50 hover:text-emerald-600">
                My Bookings
              </Link>
              <Link href="/add-facility" className="block px-3 py-2 rounded-lg text-base font-medium text-gray-600 hover:bg-emerald-50 hover:text-emerald-600">
                Add Facility
              </Link>
              <Link href="/manage-facilities" className="block px-3 py-2 rounded-lg text-base font-medium text-gray-600 hover:bg-emerald-50 hover:text-emerald-600">
                Manage My Facilities
              </Link>
              <button className="flex w-full items-center gap-2 px-3 py-2 mt-2 rounded-lg text-base font-medium text-red-600 hover:bg-red-50">
                <LogOut className="h-4 w-4" /> Logout
              </button>
            </div>
          ) : (
            <div className="pt-2">
              <Link href="/login" className="block w-full text-center btn-primary">
                Login
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}