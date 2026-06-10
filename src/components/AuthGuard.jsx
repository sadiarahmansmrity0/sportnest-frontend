"use client";

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function AuthGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for user email
    const userEmail = localStorage.getItem('userEmail');
    
    if (userEmail) {
      setIsAuthenticated(true);
      setIsLoading(false);
    } else {
      // Save the attempted URL to redirect back after login
      sessionStorage.setItem('redirectAfterLogin', pathname);
      router.replace('/login');
    }
  }, [router, pathname]);

  // Show loading spinner while checking
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#020617] text-white pt-28 text-center">
        <div className="inline-block w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-2 text-slate-400">Loading...</p>
      </div>
    );
  }

  return isAuthenticated ? children : null;
}