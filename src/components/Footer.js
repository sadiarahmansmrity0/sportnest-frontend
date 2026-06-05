import Link from "next/link";
import { Trophy, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Company Branding Column */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 text-emerald-400 font-bold text-xl tracking-tight">
              <Trophy className="h-6 w-6 stroke-[2.5]" />
              <span>Sport<span className="text-white">Nest</span></span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Your ultimate arena booking companion. Discover local premium multi-sport venues, manage reservations, and coordinate your matches flawlessly.
            </p>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">Quick Navigation</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/" className="hover:text-emerald-400 transition-colors">Home Base</Link></li>
              <li><Link href="/facilities" className="hover:text-emerald-400 transition-colors">Explore Facilities</Link></li>
            </ul>
          </div>

          {/* Contact Details Column */}
          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">Contact Information</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                <span>Airport Road, Sylhet, Bangladesh</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                <span>+880 1711-223344</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                <span className="truncate">support@sportnest.com</span>
              </li>
            </ul>
          </div>

          {/* Social Links Column */}
          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">Connect with Us</h3>
            <p className="text-sm text-gray-400 mb-4">Stay updated on tournament rules and discount slots.</p>
            <div className="flex space-x-3">
              {/* Pure SVG Facebook Icon */}
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="p-2 bg-gray-800 hover:bg-emerald-600 rounded-lg text-white transition-all flex items-center justify-center w-9 h-9">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              
              {/* Pure SVG Instagram Icon */}
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-2 bg-gray-800 hover:bg-emerald-600 rounded-lg text-white transition-all flex items-center justify-center w-9 h-9">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              
              {/* Pure SVG X Rebrand Icon */}
              <a href="https://x.com" target="_blank" rel="noreferrer" className="p-2 bg-gray-800 hover:bg-emerald-600 rounded-lg text-white transition-all flex items-center justify-center font-black text-sm w-9 h-9">
                X
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Area */}
        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} SportNest. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">Designed meticulously for modern sports managers.</p>
        </div>
      </div>
    </footer>
  );
}