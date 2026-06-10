"use client";

import { Suspense, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardContent from './DashboardContent';

export default function DashboardPage() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
      router.push('/login');
    } else {
      setIsChecking(false);
    }
  }, [router]);

  if (isChecking) {
    return (
      <div className="min-h-screen bg-[#020617] text-white pt-28 text-center">
        <div className="inline-block w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-2 text-slate-400">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#020617] text-white pt-28 text-center">
        Loading...
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
}