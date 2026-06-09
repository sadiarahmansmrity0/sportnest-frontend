'use client';

import { GoogleOAuthProvider } from '@react-oauth/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
          <Navbar />
          {children}
        </GoogleOAuthProvider>
        <Footer />
      </body>
    </html>
  );
}