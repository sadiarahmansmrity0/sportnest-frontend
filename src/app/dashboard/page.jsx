"use client";

import { Suspense } from 'react';
import DashboardContent from './DashboardContent';

export default function DashboardPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#020617] text-white pt-28 text-center">
        Loading dashboard...
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
}