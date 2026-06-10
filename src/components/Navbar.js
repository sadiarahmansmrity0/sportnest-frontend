"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Trophy, Menu, X } from 'lucide-react';
import ProfileDropdown from './ProfileDropdown';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Check login status
  const checkLoginStatus = () => {
    const email = localStorage.getItem('userEmail');
    setIsLoggedIn(!!email);
  };

  useEffect(() => {
    checkLoginStatus();

    // Listen for storage changes (when logout happens in another tab)
    window.addEventListener('storage', checkLoginStatus);
    
    // Custom event for logout within the same tab
    window.addEventListener('authChange', checkLoginStatus);
    
    return () => {
      window.removeEventListener('storage', checkLoginStatus);
      window.removeEventListener('authChange', checkLoginStatus);
    };
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/all-facilities', label: 'All Facilities' },
  ];

  if (isLoggedIn) {
    navLinks.push(
      { href: '/my-bookings', label: 'My Bookings' },
      { href: '/add-facility', label: 'Add Facility' },
      { href: '/manage-facilities', label: 'Manage Facilities' }
    );
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#020617]/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-emerald-500" />
            <span className="font-bold text-xl text-white">SportNest</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors ${
                  pathname === link.href
                    ? 'text-emerald-400 font-semibold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <ProfileDropdown onLogout={checkLoginStatus} />
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-slate-900 border-t border-white/10 py-4">
          <div className="flex flex-col gap-3 px-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`text-sm py-2 transition-colors ${
                  pathname === link.href
                    ? 'text-emerald-400 font-semibold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-white/10">
              <ProfileDropdown onLogout={checkLoginStatus} />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}