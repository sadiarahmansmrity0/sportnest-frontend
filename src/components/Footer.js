import Link from "next/link";
import { Trophy } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#020617] border-t border-white/5 text-slate-400 text-xs py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
        
        {/* Brand Meta */}
        <div>
          <div className="flex items-center justify-center md:justify-start gap-2 text-emerald-400 font-black text-base mb-2">
            <Trophy className="h-5 w-5" />
            <span>Sport<span className="text-white">Nest</span></span>
          </div>
          <p className="text-slate-500 max-w-xs">Premium sports court configurations, arena management, and match slot reservations made instant.</p>
        </div>

        {/* Dynamic Navigation Links */}
        <div className="flex gap-6 font-medium text-slate-300">
          <Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link>
          <Link href="/facilities" className="hover:text-emerald-400 transition-colors">All Facilities</Link>
          <Link href="/dashboard" className="hover:text-emerald-400 transition-colors">Dashboard</Link>
        </div>

        {/* Legal & Social Rebrands */}
        <div className="space-y-2 md:text-right">
          <div className="flex justify-center md:justify-end gap-4 text-slate-300 font-bold">
            <a href="https://x.com" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">𝕏 (Twitter)</a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">LinkedIn</a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">GitHub</a>
          </div>
          <p className="text-slate-600">&copy; {new Date().getFullYear()} SportNest. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
}